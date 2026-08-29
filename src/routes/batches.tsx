import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";

export const Route = createFileRoute("/batches")({
  head: () => ({
    meta: [
      { title: "Batches | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Browse and search study batches. Batch cards, filters and enrolment states in a clean console layout.",
      },
      { property: "og:title", content: "Batches | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Browse and search study batches inside the learning console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BatchesPage,
});

function BatchesPage() {
  return (
    <AppShell>
      <PageHeader title="Batches" search={{ placeholder: "Search for batches..." }} />
      <div className="px-8 py-6">
        <div className="rounded-2xl bg-card shadow-card">
          <ContentOnTheWay
            title="No Batches Yet"
            subtitle="Batches you explore or enrol in will be listed right here."
          />
        </div>
      </div>
    </AppShell>
  );
}
