import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar, type CourseChip } from "./TopBar";

export function AppShell({
  children,
  courseChip,
}: {
  children: ReactNode;
  courseChip?: CourseChip | undefined;
}) {
  return (
    <div className="flex h-[calc(100vh/0.85)] flex-col overflow-hidden bg-surface">
      <TopBar courseChip={courseChip} />
      <div className="flex min-h-0 flex-1">
        <Sidebar className="hidden md:block" />
        <main className="scrollbar-slim relative min-w-0 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
