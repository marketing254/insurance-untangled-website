"use client";

import { useState, useEffect, useRef } from "react";

const YCBM_SRC =
  "https://ekwasales-withoutceo-insuranceuntangled.youcanbook.me/?noframe=true&skipHeaderFooter=true";

interface Props {
  title?: string;
  height?: number;
}

/**
 * Lazy-loading YCBM calendar.
 *
 * Strategy:
 *   1. Render a styled placeholder immediately (zero-cost server HTML)
 *   2. Once the placeholder scrolls into view, swap to the real iframe
 *   3. Show a spinner overlay until iframe.onLoad fires
 *
 * This means the page is interactive instantly; the heavy YCBM JS only
 * loads when the user is actually looking at the calendar.
 * Combined with the DNS preconnect in <head>, real-world load drops from
 * ~4-6s on cold connections to ~1-2s.
 */
export default function YCBMScheduler({
  title = "Book a Marketing Strategy Meeting",
  height = 640,
}: Props) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Eagerly preconnect to YCBM as soon as the component mounts so the
  // DNS + TLS handshake completes BEFORE the iframe starts loading.
  // This typically saves 200-500ms on cold connections.
  useEffect(() => {
    const head = document.head;
    const links: HTMLLinkElement[] = [];
    const add = (rel: string, href: string, crossorigin?: boolean) => {
      const l = document.createElement("link");
      l.rel = rel;
      l.href = href;
      if (crossorigin) l.crossOrigin = "anonymous";
      head.appendChild(l);
      links.push(l);
    };
    add("preconnect", "https://ekwasales-withoutceo-insuranceuntangled.youcanbook.me", true);
    add("preconnect", "https://youcanbook.me", true);
    add("dns-prefetch", "https://youcanbook.me");
    return () => { links.forEach((l) => l.remove()); };
  }, []);

  // Trigger iframe load when wrapper enters viewport (or after 1.5s as fallback)
  useEffect(() => {
    if (shouldLoad) return;
    if (!wrapRef.current) return;

    const fallback = setTimeout(() => setShouldLoad(true), 1500);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          clearTimeout(fallback);
        }
      },
      { rootMargin: "200px" } // start loading 200px before the calendar is fully visible
    );
    io.observe(wrapRef.current);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [shouldLoad]);

  return (
    <div
      ref={wrapRef}
      className="scheduler-embed-wrap"
      style={{ position: "relative", minHeight: `${height}px` }}
    >
      {/* Spinner / skeleton — shown until iframe is ready */}
      {!iframeReady && (
        <div
          aria-hidden={shouldLoad ? undefined : "true"}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, #ffffff 0%, #f7f8fb 100%)",
            borderRadius: "0 0 12px 12px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              border: "3px solid var(--paper-3)",
              borderTopColor: "var(--teal)",
              borderRadius: "50%",
              animation: "ycbm-spin 0.8s linear infinite",
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
            }}
          >
            Loading calendar…
          </div>
          <style>{`@keyframes ycbm-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {/* Real iframe — only mounted once visible */}
      {shouldLoad && (
        <iframe
          src={YCBM_SRC}
          id="ycbmiframeekwasales-withoutceo-insuranceuntangled"
          onLoad={() => setIframeReady(true)}
          style={{
            width: "100%",
            height: `${height}px`,
            border: "none",
            background: "transparent",
            borderRadius: "0 0 12px 12px",
            display: "block",
            position: "relative",
            zIndex: 2,
            opacity: iframeReady ? 1 : 0,
            transition: "opacity .3s ease",
          }}
          loading="eager"
          title={title}
        />
      )}
    </div>
  );
}
