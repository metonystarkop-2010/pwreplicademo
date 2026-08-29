export function PwLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <text
        x="24"
        y="21.5"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="currentColor"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        P
      </text>
      <text
        x="24"
        y="35"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="currentColor"
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        W
      </text>
      <line x1="13" y1="24.5" x2="35" y2="24.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
