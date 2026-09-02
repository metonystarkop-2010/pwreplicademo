import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";
import { CardSkeletons, LoadFailed } from "@/components/pw/DataStates";
import { listBatches } from "@/lib/pw.functions";
import { formatDate } from "@/lib/pw";

export const Route = createFileRoute("/batches/")({
  head: () => ({
    meta: [
      { title: "Batches | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Browse and search live study batches with subjects, lectures, notes and DPPs in a clean console layout.",
      },
      { property: "og:title", content: "Batches | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Browse and search live study batches inside the learning console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BatchesPage,
});

function BatchesPage() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pw", "batches", page, search],
    queryFn: () => listBatches({ data: { page, search } }),
    staleTime: 60_000,
  });

  const batches = data?.batches ?? [];

  return (
    <AppShell>
      <PageHeader title="Batches" />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setSearch(query.trim());
          }}
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

        <div className="mt-5">
          {isPending ? (
            <CardSkeletons
              count={8}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
            />
          ) : isError ? (
            <div className="rounded-2xl border border-border/60 bg-card shadow-card">
              <LoadFailed onRetry={() => void refetch()} />
            </div>
          ) : batches.length === 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card shadow-card">
              <ContentOnTheWay
                title="No Batches Found"
                subtitle="Try a different search term to find your batch."
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {batches.map((b) => (
                <Link
                  key={b.id}
                  to="/batches/$batchId"
                  params={{ batchId: b.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop"
                >
                  <div className="aspect-video w-full overflow-hidden bg-secondary">
                    {b.image ? (
                      <img
                        src={b.image}
                        alt={b.name}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-[15.5px] font-bold leading-snug tracking-[-0.01em] text-foreground">
                      {b.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {b.language && (
                        <span className="rounded-full bg-tag px-2.5 py-1 text-[11.5px] font-semibold text-tag-foreground">
                          {b.language}
                        </span>
                      )}
                      {b.type && (
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11.5px] font-semibold text-foreground/70">
                          {b.type}
                        </span>
                      )}
                    </div>
                    {b.startDate && (
                      <p className="mt-auto pt-3 text-[12.5px] text-muted-foreground">
                        Starts {formatDate(b.startDate)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {!isPending && !isError && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="text-[14px] font-semibold text-foreground">Page {page}</span>
            <button
              type="button"
              disabled={batches.length === 0}
              onClick={() => setPage((p) => p + 1)}
              className="grid size-10 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
