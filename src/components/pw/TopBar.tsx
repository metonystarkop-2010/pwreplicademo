import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { PwLogo } from "./PwLogo";

export function TopBar({
  courseChip,
}: {
  courseChip?: { label: string; emoji?: string };
}) {
  return (
    <header className="flex h-[56px] shrink-0 items-center gap-4 bg-topbar px-5 text-topbar-foreground">
      <Link to="/" className="flex items-center gap-2.5">
        <PwLogo className="size-8 text-topbar-foreground" />
        <span className="text-[19px] font-bold tracking-[-0.01em]">Physics Wallah</span>
      </Link>

      {courseChip && (
        <button
          type="button"
          className="ml-6 flex items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-[14px] font-bold text-foreground"
        >
          {courseChip.emoji && <span className="text-[15px]">{courseChip.emoji}</span>}
          <span>{courseChip.label}</span>
          <ChevronRight className="size-4 text-muted-foreground" strokeWidth={2.4} />
        </button>
      )}

      <div className="ml-auto flex items-center gap-5">
        <span className="flex items-center gap-2 rounded-md bg-card px-2.5 py-1">
          <svg viewBox="0 0 24 24" className="size-5 text-foreground" aria-hidden="true">
            <path
              d="M4.5 6.5 L9 12 L4.5 17.5 Z"
              fill="oklch(0.6 0.2 145)"
            />
            <path d="M9 12 L4.5 6.5 L17 3 Z" fill="oklch(0.72 0.19 60)" />
            <path d="M9 12 L4.5 17.5 L17 21 Z" fill="oklch(0.6 0.22 25)" />
            <path d="M9 12 L17 3 L20.5 12 L17 21 Z" fill="oklch(0.65 0.2 250)" />
          </svg>
          <span className="leading-none">
            <span className="block text-[8px] font-semibold uppercase text-muted-foreground">
              Get it on
            </span>
            <span className="block text-[12px] font-bold text-foreground">Google Play</span>
          </span>
        </span>

        <button type="button" className="flex items-center gap-2.5">
          <span className="text-[15px] font-bold">Hi, Student</span>
          <span className="grid size-9 place-items-center overflow-hidden rounded-full bg-secondary text-[13px] font-bold text-secondary-foreground">
            S
          </span>
          <ChevronDown className="size-4 text-muted-foreground" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
