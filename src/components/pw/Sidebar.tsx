import { Link, useRouterState } from "@tanstack/react-router";
import { navSections } from "./nav-items";
import { cn } from "@/lib/utils";

export function Sidebar({ className = "" }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "scrollbar-slim h-full w-[236px] shrink-0 overflow-y-auto overscroll-contain border-r border-sidebar-border bg-sidebar pb-10",
        className,
      )}
    >
      {navSections.map((section) => (
        <div key={section.heading} className="pt-6">
          <p className="px-6 pb-2 text-[11px] font-semibold tracking-[0.09em] text-muted-foreground">
            {section.heading}
          </p>
          <nav>
            {section.items.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative flex items-center gap-3 px-6 py-[13px] text-[14.5px] font-medium transition-colors",
                    active
                      ? "bg-nav-active text-nav-active-foreground"
                      : "text-foreground hover:bg-secondary",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-nav-active-foreground" />
                  )}
                  <Icon
                    className={cn(
                      "size-[19px] shrink-0",
                      active ? "text-nav-active-foreground" : "text-foreground",
                    )}
                    strokeWidth={1.7}
                  />
                  <span className="truncate">{item.label}</span>
                  {item.isNew && (
                    <span className="ml-auto inline-flex h-[18px] items-center bg-badge-new pl-2 pr-1.5 text-[10px] font-bold tracking-wide text-badge-new-foreground [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,6px_50%)]">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 border-b border-sidebar-border last:border-0" />
        </div>
      ))}
    </aside>
  );
}
