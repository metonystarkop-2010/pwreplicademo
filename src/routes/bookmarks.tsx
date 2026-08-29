import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ComingSoon } from "@/components/pw/ComingSoon";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: "Bookmarks | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Bookmarks inside the learning console. This screen is being built and will be available soon.",
      },
      { property: "og:title", content: "Bookmarks | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Bookmarks inside the learning console — we are working on it, coming soon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <PageHeader title="Bookmarks" backTo="/" />
      <ComingSoon screen="Bookmarks" />
    </AppShell>
  );
}
