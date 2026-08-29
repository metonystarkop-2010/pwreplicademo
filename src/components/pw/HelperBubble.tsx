export function HelperBubble() {
  return (
    <button
      type="button"
      aria-label="Open learning assistant"
      className="fixed bottom-6 right-7 z-30 grid size-[58px] place-items-center rounded-full bg-accent shadow-raised ring-2 ring-primary/35 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 64 64" className="size-[46px]" aria-hidden="true">
        <path
          d="M32 14c-9 0-14 5-14 12v6c0 9 6 16 14 16s14-7 14-16v-6c0-7-5-12-14-12Z"
          fill="oklch(0.85 0.07 60)"
        />
        <path
          d="M17 22c1-8 7-12 15-12s14 4 15 12c-4-3-9-4-15-4s-11 1-15 4Z"
          fill="oklch(0.28 0.03 265)"
        />
        <circle cx="25" cy="31" r="5" fill="none" stroke="oklch(0.28 0.03 265)" strokeWidth="2" />
        <circle cx="39" cy="31" r="5" fill="none" stroke="oklch(0.28 0.03 265)" strokeWidth="2" />
        <line x1="30" y1="31" x2="34" y2="31" stroke="oklch(0.28 0.03 265)" strokeWidth="2" />
        <path
          d="M27 40c2 1.6 8 1.6 10 0"
          fill="none"
          stroke="oklch(0.4 0.06 30)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
