import { Link, useRouterState } from "@tanstack/react-router";
import { navSections } from "./nav-items";
import { cn } from "@/lib/utils";

export function Sidebar({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "scrollbar-slim h-full w-full shrink-0 overflow-y-auto overscroll-contain border-r border-sidebar-border bg-sidebar pb-12 lg:w-[248px]",
        className,
      )}
    >
      {navSections.map((section) => (
        <div key={section.heading} className="pt-5">
          <p className="px-5 pb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
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
                  onClick={onNavigate}
                  className={cn(
                    "group relative flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium transition-colors duration-150",
                    active
                      ? "bg-nav-active text-nav-active-foreground"
                      : "text-foreground/85 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] rounded-r bg-nav-active-foreground" />
                  )}
                  <Icon
                    className={cn(
                      "size-[18px] shrink-0 transition-colors",
                      active ? "text-nav-active-foreground" : "text-foreground/70",
                    )}
                    strokeWidth={1.8}
                  />
                  <span className="truncate">{item.label}</span>
                  {item.isNew && (
                    <span className="ml-auto inline-flex h-[17px] shrink-0 items-center bg-badge-new pl-2 pr-1.5 text-[9.5px] font-bold tracking-wide text-badge-new-foreground [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,6px_50%)]">
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mx-5 mt-5 border-b border-sidebar-border last:border-0" />
        </div>
      ))}
    </aside>
  );
}
