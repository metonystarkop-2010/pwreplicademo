import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader, StudyHeaderWidgets } from "@/components/pw/PageHeader";
import { BatchBanner } from "@/components/pw/BatchBanner";
import {
  DoubtIcon,
  InfinitePracticeIcon,
  OfferingTile,
  PiIcon,
  PlayIcon,
  TestIcon,
} from "@/components/pw/OfferingTile";
import { NothingScheduled } from "@/components/pw/EmptyState";
import { StudyZone } from "@/components/pw/StudyZone";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study Dashboard | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Your batch offerings, upcoming events and study zone in one clean learning console interface.",
      },
      { property: "og:title", content: "Study Dashboard | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content:
          "Batch offerings, upcoming events and My Study Zone in one clean learning console interface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyPage,
});

function StudyPage() {
  return (
    <AppShell>
      <PageHeader title="Study">
        <StudyHeaderWidgets />
      </PageHeader>

      <BatchBanner />

      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-bold tracking-[-0.01em] text-foreground sm:text-[23px]">Batch Offerings</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
          <OfferingTile label="All Classes" icon={<PlayIcon />} to="/all-classes" />
          <OfferingTile label="All Tests" icon={<TestIcon />} to="/all-tests" />
          <OfferingTile label="My Doubts" icon={<DoubtIcon />} to="/my-doubts" />
          <OfferingTile label="Pi" icon={<PiIcon />} to="/pi" />
          <OfferingTile
            label="Infinite Practice"
            icon={<InfinitePracticeIcon />}
            to="/infinite-practice"
          />
        </div>
      </section>

      <section className="mt-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] font-bold tracking-[-0.01em] text-foreground sm:text-[23px]">
          Upcoming Events (0)
        </h2>
        <div className="mt-5 rounded-2xl border border-border/60 bg-card shadow-card">
          <NothingScheduled />
        </div>
      </section>

      <StudyZone />
    </AppShell>
  );
}
