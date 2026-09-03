import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronDown, Info, MoreVertical, Search, Share2, Star, X } from "lucide-react";
import { listBatches } from "@/lib/pw.functions";
import { RowSkeletons, LoadFailed } from "./DataStates";

export function BatchBanner() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="banner-waves relative bg-banner px-4 pb-8 pt-6 text-banner-foreground sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-12 lg:pt-9">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-banner-foreground/55 sm:text-[11.5px]">
          Your Batch
        </p>

        <div className="mt-1.5 flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex min-w-0 items-center gap-2.5 text-left"
          >
            <span className="truncate text-[19px] font-bold leading-tight tracking-[-0.015em] sm:text-[22px] lg:text-[25px]">
              Select a batch
            </span>
            <ChevronDown
              className="size-[18px] shrink-0 text-banner-foreground/80 sm:size-5"
              strokeWidth={2.6}
            />
          </button>

          <div className="relative shrink-0">
            <button
              type="button"
              aria-label="Batch options"
              onClick={() => setMenuOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-md text-banner-foreground/90 hover:bg-card/10"
            >
              <MoreVertical className="size-5" strokeWidth={2.4} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-11 z-10 w-[210px] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-pop">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-[14.5px] font-medium hover:bg-secondary"
                >
                  <Info className="size-[18px]" strokeWidth={1.8} />
                  Description
                </button>
                <div className="border-t border-border" />
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-[14.5px] font-medium hover:bg-secondary"
                >
                  <Share2 className="size-[18px]" strokeWidth={1.8} />
                  Share batch
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {pickerOpen && <BatchPicker onClose={() => setPickerOpen(false)} />}
    </>
  );
}

function BatchPicker({ onClose }: { onClose: () => void }) {
  const fetchBatches = useServerFn(listBatches);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["pw", "batches", 1, search],
    queryFn: () => fetchBatches({ data: { page: 1, search } }),
    staleTime: 60_000,
  });

  const batches = data?.batches ?? [];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/50 backdrop-blur-[2px]">
      <div className="flex h-full w-full max-w-[480px] flex-col bg-card">
        <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-6 sm:px-8 sm:pt-7">
          <h2 className="min-w-0 truncate text-[19px] font-bold tracking-[-0.01em] text-foreground sm:text-[21px]">
            Select your batch
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="shrink-0">
            <X className="size-6 text-foreground" strokeWidth={2} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(query.trim());
          }}
          className="px-5 sm:px-8"
        >
          <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4 focus-within:border-primary">
            <Search className="size-[19px] shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search for your batches"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        </form>

        <div className="scrollbar-slim mt-6 flex-1 overflow-y-auto px-5 sm:px-8">
          <p className="text-[15px] font-bold text-foreground">
            {search ? "Search results" : "Available Batches"} ({batches.length})
          </p>

          <div className="mt-3 space-y-2 pb-6">
            {isPending ? (
              <RowSkeletons count={6} />
            ) : isError ? (
              <LoadFailed onRetry={() => void refetch()} />
            ) : batches.length === 0 ? (
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-5 text-[14px] text-muted-foreground">
                <Star className="size-5 shrink-0" strokeWidth={1.8} />
                No batches match your search
              </div>
            ) : (
              batches.map((b) => (
                <Link
                  key={b.id}
                  to="/batches/$batchId"
                  params={{ batchId: b.id }}
                  onClick={onClose}
                  className="flex items-center gap-3.5 rounded-xl border border-border p-3 transition-colors hover:bg-secondary"
                >
                  <span className="size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                    {b.image ? (
                      <img
                        src={b.image}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-foreground">
                      {b.name}
                    </span>
                    {b.language && (
                      <span className="mt-1 block text-[12px] text-muted-foreground">
                        {b.language}
                      </span>
                    )}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <Link
            to="/batches"
            onClick={onClose}
            className="flex h-13 w-full items-center justify-center rounded-xl bg-topbar py-4 text-[16px] font-bold text-topbar-foreground transition-opacity hover:opacity-90"
          >
            Browse all batches
          </Link>
        </div>
      </div>
    </div>
  );
}
