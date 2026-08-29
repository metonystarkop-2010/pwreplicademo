import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader, XpPill } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chapters")({
  head: () => ({
    meta: [
      { title: "Chapters | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Chapter list with lectures, DPPs, notes, DPP PDFs and DPP videos tabs inside the learning console.",
      },
      { property: "og:title", content: "Chapters | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Chapter list with lectures, DPPs, notes and DPP tabs in the learning console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChaptersPage,
});

const contentTabs = ["All", "Lectures", "DPPs", "Notes", "DPP PDFs", "DPP Videos"] as const;

function ChaptersPage() {
  const [tab, setTab] = useState<(typeof contentTabs)[number]>("All");
  const [dppFilter, setDppFilter] = useState<"PENDING" | "COMPLETED">("PENDING");

  return (
    <AppShell courseChip={{ label: "Your Course" }}>
      <PageHeader title="All Classes" backTo="/all-classes">
        <XpPill />
      </PageHeader>

      <div className="px-8 py-6">
        <div className="grid gap-0 overflow-hidden rounded-2xl bg-card shadow-card lg:grid-cols-[380px_1fr]">
          <div className="border-b border-border p-7 lg:border-b-0 lg:border-r">
            <p className="text-[15px] font-bold tracking-[0.04em] text-foreground">ALL CHAPTERS</p>
            <div className="mt-5 rounded-xl border border-dashed border-border px-4 py-6 text-[14.5px] text-muted-foreground">
              Chapters will be listed here
            </div>
          </div>

          <div className="min-w-0 p-7">
            <div className="scrollbar-slim flex gap-8 overflow-x-auto border-b border-border">
              {contentTabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={cn(
                    "relative whitespace-nowrap pb-3 text-[17px] font-semibold transition-colors",
                    tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                  {tab === t && (
                    <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {tab === "DPPs" && (
              <div className="mt-7 flex gap-4">
                {(["PENDING", "COMPLETED"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setDppFilter(f)}
                    className={cn(
                      "rounded-full border px-6 py-2.5 text-[14.5px] font-semibold tracking-[0.02em] transition-colors",
                      dppFilter === f
                        ? "border-primary bg-tag text-tag-foreground"
                        : "border-border text-foreground hover:bg-secondary",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            <ContentOnTheWay subtitle="Folder's empty for now.... but it won't be for long!" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
