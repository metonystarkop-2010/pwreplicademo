import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bookmark,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  History,
  LayoutGrid,
  MonitorPlay,
  Library as LibraryIcon,
  FileText,
  Swords,
  MessageSquareHeart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ZoneCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  chevron?: boolean;
};

const cards: ZoneCard[] = [
  {
    title: "My Batches",
    description: "View list of batches in which you are enrolled",
    icon: MonitorPlay,
    to: "/batches",
  },
  {
    title: "Dashboard",
    description: "Track your progress through detailed performance",
    icon: LayoutGrid,
    to: "/dashboard",
  },
  {
    title: "Saarthi",
    description: "Your 1:1 Personal Learning Companion",
    icon: MessageSquareHeart,
    to: "/pw-saarthi",
  },
  {
    title: "Library",
    description: "Access all your free material here",
    icon: LibraryIcon,
    to: "/library",
  },
  {
    title: "My History",
    description: "View your recent learning here",
    icon: History,
    to: "/my-history",
  },
  {
    title: "Bookmarks",
    description: "View the list of your saved questions",
    icon: Bookmark,
    to: "/bookmarks",
    chevron: true,
  },
  {
    title: "PDF Bank",
    description: "Download your Study PDFs from here",
    icon: FileText,
    to: "/pdf-bank",
  },
  {
    title: "Battlegrounds",
    description: "View all your live battlegrounds here",
    icon: Swords,
    to: "/battlegrounds",
  },
];

export function StudyZone() {
  const [expanded, setExpanded] = useState(true);
  const visible = expanded ? cards : cards.slice(0, 3);

  return (
    <section className="px-4 pb-14 pt-9 sm:px-6 lg:px-8">
      <h2 className="text-[20px] font-bold tracking-[-0.01em] text-foreground sm:text-[23px]">My Study Zone</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {visible.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.to}
              className="group relative rounded-2xl border border-border/60 bg-card px-5 py-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-raised sm:px-6"
            >
              {card.chevron && (
                <ChevronRight
                  className="absolute right-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                  strokeWidth={2.2}
                />
              )}
              <Icon className="size-[30px] text-primary" strokeWidth={1.6} />
              <h3 className="mt-4 text-[17.5px] font-bold tracking-[-0.01em] text-foreground">
                {card.title}
              </h3>
              <p className="mt-1.5 pr-6 text-[13.5px] leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-[15px] font-semibold text-foreground underline underline-offset-4 hover:text-primary"
        >
          {expanded ? "Show Less" : "Show More"}
          {expanded ? (
            <ChevronUp className="size-5" strokeWidth={2.4} />
          ) : (
            <ChevronDown className="size-5" strokeWidth={2.4} />
          )}
        </button>
      </div>
    </section>
  );
}
