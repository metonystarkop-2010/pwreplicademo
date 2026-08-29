import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ComingSoon } from "@/components/pw/ComingSoon";

export const Route = createFileRoute("/upskilling")({
  head: () => ({
    meta: [
      { title: "Upskilling | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Upskilling inside the learning console. This screen is being built and will be available soon.",
      },
      { property: "og:title", content: "Upskilling | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Upskilling inside the learning console — we are working on it, coming soon.",
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
      <PageHeader title="Upskilling" backTo="/" />
      <ComingSoon screen="Upskilling" />
    </AppShell>
  );
}
