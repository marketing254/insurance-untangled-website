"use client";

import { useEffect, useState } from "react";
import { fetchSheetClient } from "@/lib/sheets-client";

interface Episode {
  episode: string;
  title: string;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export default function StickyPodcastBar() {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("iu_sticky_dismissed") === "1") return;

    setDismissed(false);

    fetchSheetClient("podcasts")
      .then((rows) => {
        const valid = rows.filter((r) => r.episode && r.title);
        if (valid.length === 0) return;
        const latest = valid.reduce((best, cur) => {
          const bestNum = parseInt(best.episode) || 0;
          const curNum = parseInt(cur.episode) || 0;
          return curNum > bestNum ? cur : best;
        });
        setEpisode({ episode: latest.episode, title: latest.title });
        // Trigger slide-up after a tick so the animation plays
        requestAnimationFrame(() => setVisible(true));
      })
      .catch(() => {});
  }, []);

  function handleDismiss() {
    setVisible(false);
    sessionStorage.setItem("iu_sticky_dismissed", "1");
    // Wait for slide-down animation before fully hiding
    setTimeout(() => setDismissed(true), 300);
  }

  if (dismissed || !episode) return null;

  const epNum = episode.episode.replace(/\D/g, "");
  const href = `/podcast/${epNum}-${slugify(episode.title)}/`;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9998,
        background: "#1b2a4a",
        color: "#fff",
        padding: "0.75rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "var(--sans, system-ui, sans-serif)",
        fontSize: "14px",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.3, 1)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.25)",
      }}
    >
      <span
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        Latest: Ep {epNum} &mdash; {episode.title}
      </span>

      <a
        href={href}
        style={{
          color: "#a8c4e4",
          fontWeight: 600,
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "color 0.18s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#a8c4e4")}
      >
        Listen &rarr;
      </a>

      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{
          background: "rgba(255,255,255,0.12)",
          border: "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
          fontSize: "16px",
          lineHeight: 1,
          flexShrink: 0,
          transition: "background 0.18s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
      >
        &#x2715;
      </button>
    </div>
  );
}
