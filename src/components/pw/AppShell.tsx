import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { HelperBubble } from "./HelperBubble";

export function AppShell({
  children,
  courseChip,
}: {
  children: ReactNode;
  courseChip?: { label: string; emoji?: string };
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-surface">
      <TopBar courseChip={courseChip} />
      <div className="flex min-h-0 flex-1">
        <Sidebar className="hidden md:block" />
        <main className="scrollbar-slim relative min-w-0 flex-1 overflow-y-auto">
          {children}
          <HelperBubble />
        </main>
      </div>
    </div>
  );
}
