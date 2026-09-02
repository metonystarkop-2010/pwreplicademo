import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { FileText, Play } from "lucide-react";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader, XpPill } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";
import { LoadFailed, RowSkeletons } from "@/components/pw/DataStates";
import { ContentViewer, type ViewerTarget } from "@/components/pw/ContentViewer";
import { getBatchDetails, listChapters, listContents } from "@/lib/pw.functions";
import { CONTENT_TABS, formatDate, type PwContentKind } from "@/lib/pw";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/batches/$batchId/$subjectId")({
  head: () => ({
    meta: [
      { title: "Chapters & Lectures | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Chapter list with lectures, notes, DPP PDFs and DPP videos, with an in-page player and PDF viewer.",
      },
      { property: "og:title", content: "Chapters & Lectures | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Lectures, notes, DPP PDFs and DPP videos for every chapter of your subject.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubjectPage,
});

function SubjectPage() {
  const { batchId, subjectId } = Route.useParams();
  const fetchDetails = useServerFn(getBatchDetails);
  const fetchChapters = useServerFn(listChapters);
  const fetchContents = useServerFn(listContents);

  const [chapterId, setChapterId] = useState("");
  const [kind, setKind] = useState<PwContentKind>("lecture");
  const [viewing, setViewing] = useState<ViewerTarget | null>(null);

  const details = useQuery({
    queryKey: ["pw", "batch", batchId],
    queryFn: () => fetchDetails({ data: { batchId } }),
    staleTime: 60_000,
  });
  const subject = details.data?.subjects.find((s) => s.id === subjectId);

  const chapters = useQuery({
    queryKey: ["pw", "chapters", batchId, subjectId],
    queryFn: () => fetchChapters({ data: { batchId, subjectId } }),
    staleTime: 60_000,
  });

  const list = chapters.data?.chapters ?? [];
  useEffect(() => {
    if (!chapterId && list.length > 0) setChapterId(list[0]!.id);
  }, [chapterId, list]);

  const contents = useQuery({
    queryKey: ["pw", "contents", batchId, subjectId, chapterId, kind],
    queryFn: () => fetchContents({ data: { batchId, subjectId, chapterId, kind } }),
    enabled: Boolean(chapterId),
    staleTime: 60_000,
  });

  const items = contents.data?.items ?? [];

  return (
    <AppShell courseChip={{ label: details.data?.name || "Your Course" }}>
      <PageHeader title={subject?.name || "Chapters"} backTo="/batches">
        <XpPill />
      </PageHeader>

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr]">
          <div className="border-b border-border p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <p className="text-[15px] font-bold tracking-[0.04em] text-foreground">ALL CHAPTERS</p>

            <div className="scrollbar-slim mt-4 max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {chapters.isPending ? (
                <RowSkeletons count={6} />
              ) : chapters.isError ? (
                <LoadFailed onRetry={() => void chapters.refetch()} />
              ) : list.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border px-4 py-6 text-[14.5px] text-muted-foreground">
                  No chapters in this subject yet.
                </p>
              ) : (
                list.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setChapterId(c.id)}
                    className={cn(
                      "w-full rounded-xl border px-4 py-3 text-left transition-colors",
                      chapterId === c.id
                        ? "border-primary bg-tag"
                        : "border-border hover:bg-secondary",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[14.5px] font-semibold leading-snug",
                        chapterId === c.id ? "text-tag-foreground" : "text-foreground",
                      )}
                    >
                      {c.name}
                    </span>
                    <span className="mt-1 block text-[12px] text-muted-foreground">
                      {c.videos} videos · {c.notes} notes · {c.exercises} DPPs
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="min-w-0 p-5 sm:p-6">
            <div className="scrollbar-slim flex gap-8 overflow-x-auto border-b border-border">
              {CONTENT_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setKind(t.key)}
                  className={cn(
                    "relative whitespace-nowrap pb-3 text-[15px] font-semibold transition-colors sm:text-[16px]",
                    kind === t.key ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t.label}
                  {kind === t.key && (
                    <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {!chapterId || contents.isPending ? (
                <RowSkeletons count={5} />
              ) : contents.isError ? (
                <LoadFailed onRetry={() => void contents.refetch()} />
              ) : items.length === 0 ? (
                <ContentOnTheWay subtitle="Folder's empty for now.... but it won't be for long!" />
              ) : (
                <div className="space-y-3">
                  {items.map((item) => {
                    const isVideo = Boolean(item.videoUrl);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          setViewing({
                            title: item.title,
                            videoUrl: item.videoUrl,
                            pdfUrl: item.pdfUrl,
                            thumbnail: item.thumbnail,
                          })
                        }
                        className="flex w-full items-center gap-4 rounded-xl border border-border/70 bg-card p-3.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-card sm:p-4"
                      >
                        <span
                          className={cn(
                            "grid size-12 shrink-0 place-items-center rounded-xl",
                            isVideo ? "bg-primary/10 text-primary" : "bg-secondary text-foreground",
                          )}
                        >
                          {isVideo ? (
                            <Play className="size-5" strokeWidth={2.4} />
                          ) : (
                            <FileText className="size-5" strokeWidth={2} />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold text-foreground">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block truncate text-[12.5px] text-muted-foreground">
                            {[item.teacher, formatDate(item.date)].filter(Boolean).join(" · ")}
                          </span>
                        </span>
                        {item.isFree && (
                          <span className="shrink-0 rounded-full bg-tag px-2.5 py-1 text-[11.5px] font-bold text-tag-foreground">
                            FREE
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {viewing && <ContentViewer target={viewing} onClose={() => setViewing(null)} />}
    </AppShell>
  );
}
