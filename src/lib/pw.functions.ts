import { createServerFn } from "@tanstack/react-start";
import type {
  PwBatch,
  PwBatchDetails,
  PwChapter,
  PwContentItem,
  PwContentKind,
} from "./pw";

/** Same upstream host, same proxy path shape, same sealed-payload protocol. */
const API_BASE = "https://raghav-web-f05bab7adcec.herokuapp.com";
const STREAM_HOST = "https://stream.srv-1.pimaxer.in";
const SEAL_SECRET = "p9Wm4rc0::sEaLv1";
const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function b64Bytes(input: string): number[] {
  const s = input.replace(/[^A-Za-z0-9+/]/g, "");
  const out: number[] = [];
  const at = (i: number): number => (i < s.length ? B64.indexOf(s[i]!) : -1);
  for (let i = 0; i < s.length; i += 4) {
    const a = at(i);
    const b = at(i + 1);
    const c = at(i + 2);
    const d = at(i + 3);
    out.push(((a << 2) | (b >> 4)) & 255);
    if (c >= 0) out.push((((15 & b) << 4) | (c >> 2)) & 255);
    if (d >= 0) out.push((((3 & c) << 6) | d) & 255);
  }
  return out;
}

function keystream(seed: string, length: number): number[] {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x1000193) >>> 0;
  }
  let s = h || 0x9e3779b9;
  const out: number[] = [];
  for (let i = 0; i < length; i++) {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    out.push(255 & s);
  }
  return out;
}

/** Unseals the `{ v: "1", d: "<salt>.<payload>" }` envelope the API returns. */
function unseal(payload: string): unknown {
  const dot = payload.indexOf(".");
  if (dot < 0) throw new Error("bad payload");
  const salt = payload.slice(0, dot);
  const bytes = b64Bytes(payload.slice(dot + 1));
  bytes.reverse();
  const key = keystream(SEAL_SECRET + salt, bytes.length);
  const plain = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) plain[i] = (bytes[i]! ^ key[i]!) & 255;
  return JSON.parse(new TextDecoder().decode(plain));
}

async function api<T = unknown>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { v?: string; d?: string };
    if (body && typeof body.d === "string" && body.v === "1") return unseal(body.d) as T;
    return body as T;
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
  if (url.includes(".m3u8")) return url;
  const match = url.match(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{32}/i,
  );
  if (!match) return "";
  return `${STREAM_HOST}/${match[0]}/master.m3u8`;
}

function mapBatch(b: Raw): PwBatch {
  return {
    id: str(b["batchId"]) || str(b["id"]) || str(b["_id"]),
    name: str(b["batchName"]) || str(b["name"]),
    image: str(b["batchImage"]) || imageOf(b["previewImage"]),
    byName: str(b["byName"]) || str(b["description"]),
    language: str(b["language"]),
    type: str(b["BatchType"]),
    startDate: str(b["startDate"]),
    endDate: str(b["endDate"]),
    price: num(b["batchPrice"]) || num(b["price"]),
  };
}

export const listBatches = createServerFn({ method: "GET" })
  .inputValidator((input: { page?: number; search?: string }) => ({
    page: Math.max(1, Number(input?.page) || 1),
    search: String(input?.search ?? "").trim(),
  }))
  .handler(async ({ data }): Promise<{ batches: PwBatch[]; totalPages: number }> => {
    const path = data.search
      ? `/api/searchBatch?name=${encodeURIComponent(data.search)}&page=${data.page}`
      : `/api/AllBatches?page=${data.page}`;
    const payload = await api(path);
    const batches = pickList(payload)
      .map(mapBatch)
      .filter((b) => b.id && b.name);
    return { batches, totalPages: num(obj(payload)["totalPages"]) || 1 };
  });

