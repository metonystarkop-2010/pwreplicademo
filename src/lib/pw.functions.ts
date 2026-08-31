import { createServerFn } from "@tanstack/react-start";
import type {
  PwBatch,
  PwBatchDetails,
  PwChapter,
  PwContentItem,
  PwContentKind,
} from "./pw";

const API_BASE = "https://a-pimaxer-in-45a358a228fb.herokuapp.com";
const STREAM_HOST = "https://stream.srv-1.pimaxer.in";

async function api<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type Raw = Record<string, unknown>;
const str = (v: unknown): string => (typeof v === "string" ? v : "");
const num = (v: unknown): number => (typeof v === "number" ? v : 0);
const obj = (v: unknown): Raw => (v && typeof v === "object" ? (v as Raw) : {});
const arr = (v: unknown): Raw[] => (Array.isArray(v) ? (v as Raw[]) : []);

function pickList(payload: unknown): Raw[] {
  const root = obj(payload);
  if (Array.isArray(root["data"])) return root["data"] as Raw[];
  const data = obj(root["data"]);
  if (Array.isArray(data["batches"])) return data["batches"] as Raw[];
  if (Array.isArray(data["data"])) return data["data"] as Raw[];
  return [];
}

function imageOf(v: unknown): string {
  const image = obj(v);
  const base = str(image["baseUrl"]);
  const key = str(image["key"]);
  if (base && key) return `${base.replace(/\/$/, "")}/${key}`;
  return "";
}

/** Rewrites a DRM-protected cloudfront .mpd into the open HLS playlist. */
function toHls(url: string): string {
  if (!url) return "";
  if (url.includes("youtube.com") || url.includes("youtu.be")) return url;
  const match = url.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32}/i,
  );
  if (!match) return "";
  return `${STREAM_HOST}/${match[0]}/master.m3u8`;
}

function mapBatch(b: Raw): PwBatch {
  return {
    id: str(b["id"]) || str(b["_id"]),
    name: str(b["name"]) || str(b["batchName"]),
    image: str(b["pngUrl"]) || str(b["previewImage"]) || imageOf(b["previewImage"]),
    className: str(b["className"]) || str(b["byName"]) || str(b["cohort"]),
    exam: str(b["exam"]),
    language: str(b["medium"]) || str(b["language"]),
    startsOn: str(b["startsOn"]) || str(b["startDate"]),
    price: num(b["actualPrice"]) || num(b["price"]),
    offPrice: num(b["offPrice"]),
  };
}

export const listBatches = createServerFn({ method: "GET" })
  .inputValidator((input: { page?: number; search?: string }) => ({
    page: Math.max(1, Number(input?.page) || 1),
    search: String(input?.search ?? "").trim(),
  }))
  .handler(async ({ data }): Promise<{ batches: PwBatch[] }> => {
    const payload = await api(`/v2/batches?mode=1&page=${data.page}`);
    let batches = pickList(payload).map(mapBatch).filter((b) => b.id && b.name);
    if (data.search) {
      const q = data.search.toLowerCase();
      batches = batches.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.exam.toLowerCase().includes(q) ||
          b.className.toLowerCase().includes(q),
      );
    }
    return { batches };
  });

export const getBatchDetails = createServerFn({ method: "GET" })
  .inputValidator((input: { batchId: string }) => ({ batchId: String(input.batchId) }))
  .handler(async ({ data }): Promise<PwBatchDetails | null> => {
    const payload = await api(`/v2/batches/${data.batchId}/details`);
    const d = obj(obj(payload)["data"]);
    const id = str(d["_id"]);
    if (!id) return null;
    return {
      id,
      name: str(d["name"]) || str(d["batchName"]),
      byName: str(d["byName"]),
      image: str(d["previewImage"]) || imageOf(d["previewImage"]),
      className: str(d["class"]),
      language: str(d["language"]),
      startDate: str(d["startDate"]),
      endDate: str(d["endDate"]),
      subjects: arr(d["subjects"])
        .map((s) => ({
          id: str(s["_id"]),
          slug: str(s["slug"]),
          name: str(s["subject"]),
          image: imageOf(s["imageId"]),
          lectureCount: num(s["lectureCount"]),
          tagCount: num(s["tagCount"]),
        }))
        .filter((s) => s.id && s.name),
    };
  });

export const listChapters = createServerFn({ method: "GET" })
  .inputValidator((input: { batchId: string; subjectId: string; page?: number }) => ({
    batchId: String(input.batchId),
    subjectId: String(input.subjectId),
    page: Math.max(1, Number(input?.page) || 1),
  }))
  .handler(async ({ data }): Promise<{ chapters: PwChapter[] }> => {
    const payload = await api(
      `/v2/batches/${data.batchId}/subject/${data.subjectId}/topics?page=${data.page}`,
    );
    const chapters = pickList(payload)
      .map((t) => ({
        id: str(t["_id"]),
        name: str(t["name"]),
        slug: str(t["slug"]),
        videos: num(t["videos"]) || num(t["lectureVideos"]),
        notes: num(t["notes"]),
        exercises: num(t["exercises"]),
      }))
      .filter((c) => c.id && c.name);
    return { chapters };
  });

const CONTENT_TYPE_BY_KIND: Record<PwContentKind, string> = {
  lecture: "videos",
  note: "notes",
  dppNote: "DppNotes",
  dppVideo: "DppVideos",
};

function pdfFromHomework(item: Raw): string {
  for (const hw of arr(item["homeworkIds"])) {
    for (const att of arr(hw["attachmentIds"])) {
      const url = imageOf(att);
      if (url) return url;
    }
  }
  for (const att of arr(item["attachmentIds"])) {
    const url = imageOf(att);
    if (url) return url;
  }
  return "";
}

export const listContents = createServerFn({ method: "GET" })
  .inputValidator(
    (input: { batchId: string; subjectId: string; chapterId?: string; kind: PwContentKind }) => ({
      batchId: String(input.batchId),
      subjectId: String(input.subjectId),
      chapterId: String(input.chapterId ?? ""),
      kind: input.kind,
    }),
  )
  .handler(async ({ data }): Promise<{ items: PwContentItem[] }> => {
    const params = new URLSearchParams({
      page: "1",
      contentType: CONTENT_TYPE_BY_KIND[data.kind] ?? "videos",
    });
    if (data.chapterId) params.set("tag", data.chapterId);

    const payload = await api(
      `/v2/batches/${data.batchId}/subject/${data.subjectId}/contents?${params.toString()}`,
    );

    const items = pickList(payload).map((raw): PwContentItem => {
      const video = obj(raw["videoDetails"]);
      const url = str(raw["url"]) || str(video["url"]);
      const teachers = arr(raw["teachers"])
        .map((t) => `${str(t["firstName"])} ${str(t["lastName"])}`.trim())
        .filter(Boolean);
      return {
        id: str(raw["_id"]),
        kind: data.kind,
        title: str(raw["topic"]) || str(video["name"]) || "Untitled",
        date: str(raw["startTime"]) || str(raw["date"]),
        videoUrl: data.kind === "note" || data.kind === "dppNote" ? "" : toHls(url),
        pdfUrl: pdfFromHomework(raw),
        teacher: teachers[0] ?? "",
        thumbnail: str(video["image"]),
        isFree: raw["isFree"] === true,
      };
    });

    return { items: items.filter((i) => i.id && (i.videoUrl || i.pdfUrl || i.title)) };
  });
