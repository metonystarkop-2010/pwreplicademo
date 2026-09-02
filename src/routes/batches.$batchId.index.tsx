import { Link, createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/pw/AppShell";
import { PageHeader } from "@/components/pw/PageHeader";
import { ContentOnTheWay } from "@/components/pw/EmptyState";
import { CardSkeletons, LoadFailed } from "@/components/pw/DataStates";
import { getBatchDetails } from "@/lib/pw.functions";
import { formatDate } from "@/lib/pw";

export const Route = createFileRoute("/batches/$batchId/")({
  head: () => ({
    meta: [
      { title: "Batch Subjects | Physics Wallah Learning Console" },
      {
        name: "description",
        content:
          "Subjects inside your batch, each with its own chapters, lectures, notes and DPPs.",
      },
      { property: "og:title", content: "Batch Subjects | Physics Wallah Learning Console" },
      {
        property: "og:description",
        content: "Open a subject to see its chapters, lectures, notes and DPPs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BatchDetailPage,
});

function BatchDetailPage() {
  const { batchId } = Route.useParams();
  const fetchDetails = useServerFn(getBatchDetails);

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pw", "batch", batchId],
    queryFn: () => fetchDetails({ data: { batchId } }),
    staleTime: 60_000,
  });

  return (
    <AppShell courseChip={{ label: data?.name || "Your Course" }}>
      <PageHeader title={data?.name || "Batch"} backTo="/batches" />

      <div className="px-4 py-5 sm:px-6 lg:px-8">
        {isPending ? (
          <CardSkeletons count={6} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" />
        ) : isError || !data ? (
          <div className="rounded-2xl border border-border/60 bg-card shadow-card">
            <LoadFailed onRetry={() => void refetch()} />
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
              <div className="banner-waves bg-banner px-5 py-6 text-banner-foreground sm:px-7 sm:py-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-banner-foreground/60">
                  Your Batch
                </p>
                <h2 className="mt-1.5 text-[20px] font-bold leading-tight tracking-[-0.01em] sm:text-[24px]">
                  {data.name}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-[12.5px] font-semibold">
                  {data.language && (
                    <span className="rounded-full bg-card/15 px-3 py-1">{data.language}</span>
                  )}
                  {data.startDate && (
                    <span className="rounded-full bg-card/15 px-3 py-1">
                      {formatDate(data.startDate)}
                      {data.endDate ? ` – ${formatDate(data.endDate)}` : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <h3 className="mt-7 text-[19px] font-bold tracking-[-0.01em] text-foreground sm:text-[21px]">
              Subjects ({data.subjects.length})
            </h3>

            {data.subjects.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-border/60 bg-card shadow-card">
                <ContentOnTheWay title="No Subjects Yet" />
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {data.subjects.map((s) => (
                  <Link
                    key={s.id}
                    to="/batches/$batchId/$subjectId"
                    params={{ batchId, subjectId: s.id }}
                    className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop"
                  >
                    <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-secondary">
                      {s.image ? (
                        <img src={s.image} alt="" loading="lazy" className="size-9 object-contain" />
                      ) : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15.5px] font-bold text-foreground">
                        {s.name}
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-muted-foreground">
                        {s.lectureCount} lectures
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
