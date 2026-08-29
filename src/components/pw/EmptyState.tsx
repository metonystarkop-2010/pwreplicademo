export function ContentOnTheWay({
  title = "Content on the Way",
  subtitle = "Folder's empty for now.... but it won't be for long!",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <svg viewBox="0 0 200 180" className="w-[190px]" aria-hidden="true">
        <circle cx="100" cy="88" r="62" fill="oklch(0.93 0.04 250)" />
        <rect x="58" y="44" width="70" height="92" rx="6" fill="oklch(0.99 0 0)" />
        <rect
          x="58"
          y="44"
          width="70"
          height="92"
          rx="6"
          fill="none"
          stroke="oklch(0.78 0.09 250)"
          strokeWidth="2"
        />
        <path d="M128 44v92l24-14V30l-24 14Z" fill="oklch(0.62 0.16 258)" />
        <g stroke="oklch(0.84 0.06 250)" strokeWidth="5" strokeLinecap="round">
          <line x1="70" y1="62" x2="116" y2="62" />
          <line x1="70" y1="78" x2="106" y2="78" />
          <line x1="70" y1="94" x2="112" y2="94" />
        </g>
        <circle
          cx="126"
          cy="112"
          r="24"
          fill="oklch(0.99 0 0)"
          stroke="oklch(0.68 0.19 45)"
          strokeWidth="4"
        />
        <text
          x="126"
          y="121"
          textAnchor="middle"
          fontSize="24"
          fontWeight="700"
          fill="oklch(0.68 0.19 45)"
        >
          ?
        </text>
        <line
          x1="143"
          y1="129"
          x2="160"
          y2="148"
          stroke="oklch(0.68 0.19 45)"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
      <h3 className="mt-7 text-[24px] font-bold tracking-[-0.01em] text-foreground">{title}</h3>
      <p className="mt-2 text-[16px] text-foreground/80">{subtitle}</p>
    </div>
  );
}

export function NothingScheduled({
  title = "No Events Scheduled",
  subtitle = "Your upcoming classes and tests will show up here.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <svg viewBox="0 0 200 160" className="w-[170px]" aria-hidden="true">
        <path d="M40 96c-14-6-22-18-14-28 6-8 20-8 28 0Z" fill="oklch(0.82 0.13 60)" />
        <path d="M44 108c-16 0-28-8-26-20 2-10 16-14 26-8Z" fill="oklch(0.8 0.12 320)" />
        <circle
          cx="112"
          cy="80"
          r="44"
          fill="oklch(0.99 0 0)"
          stroke="oklch(0.65 0.16 240)"
          strokeWidth="5"
        />
        <circle cx="112" cy="80" r="34" fill="none" stroke="oklch(0.9 0.03 240)" strokeWidth="2" />
        <line
          x1="112"
          y1="80"
          x2="112"
          y2="56"
          stroke="oklch(0.6 0.2 300)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="112"
          y1="80"
          x2="130"
          y2="88"
          stroke="oklch(0.6 0.2 300)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="112" cy="80" r="4" fill="oklch(0.6 0.2 300)" />
      </svg>
      <h3 className="mt-6 text-[20px] font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 text-[14.5px] text-muted-foreground">{subtitle}</p>
    </div>
  );
}
