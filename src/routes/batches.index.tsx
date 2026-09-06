import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ComingSoon } from "@/components/pw/ComingSoon";

export const Route = createFileRoute("/batches/")({
  head: () => ({
    meta: [
      { title: "Batches | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Batches screen of the learning console, with search and subject listing layout in a clean premium interface.",
      },
      { property: "og:title", content: "Batches | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Batches screen of the learning console with search and listing layout.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BatchesPage,
});

function BatchesPage() {
  const [query, setQuery] = useState("");

  return (
    <AppShell>
      <PageHeader title="Batches" backTo="/" />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-[520px] items-center gap-2.5"
        >
          <label className="flex h-11 flex-1 items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 focus-within:border-primary">
            <Search className="size-[18px] shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for batches..."
              className="w-full bg-transparent text-[14.5px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-primary px-5 text-[14.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-5 rounded-2xl border border-border/60 bg-card shadow-card">
          <ComingSoon screen="Batches" />
        </div>
      </div>
    </AppShell>
  );
}
