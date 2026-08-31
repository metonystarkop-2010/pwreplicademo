/**
 * Shared, browser-safe types + helpers for the PW content API.
 * No network calls live here — see pw.functions.ts for the server functions.
 */

export type PwBatch = {
  id: string;
  name: string;
  image: string;
  className: string;
  exam: string;
  language: string;
  startsOn: string;
  price: number;
  offPrice: number;
};

export type PwSubject = {
  id: string;
  slug: string;
  name: string;
  image: string;
  lectureCount: number;
  tagCount: number;
};

export type PwBatchDetails = {
  id: string;
  name: string;
  byName: string;
  image: string;
  className: string;
  language: string;
  startDate: string;
  endDate: string;
  subjects: PwSubject[];
};

export type PwChapter = {
  id: string;
  name: string;
  slug: string;
  videos: number;
  notes: number;
  exercises: number;
};

export type PwContentKind = "lecture" | "note" | "dppNote" | "dppVideo";

export type PwContentItem = {
  id: string;
  kind: PwContentKind;
  title: string;
  date: string;
  /** HLS playlist URL, playable with hls.js */
  videoUrl: string;
  /** Direct PDF link when the item is a note / DPP */
  pdfUrl: string;
  teacher: string;
  thumbnail: string;
  isFree: boolean;
};

export const CONTENT_TABS = [
  { key: "lecture", label: "Lectures" },
  { key: "note", label: "Notes" },
  { key: "dppNote", label: "DPP PDFs" },
  { key: "dppVideo", label: "DPP Videos" },
] as const;

export function formatDate(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}
