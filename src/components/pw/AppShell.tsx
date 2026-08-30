import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { TopBar, type CourseChip } from "./TopBar";

export function AppShell({
  children,
  courseChip,
}: {
  children: ReactNode;
  courseChip?: CourseChip | undefined;
}) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-surface">
      <TopBar courseChip={courseChip} onMenuClick={() => setNavOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <Sidebar className="hidden lg:block" />

        <main className="scrollbar-slim relative min-w-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </main>
      </div>

      {/* Mobile / tablet navigation drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${navOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!navOpen}
      >
        <div
          role="presentation"
          onClick={() => setNavOpen(false)}
          className={`absolute inset-0 bg-foreground/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[85vw] max-w-[300px] flex-col bg-sidebar shadow-pop transition-transform duration-300 ease-out ${
            navOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-sidebar-border px-5">
            <span className="text-[15px] font-bold tracking-[-0.01em] text-foreground">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setNavOpen(false)}
              className="grid size-9 place-items-center rounded-lg text-foreground hover:bg-secondary"
            >
              <X className="size-5" strokeWidth={2.2} />
            </button>
          </div>
          <Sidebar
            className="min-h-0 flex-1 border-r-0"
            onNavigate={() => setNavOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}
