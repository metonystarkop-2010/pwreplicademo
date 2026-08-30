import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import pwLogo from "@/assets/pw-logo.png";
import studentAvatar from "@/assets/student-avatar.png";

export type CourseChip = { label: string; emoji?: string | undefined };

export function TopBar({
  courseChip,
  onMenuClick,
}: {
  courseChip?: CourseChip | undefined;
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 bg-topbar px-3 text-topbar-foreground sm:gap-4 sm:px-5">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenuClick}
        className="grid size-9 shrink-0 place-items-center rounded-lg text-topbar-foreground hover:bg-card/10 lg:hidden"
      >
        <Menu className="size-[22px]" strokeWidth={2.2} />
      </button>

      <Link to="/" className="flex min-w-0 items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-card">
          <img src={pwLogo} alt="Physics Wallah logo" className="size-8 object-contain" />
        </span>
        <span className="hidden truncate text-[17px] font-bold tracking-[-0.01em] sm:block">
          Physics Wallah
        </span>
      </Link>

      {courseChip && (
        <button
          type="button"
          className="ml-1 hidden min-w-0 items-center gap-2 rounded-lg bg-card px-3 py-1.5 text-[13.5px] font-bold text-foreground md:flex lg:ml-5"
        >
          <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" aria-hidden="true">
            <path d="M2 9 12 4.5 22 9l-10 4.5L2 9Z" fill="oklch(0.82 0.14 85)" />
            <path
              d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5l-6 2.7-6-2.7Z"
              fill="oklch(0.72 0.15 60)"
            />
          </svg>
          <span className="truncate">{courseChip.label}</span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" strokeWidth={2.4} />
        </button>
      )}

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <span className="hidden items-center gap-2 rounded-md bg-card px-2.5 py-1 xl:flex">
          <svg viewBox="0 0 24 24" className="size-5 text-foreground" aria-hidden="true">
            <path d="M4.5 6.5 L9 12 L4.5 17.5 Z" fill="oklch(0.6 0.2 145)" />
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

        <button type="button" className="flex items-center gap-2 sm:gap-2.5">
          <span className="hidden text-[14.5px] font-bold sm:block">Hi, Student</span>
          <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-secondary ring-1 ring-card/20">
            <img src={studentAvatar} alt="Student profile" className="size-9 object-cover" />
          </span>
          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" strokeWidth={2.4} />
        </button>
      </div>
    </header>
  );
}
