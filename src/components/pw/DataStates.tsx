export function CardSkeletons({ count = 8, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border/60 bg-card p-4 shadow-card"
        >
          <div className="aspect-video w-full rounded-xl bg-muted" />
          <div className="mt-4 h-4 w-4/5 rounded bg-muted" />
          <div className="mt-2 h-3 w-2/5 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function RowSkeletons({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-4 rounded-xl border border-border/60 bg-card p-4"
        >
          <div className="size-12 shrink-0 rounded-lg bg-muted" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-3/5 rounded bg-muted" />
            <div className="mt-2 h-3 w-1/4 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadFailed({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <h3 className="text-[18px] font-bold text-foreground">Couldn't load this content</h3>
      <p className="mt-1.5 max-w-sm text-[14px] text-muted-foreground">
        The content service didn't respond. Check your connection and try again.
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-[14px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      )}
    </div>
  );
}
