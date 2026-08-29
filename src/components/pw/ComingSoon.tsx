export function ComingSoon({ screen }: { screen: string }) {
  return (
    <div className="flex min-h-[calc(100vh-118px)] flex-col items-center justify-center px-6 text-center">
      <svg viewBox="0 0 200 150" className="w-[200px]" aria-hidden="true">
        <circle cx="100" cy="72" r="56" fill="oklch(0.95 0.03 290)" />
        <rect x="52" y="52" width="96" height="62" rx="10" fill="oklch(0.99 0 0)" />
        <rect
          x="52"
          y="52"
          width="96"
          height="62"
          rx="10"
          fill="none"
          stroke="oklch(0.72 0.13 290)"
          strokeWidth="3"
        />
        <rect x="66" y="68" width="42" height="7" rx="3.5" fill="oklch(0.85 0.07 290)" />
        <rect x="66" y="83" width="66" height="7" rx="3.5" fill="oklch(0.9 0.04 290)" />
        <circle cx="100" cy="38" r="16" fill="oklch(0.99 0 0)" />
        <circle cx="100" cy="38" r="16" fill="none" stroke="oklch(0.55 0.2 285)" strokeWidth="3" />
        <line
          x1="100"
          y1="38"
          x2="100"
          y2="29"
          stroke="oklch(0.55 0.2 285)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="100"
          y1="38"
          x2="107"
          y2="42"
          stroke="oklch(0.55 0.2 285)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-tag px-4 py-1.5 text-[12px] font-bold tracking-[0.12em] text-tag-foreground">
        <span className="size-2 animate-pulse rounded-full bg-tag-foreground" />
        WORKING
      </span>
      <h2 className="mt-4 text-[30px] font-extrabold tracking-[-0.02em] text-foreground">
        COMING SOON
      </h2>
      <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
        We are working on it — the {screen} screen is being built and will be available here soon.
      </p>
    </div>
  );
}
