import { useState } from "react";
import { ChevronDown, Info, MoreVertical, Search, Share2, Star, X } from "lucide-react";

export function BatchBanner() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="banner-waves relative h-[248px] bg-banner px-8 pt-[68px] text-banner-foreground">
        <p className="text-[13px] font-semibold tracking-[0.12em] text-banner-foreground/55">
          YOUR BATCH
        </p>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="mt-2 flex items-center gap-4"
        >
          <span className="max-w-[420px] truncate text-[40px] font-bold leading-tight tracking-[-0.02em]">
            Select a batch
          </span>
          <ChevronDown className="size-6 text-banner-foreground/80" strokeWidth={2.6} />
        </button>

        <div className="absolute right-6 top-[74px]">
          <button
            type="button"
            aria-label="Batch options"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md text-banner-foreground/90 hover:bg-card/10"
          >
            <MoreVertical className="size-5" strokeWidth={2.4} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-11 w-[220px] overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-pop">
              <button
                type="button"
                className="flex w-full items-center gap-3 px-5 py-4 text-[15px] font-medium hover:bg-secondary"
              >
                <Info className="size-[19px] text-foreground" strokeWidth={1.8} />
                Description
              </button>
              <div className="border-t border-border" />
              <button
                type="button"
                className="flex w-full items-center gap-3 px-5 py-4 text-[15px] font-medium hover:bg-secondary"
              >
                <Share2 className="size-[19px] text-foreground" strokeWidth={1.8} />
                Share batch
              </button>
            </div>
          )}
        </div>
      </section>

      {pickerOpen && <BatchPicker onClose={() => setPickerOpen(false)} />}
    </>
  );
}

function BatchPicker({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-foreground/45">
      <div className="flex h-full w-full max-w-[520px] flex-col bg-card">
        <div className="flex items-center justify-between px-9 pb-6 pt-8">
          <h2 className="text-[26px] font-bold tracking-[-0.01em] text-foreground">
            Select your batch
          </h2>
          <button type="button" aria-label="Close" onClick={onClose}>
            <X className="size-7 text-foreground" strokeWidth={2} />
          </button>
        </div>

        <div className="px-9">
          <label className="flex h-[54px] items-center gap-3 rounded-xl border border-border px-5">
            <Search className="size-[20px] text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder="Search for your batches"
              className="w-full bg-transparent text-[16px] outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="scrollbar-slim mt-8 flex-1 overflow-y-auto px-9">
          <p className="text-[17px] font-bold text-foreground">Starred Batches (0)</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-5 text-[14.5px] text-muted-foreground">
            <Star className="size-5 text-muted-foreground" strokeWidth={1.8} />
            No starred batches yet
          </div>

          <p className="mt-9 text-[17px] font-bold text-foreground">Free Batches (0)</p>
          <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-5 text-[14.5px] text-muted-foreground">
            Your batches will appear here
          </div>
        </div>

        <div className="p-9">
          <button
            type="button"
            className="h-[58px] w-full rounded-xl bg-topbar text-[17px] font-bold text-topbar-foreground"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
