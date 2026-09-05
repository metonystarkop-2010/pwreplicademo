import { createFileRoute } from "@tanstack/react-router";

const ALLOWED = ["static.pw.live", "cloudfront.net", "d1d34p8vz63oiq.cloudfront.net"];

/**
 * Streams a study document through this app so it can be shown inline.
 * The upstream file host forbids framing, so it must be served same-origin.
 */
export const Route = createFileRoute("/api/public/pw-file")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const raw = new URL(request.url).searchParams.get("url") ?? "";
        let target: URL;
        try {
          target = new URL(raw);
        } catch {
          return new Response("Bad url", { status: 400 });
        }
        if (target.protocol !== "https:" || !ALLOWED.some((h) => target.hostname.endsWith(h))) {
          return new Response("Host not allowed", { status: 403 });
        }

        const upstream = await fetch(target.toString(), {
          headers: { accept: "*/*" },
        });
        if (!upstream.ok || !upstream.body) {
          return new Response("Upstream error", { status: 502 });
        }

        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type": upstream.headers.get("content-type") ?? "application/pdf",
            "cache-control": "public, max-age=3600",
            "content-disposition": "inline",
          },
        });
      },
    },
  },
});
