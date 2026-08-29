import {
  BookOpen,
  Building2,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  Headphones,
  Monitor,
  Rocket,
  Share2,
  ShoppingCart,
  Zap,
  Mic,
  Aperture,
  ScrollText,
  RotateCcw,
  BookMarked,
  Footprints,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  isNew?: boolean;
};

export type NavSection = {
  heading: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    heading: "LEARN ONLINE",
    items: [
      { label: "Study", to: "/", icon: BookMarked },
      { label: "Pi", to: "/pi", icon: Aperture, isNew: true },
      { label: "Library", to: "/library", icon: BookOpen },
    ],
  },
  {
    heading: "STUDY PACKS",
    items: [
      { label: "Batches", to: "/batches", icon: Monitor },
      { label: "Power Batch", to: "/power-batch", icon: Zap },
      { label: "Test Series", to: "/test-series", icon: ClipboardList },
      { label: "My Test", to: "/my-test", icon: FileCheck2 },
      { label: "Scholarship", to: "/scholarship", icon: GraduationCap },
    ],
  },
  {
    heading: "OFFLINE",
    items: [{ label: "PW Centres", to: "/pw-centres", icon: Building2 }],
  },
  {
    heading: "EXPLORE PW",
    items: [
      { label: "PW Store", to: "/pw-store", icon: ShoppingCart },
      { label: "PW Books", to: "/pw-books", icon: BookMarked },
      { label: "PW Saarthi", to: "/pw-saarthi", icon: Footprints },
      { label: "PW Talk", to: "/pw-talk", icon: Mic, isNew: true },
      { label: "Pi Lens", to: "/pi-lens", icon: Aperture, isNew: true },
      { label: "Online Degree", to: "/online-degree", icon: ScrollText },
      { label: "DISHA", to: "/disha", icon: RotateCcw },
      { label: "Upskilling", to: "/upskilling", icon: Rocket },
    ],
  },
  {
    heading: "MORE",
    items: [
      { label: "Refer & Earn", to: "/refer-earn", icon: Share2 },
      { label: "Help & Support", to: "/help-support", icon: Headphones },
    ],
  },
];
