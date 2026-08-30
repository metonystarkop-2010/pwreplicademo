import { ArrowLeft, Bell, Gift, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function XpPill({ value = 0 }: { value?: number }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5">
      <svg viewBox="0 0 24 24" className="size-5 sm:size-6" aria-hidden="true">
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
      <span className="text-[16px] font-bold leading-none text-foreground sm:text-[18px]">
        {value}
      </span>
    </span>
  );
}

export function StreakPill({ value = 0 }: { value?: number }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span className="grid size-8 place-items-center rounded-full bg-secondary">
        <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
          <path
            d="M13 2c1 4-3 5-3 8a3 3 0 0 0 6 0c2 2 3 4 3 6a7 7 0 0 1-14 0c0-6 6-8 8-14Z"
            fill="oklch(0.62 0.02 265)"
          />
        </svg>
      </span>
      <span className="text-[16px] font-bold leading-none text-foreground sm:text-[18px]">
        {value}
      </span>
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
    <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex min-h-[58px] items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        {backTo && (
          <Link to={backTo} aria-label="Go back" className="shrink-0 text-foreground">
            <ArrowLeft className="size-[21px]" strokeWidth={2} />
          </Link>
        )}
        <h1 className="min-w-0 truncate text-[18px] font-bold tracking-[-0.01em] text-foreground sm:text-[20px]">
          {title}
        </h1>

        {search && (
          <label className="ml-auto hidden h-10 w-full max-w-[320px] items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 transition-colors focus-within:border-primary md:flex">
            <Search className="size-[17px] shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder={search.placeholder}
              className="w-full bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        )}

        {children && (
          <div
            className={`flex shrink-0 items-center gap-3 sm:gap-4 ${search ? "md:ml-4" : "ml-auto"}`}
          >
            {children}
          </div>
        )}
        {search && !children && <span className="ml-auto md:hidden" />}
      </div>

      {search && (
        <div className="px-4 pb-3 sm:px-6 md:hidden">
          <label className="flex h-10 items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 focus-within:border-primary">
            <Search className="size-[17px] shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              placeholder={search.placeholder}
              className="w-full bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>
      )}
    </div>
  );
}

export function StudyHeaderWidgets() {
  return (
    <>
      <Gift className="hidden size-[23px] shrink-0 text-foreground sm:block" strokeWidth={1.6} />
      <StreakPill />
      <XpPill />
      <span className="relative shrink-0">
        <Bell className="size-[23px] text-foreground" strokeWidth={1.7} />
        <span className="absolute right-0 top-0 size-2 rounded-full bg-destructive" />
      </span>
    </>
  );
}
