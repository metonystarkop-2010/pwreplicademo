import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader, XpPill } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/all-classes")({
  head: () => ({
    meta: [
      { title: "All Classes | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Subject-wise class listing with completion tracking, subjects and resources tabs in the learning console.",
      },
      { property: "og:title", content: "All Classes | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Subject-wise class listing with completion tracking and resources tabs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AllClassesPage,
});

const tabs = ["Subjects", "Resources"] as const;

function AllClassesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Subjects");
  const [noticeOpen, setNoticeOpen] = useState(true);

  return (
    <AppShell courseChip={{ label: "Your Course" }}>
      <PageHeader title="All Classes" backTo="/" search={{ placeholder: "Search for DPPs" }}>
        <XpPill />
      </PageHeader>

      <div className="bg-card">
        <div className="scrollbar-slim flex gap-6 overflow-x-auto px-4 sm:gap-8 sm:px-6 lg:px-8">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "relative py-3.5 text-[15px] font-semibold sm:text-[16px] transition-colors",
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
      </div>

      {noticeOpen && (
        <div className="flex items-center justify-between bg-notice px-4 py-3 sm:px-6 lg:px-8 text-notice-foreground">
          <p className="text-[13.5px] sm:text-[15px]">Completion % depends on lecture and DPP progress!</p>
          <button type="button" aria-label="Dismiss" onClick={() => setNoticeOpen(false)}>
            <X className="size-5" strokeWidth={2} />
          </button>
        </div>
      )}

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-card shadow-card">
          <ContentOnTheWay
            title={tab === "Subjects" ? "Subjects on the Way" : "Resources on the Way"}
            subtitle="Nothing here for now.... but it won't be for long!"
          />
        </div>
      </div>
    </AppShell>
  );
}