export const getBatchDetails = createServerFn({ method: "GET" })
  .inputValidator((input: { batchId: string }) => ({ batchId: String(input.batchId) }))
  .handler(async ({ data }): Promise<PwBatchDetails | null> => {
    const payload = await api(
      `/api/BatchInfo?BatchId=${encodeURIComponent(data.batchId)}&Type=details`,
    );
    const d = obj(obj(payload)["data"]);
    const id = str(d["_id"]);
    if (!id) return null;
    return {
      id,
      name: str(d["name"]) || str(d["batchName"]),
      byName: str(d["byName"]),
      image: str(d["previewImage"]) || imageOf(d["previewImage"]) || str(d["batchImage"]),
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
      `/api/SubjectInfo?BatchId=${encodeURIComponent(data.batchId)}&SubjectId=${encodeURIComponent(
        data.subjectId,
      )}&page=${data.page}`,
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
    (input: {
      batchId: string;
      subjectId: string;
      chapterId: string;
      kind: PwContentKind;
    }) => ({
      batchId: String(input.batchId),
      subjectId: String(input.subjectId),
      chapterId: String(input.chapterId),
      kind: input.kind,
    }),
  )
  .handler(async ({ data }): Promise<{ items: PwContentItem[] }> => {
    const payload = await api(
      `/api/TopicInfo?BatchId=${encodeURIComponent(data.batchId)}&SubjectId=${encodeURIComponent(
        data.subjectId,
      )}&TopicId=${encodeURIComponent(data.chapterId)}&ContentType=${
        CONTENT_TYPE_BY_KIND[data.kind] ?? "videos"
      }&page=1`,
    );

    const isPdfKind = data.kind === "note" || data.kind === "dppNote";
    const items: PwContentItem[] = [];

    for (const raw of pickList(payload)) {
      const video = obj(raw["videoDetails"]);
      const url = str(raw["url"]) || str(video["url"]);
      const teachers = arr(raw["teachers"])
        .map((t) => `${str(t["firstName"])} ${str(t["lastName"])}`.trim())
        .filter(Boolean);
      const date = str(raw["startTime"]) || str(raw["date"]);
      const baseId = str(raw["_id"]);

      if (isPdfKind) {
        // Each homework attachment is its own document row, like the source app.
        const homeworks = arr(raw["homeworkIds"]);
        const sources = homeworks.length ? homeworks : [raw];
        for (const hw of sources) {
          for (const att of arr(hw["attachmentIds"])) {
            const pdfUrl = imageOf(att);
            if (!pdfUrl) continue;
            items.push({
              id: str(att["_id"]) || baseId,
              kind: data.kind,
              title:
                str(hw["topic"]) ||
                str(att["name"]).replace(/\.pdf$/i, "") ||
                str(raw["topic"]) ||
                "Document",
              date,
              videoUrl: "",
              pdfUrl,
              teacher: "",
              thumbnail: "",
              isFree: raw["isFree"] === true,
            });
          }
        }
        continue;
      }

      items.push({
        id: baseId,
        kind: data.kind,
        title: str(raw["topic"]) || str(video["name"]) || "Untitled",
        date,
        videoUrl:
          toHls(url) ||
          streamById(str(video["_id"]) || str(video["id"])) ||
          streamById(baseId),

        pdfUrl: pdfFromHomework(raw),
        teacher: teachers[0] ?? "",
        thumbnail: str(video["image"]),
        isFree: raw["isFree"] === true,
      });
    }

    return { items: items.filter((i) => i.id && (i.videoUrl || i.pdfUrl || i.title)) };

  });

/** Resolves a note/DPP attachment id into its direct PDF URL. */
export const getPdfUrl = createServerFn({ method: "GET" })
  .inputValidator((input: { batchId: string; subjectId: string; pdfId: string }) => ({
    batchId: String(input.batchId),
    subjectId: String(input.subjectId),
    pdfId: String(input.pdfId),
  }))
  .handler(async ({ data }): Promise<{ url: string; name: string }> => {
    const payload = await api(
      `/api/GetPdf?BatchId=${encodeURIComponent(data.batchId)}&SubjectId=${encodeURIComponent(
        data.subjectId,
      )}&PdfId=${encodeURIComponent(data.pdfId)}`,
    );
    const d = obj(obj(payload)["data"]);
    return { url: imageOf(d), name: str(d["name"]) };
  });
