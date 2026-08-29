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

      <section className="px-8 pt-9">
        <h2 className="text-[26px] font-bold tracking-[-0.01em] text-foreground">Batch Offerings</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      <section className="mt-12 px-8">
        <h2 className="text-[26px] font-bold tracking-[-0.01em] text-foreground">
          Upcoming Events (0)
        </h2>
        <div className="mt-6 rounded-2xl bg-card shadow-card">
          <NothingScheduled />
        </div>
      </section>

      <StudyZone />
    </AppShell>
  );
}
