"use client";

import { useEffect, useState } from "react";
import { fetchSheetClient } from "@/lib/sheets-client";
import PodcastEpisodeClient from "@/components/PodcastEpisodeClient";

/**
 * Client-side fallback for brand-new podcast episodes on a static host.
 *
 * The site is a static export: an episode's detail page only exists as a
 * physical HTML file after a build. When a new episode is added to the
 * Google Sheet, the grid shows its card instantly (client refetch), but the
 * card's link 404s until the next scheduled rebuild (GitHub cron, every 2h).
 *
 * This component runs inside the 404 page. If the missed URL looks like
 * /podcast/<slug>/, it fetches the sheet in the browser, looks the episode
 * up by number, and renders the full episode page in place of the 404 —
 * so new episodes are reachable the moment they're in the sheet.
 *
 * SEO note: GitHub Pages serves this with a real HTTP 404 + the page's
 * noindex meta, so crawlers never index this temporary render. The proper
 * static page (indexable, with JSON-LD) replaces it at the next rebuild.
 */

type SheetEpisode = {
  episode: string;
  title: string;
  guest_name: string;
  guest_photo_url: string;
  category: string;
  description: string;
  contact_info: string;
  poster_image: string;
  audio_source: string;
  transcript_url: string;
  date_iso: string;
};

type FallbackState = "checking" | "found" | "not-episode";

function podcastSlugFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/podcast\/([^/]+)\/?$/);
  if (!m) return null;
  const slug = m[1];
  // Slugs start with the episode number: "140-some-title"
  return /^\d+/.test(slug) ? slug : null;
}

function episodeNumber(value: string): string {
  return String(value || "").match(/\d+/)?.[0] || "";
}

export default function NotFoundEpisodeFallback({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FallbackState>("checking");
  const [episode, setEpisode] = useState<SheetEpisode | null>(null);
  const [episodes, setEpisodes] = useState<SheetEpisode[]>([]);
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const pathSlug = podcastSlugFromPath(window.location.pathname);
    if (!pathSlug) {
      setState("not-episode");
      return;
    }

    const targetNum = episodeNumber(pathSlug);
    fetchSheetClient("podcasts")
      .then((rows) => {
        const parsed = rows
          .filter((r) => r.episode && r.title)
          .sort((a, b) => (parseInt(b.episode) || 0) - (parseInt(a.episode) || 0)) as unknown as SheetEpisode[];
        const match = parsed.find((ep) => episodeNumber(ep.episode) === targetNum);
        if (match) {
          setEpisodes(parsed);
          setEpisode(match);
          setSlug(pathSlug);
          setState("found");
          // The static shell is the 404 page, so the tab reads "Page Not
          // Found" — overwrite it with the real episode title.
          document.title = `Ep ${match.episode}: ${match.title} | Insurance Untangled`;
        } else {
          setState("not-episode");
        }
      })
      .catch(() => setState("not-episode"));
  }, []);

  if (state === "found" && episode) {
    return (
      <PodcastEpisodeClient
        slug={slug}
        initialEpisode={episode}
        initialEpisodes={episodes}
      />
    );
  }

  if (state === "checking") {
    // Brief spinner while we check whether this 404 is actually a fresh
    // episode that just hasn't been built yet. Resolves in <1s typically.
    return (
      <div style={{ minHeight: "55vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--navy)" }}>
        <div style={{ textAlign: "center" }}>
          <div
            aria-hidden="true"
            style={{
              width: "34px",
              height: "34px",
              margin: "0 auto 1rem",
              border: "3px solid rgba(168,196,228,.25)",
              borderTopColor: "var(--teal)",
              borderRadius: "50%",
              animation: "nf-spin .8s linear infinite",
            }}
          />
          <style>{`@keyframes nf-spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(168,196,228,.7)" }}>
            Looking that up…
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
