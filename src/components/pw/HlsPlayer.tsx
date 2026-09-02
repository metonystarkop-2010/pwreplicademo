import { useEffect, useRef, useState } from "react";

/**
 * Plays an HLS playlist. hls.js is imported lazily inside an effect so the
 * module never enters the SSR graph.
 */
export function HlsPlayer({ src, poster }: { src: string; poster?: string | undefined }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;
    setError("");

    let destroy = () => {};
    let cancelled = false;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      void import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) {
          if (!cancelled) setError("This browser cannot play the lecture stream.");
          return;
        }
        const hls = new Hls({ lowLatencyMode: false, enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, (_e, data) => {
          if (data.fatal) setError("The lecture stream could not be loaded.");
        });
        destroy = () => hls.destroy();
      });
    }

    return () => {
      cancelled = true;
      destroy();
    };
  }, [src]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-topbar">
      <video
        ref={videoRef}
        controls
        playsInline
        poster={poster}
        className="size-full bg-topbar"
      />
      {error && (
        <p className="absolute inset-x-0 bottom-0 bg-topbar/90 px-4 py-3 text-center text-[13px] text-topbar-foreground">
          {error}
        </p>
      )}
    </div>
  );
}
