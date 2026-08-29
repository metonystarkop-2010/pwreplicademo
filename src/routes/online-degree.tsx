import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ComingSoon } from "@/components/pw/ComingSoon";

export const Route = createFileRoute("/online-degree")({
  head: () => ({
    meta: [
      { title: "Online Degree | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Online Degree inside the learning console. This screen is being built and will be available soon.",
      },
      { property: "og:title", content: "Online Degree | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Online Degree inside the learning console — we are working on it, coming soon.",
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
      <PageHeader title="Online Degree" backTo="/" />
      <ComingSoon screen="Online Degree" />
    </AppShell>
  );
}
