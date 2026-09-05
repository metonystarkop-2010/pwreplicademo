import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Info, MoreVertical, Search, Share2, Star, X } from "lucide-react";
import { useEnrolledBatches } from "@/lib/enrolled";

export function BatchBanner() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { batches } = useEnrolledBatches();
  const current = batches[0];

  return (
    <>
      <section className="banner-waves relative bg-banner px-4 pb-10 pt-8 text-banner-foreground sm:px-6 sm:pb-14 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-banner-foreground/55 sm:text-[12.5px]">
          Your Batch
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <span className="truncate text-[22px] font-bold leading-tight tracking-[-0.02em] sm:text-[27px] lg:text-[31px]">
              {current ? current.name : "Select a batch"}
            </span>
            <ChevronDown
              className="size-5 shrink-0 text-banner-foreground/80 sm:size-6"
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

        {current && (
          <Link
            to="/batches/$batchId"
            params={{ batchId: current.id }}
            className="mt-4 inline-flex h-10 items-center rounded-xl bg-card px-4 text-[14px] font-bold text-primary shadow-card transition-opacity hover:opacity-90"
          >
            Open batch
          </Link>
        )}
      </section>

      {pickerOpen && <BatchPicker onClose={() => setPickerOpen(false)} />}
    </>
  );
}

function BatchPicker({ onClose }: { onClose: () => void }) {
  const { batches, enroll } = useEnrolledBatches();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const visible = batches.filter((b) => b.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/50 backdrop-blur-[2px]">
      <div className="flex h-full w-full max-w-[480px] flex-col bg-card">
        <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-6 sm:px-8 sm:pt-7">
          <h2 className="min-w-0 truncate text-[21px] font-bold tracking-[-0.01em] text-foreground sm:text-[24px]">
            Select your batch
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="shrink-0">
            <X className="size-6 text-foreground" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 sm:px-8">
          <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4 focus-within:border-primary">
            <Search className="size-[19px] shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for your batches"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="scrollbar-slim mt-6 flex-1 overflow-y-auto px-5 sm:px-8">
          <p className="text-[16px] font-bold text-foreground">
            Your Batches ({batches.length})
          </p>

          {visible.length === 0 ? (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-5 text-[14px] text-muted-foreground">
              <Star className="size-5 shrink-0" strokeWidth={1.8} />
              No batches added yet — enroll from the Batches page.
            </div>
          ) : (
            <ul className="mt-3 space-y-3">
              {visible.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => {
                      enroll(b);
                      onClose();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left transition-colors hover:bg-secondary"
                  >
                    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-secondary">
                      {b.image ? (
                        <img src={b.image} alt="" loading="lazy" className="size-full object-cover" />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[14.5px] font-bold text-foreground">
                      {b.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-5 sm:p-8">
          <button
            type="button"
            onClick={() => {
              onClose();
              void navigate({ to: "/batches" });
            }}
            className="h-13 w-full rounded-xl bg-topbar py-4 text-[16px] font-bold text-topbar-foreground transition-opacity hover:opacity-90"
          >
            Browse all batches
          </button>
        </div>
      </div>
    </div>
  );
}
