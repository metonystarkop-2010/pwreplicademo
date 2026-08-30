import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function OfferingTile({
  label,
  icon,
  to,
}: {
  label: string;
  icon: ReactNode;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3.5 rounded-2xl border border-border/60 bg-card px-5 py-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-raised sm:px-6"
    >
      <span className="grid size-8 shrink-0 place-items-center">{icon}</span>
      <span className="min-w-0 truncate text-[16px] font-bold tracking-[-0.01em] text-foreground sm:text-[17.5px]">{label}</span>
      <ChevronRight className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
    </Link>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect x="2" y="4" width="28" height="21" rx="4" fill="oklch(0.52 0.23 285)" />
      <path d="M13 10.5 21 14.5 13 18.5Z" fill="oklch(0.99 0 0)" />
      <line
        x1="10"
        y1="29"
        x2="22"
        y2="29"
        stroke="oklch(0.52 0.23 285)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TestIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="7" fill="oklch(0.52 0.23 285)" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="oklch(0.99 0 0)"
      >
        A+
      </text>
    </svg>
  );
}

export function DoubtIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <path
        d="M4 8a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-7l-7 6v-6H9a5 5 0 0 1-5-5V8Z"
        fill="oklch(0.52 0.23 285)"
      />
      <text
        x="16"
        y="18"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="oklch(0.99 0 0)"
      >
        ?
      </text>
    </svg>
  );
}

export function PiIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <text
        x="16"
        y="24"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="oklch(0.52 0.23 285)"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        pi
      </text>
    </svg>
  );
}

export function InfinitePracticeIcon() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect x="4" y="3" width="24" height="26" rx="5" fill="oklch(0.52 0.23 285)" />
      <rect x="8" y="7" width="8" height="6" rx="2" fill="oklch(0.99 0 0)" />
      <rect x="18" y="7" width="6" height="2.4" rx="1.2" fill="oklch(0.99 0 0)" />
      <rect x="18" y="11" width="6" height="2.4" rx="1.2" fill="oklch(0.99 0 0)" />
      <path
        d="M11 22a2.6 2.6 0 1 1 3.6 0 2.6 2.6 0 1 0 3.6 0 2.6 2.6 0 1 1 3.6 0"
        fill="none"
        stroke="oklch(0.99 0 0)"
        strokeWidth="2"
      />
    </svg>
  );
}
