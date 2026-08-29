import { ArrowLeft, Bell, Gift, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function XpPill({ value = 0 }: { value?: number }) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
        <path
          d="M12 2.5 20 7v10l-8 4.5L4 17V7l8-4.5Z"
          fill="oklch(0.9 0.05 260)"
          stroke="oklch(0.62 0.16 262)"
          strokeWidth="1.2"
        />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="oklch(0.45 0.18 265)"
        >
          XP
        </text>
      </svg>
      <span className="text-[20px] font-bold leading-none text-foreground">{value}</span>
    </span>
  );
}

export function StreakPill({ value = 0 }: { value?: number }) {
  return (
    <span className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-full bg-secondary">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M13 2c1 4-3 5-3 8a3 3 0 0 0 6 0c2 2 3 4 3 6a7 7 0 0 1-14 0c0-6 6-8 8-14Z"
            fill="oklch(0.62 0.02 265)"
          />
        </svg>
      </span>
      <span className="text-[20px] font-bold leading-none text-foreground">{value}</span>
    </span>
  );
}

export function PageHeader({
  title,
  backTo,
  search,
  children,
}: {
  title: string;
  backTo?: string;
  search?: { placeholder: string } | undefined;
  children?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 flex h-[62px] items-center gap-4 border-b border-border bg-card px-7">
      {backTo && (
        <Link to={backTo} aria-label="Go back" className="text-foreground">
          <ArrowLeft className="size-[22px]" strokeWidth={2} />
        </Link>
      )}
      <h1 className="text-[21px] font-bold tracking-[-0.01em] text-foreground">{title}</h1>

      <div className="ml-auto flex items-center gap-5">
        {search && (
          <label className="flex h-11 w-[330px] items-center gap-3 rounded-xl border border-border px-4">
            <Search className="size-[18px] text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder={search.placeholder}
              className="w-full bg-transparent text-[14.5px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        )}
        {children}
      </div>
    </div>
  );
}

export function StudyHeaderWidgets() {
  return (
    <>
      <Gift className="size-[26px] text-foreground" strokeWidth={1.6} />
      <StreakPill />
      <XpPill />
      <span className="relative">
        <Bell className="size-[26px] text-foreground" strokeWidth={1.7} />
        <span className="absolute right-0 top-0 size-2 rounded-full bg-destructive" />
      </span>
    </>
  );
}
