import { X } from "lucide-react";
import { HlsPlayer } from "./HlsPlayer";

export type ViewerTarget = {
  title: string;
  videoUrl: string;
  pdfUrl: string;
  thumbnail: string;
};

export function ContentViewer({
  target,
  onClose,
}: {
  target: ViewerTarget;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-3 backdrop-blur-[2px] sm:p-6">
      <div className="flex max-h-full w-full max-w-[980px] flex-col overflow-hidden rounded-2xl bg-card shadow-pop">
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <h2 className="min-w-0 flex-1 truncate text-[15.5px] font-bold text-foreground sm:text-[17px]">
            {target.title}
          </h2>
          <button type="button" aria-label="Close" onClick={onClose} className="shrink-0">
            <X className="size-[22px] text-foreground" strokeWidth={2} />
          </button>
        </div>

        <div className="scrollbar-slim min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {target.videoUrl ? (
            <HlsPlayer src={target.videoUrl} poster={target.thumbnail} />
          ) : target.pdfUrl ? (
            <iframe
              src={`/api/public/pw-file?url=${encodeURIComponent(target.pdfUrl)}`}
              title={target.title}
              className="h-[70vh] w-full rounded-xl border border-border bg-secondary"
            />
          ) : (
            <p className="py-12 text-center text-[14.5px] text-muted-foreground">
              This item has no playable stream or attachment.
            </p>
          )}

          {target.pdfUrl && (
            <a
              href={`/api/public/pw-file?url=${encodeURIComponent(target.pdfUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-[14.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open PDF in new tab
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
