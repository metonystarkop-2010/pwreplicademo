import { useState } from "react";
import { ChevronDown, Info, MoreVertical, Search, Share2, Star, X } from "lucide-react";

export function BatchBanner() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
            <span className="truncate text-[26px] font-bold leading-tight tracking-[-0.02em] sm:text-[32px] lg:text-[38px]">
              Select a batch
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
      </section>

      {pickerOpen && <BatchPicker onClose={() => setPickerOpen(false)} />}
    </>
  );
}

function BatchPicker({ onClose }: { onClose: () => void }) {
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
              placeholder="Search for your batches"
              className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="scrollbar-slim mt-6 flex-1 overflow-y-auto px-5 sm:px-8">
          <p className="text-[16px] font-bold text-foreground">Starred Batches (0)</p>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-5 text-[14px] text-muted-foreground">
            <Star className="size-5 shrink-0" strokeWidth={1.8} />
            No starred batches yet
          </div>

          <p className="mt-8 text-[16px] font-bold text-foreground">Free Batches (0)</p>
          <div className="mt-3 rounded-xl border border-dashed border-border px-4 py-5 text-[14px] text-muted-foreground">
            Your batches will appear here
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <button
            type="button"
            className="h-13 w-full rounded-xl bg-topbar py-4 text-[16px] font-bold text-topbar-foreground transition-opacity hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
