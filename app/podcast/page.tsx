import type { Metadata } from "next";
import Link from "next/link";
import { getPodcasts, podcastSlug } from "@/lib/sheets";
import PodcastGrid from "@/components/PodcastGrid";

export const metadata: Metadata = {
  // Override the global template — title is brand-led already, no need to append " | Insurance Untangled"
  title: { absolute: "Dental Insurance Podcast — PPO Strategy & Fee Negotiation" },
  description:
    "137+ expert conversations decoding PPO contracts, fee negotiations, claim strategy, and the business realities of modern dentistry. New episodes weekly.",
  alternates: { canonical: "https://www.insuranceuntangled.com/podcast/" },
  openGraph: {
    title: "Dental Insurance Podcast — PPO Strategy & Fee Negotiation",
    description: "Expert conversations decoding dental insurance — PPO strategy, fee negotiation, and marketing for dentists.",
    url: "https://www.insuranceuntangled.com/podcast/",
  },
};

export default async function PodcastPage() {
  const episodes = await getPodcasts();

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Insurance Untangled Podcast Episodes",
    description: "Expert conversations decoding dental insurance — PPO strategy, fee negotiation, and marketing for dentists.",
    url: "https://www.insuranceuntangled.com/podcast/",
    numberOfItems: episodes.length,
    itemListElement: episodes.slice(0, 50).map((ep, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Ep ${ep.episode}: ${ep.title}`,
      url: `https://www.insuranceuntangled.com/podcast/${podcastSlug(ep)}/`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Podcast", item: "https://www.insuranceuntangled.com/podcast/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="podcast-hero-grid">
            <div>
              <div className="page-eyebrow">The podcast</div>
              <h1 className="page-title">Untangling dental insurance, one episode at a time.</h1>
              <p className="page-sub">
                {episodes.length}+ expert conversations decoding PPO contracts, fee negotiations, claim strategy, and
                the business realities of modern dentistry. New episodes every week, free forever.
              </p>
              <div className="platform-strip">
                <a
                  href="https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-pill-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                  </svg>
                  Apple Podcasts
                </a>
                <a
                  href="https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-pill-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.224-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.78.78 0 0 1 .519-.972c3.632-1.102 8.147-.568 11.234 1.328a.78.78 0 0 1 .257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.618-1.156a.935.935 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 0 1-.954 1.608z" />
                  </svg>
                  Spotify
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PLYzuqhbyVkuApRBUvkXkr5Dalm_F6BYUf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-pill-lg"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
            {episodes.length > 0 && (
              <div className="featured-ep-card">
                <div className="fep-label">Latest episode</div>
                <div className="fep-num">Episode {episodes[0].episode}</div>
                <div className="fep-title">{episodes[0].title}</div>
                <Link href={`/podcast/${podcastSlug(episodes[0])}/`} className="fep-play">
                  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Listen now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div className="sec-eyebrow">All episodes</div>
              <h2 className="sec-title" style={{ marginBottom: 0 }}>
                {episodes.length} episodes &amp; counting.
              </h2>
            </div>
          </div>

          {/* Filter tabs are now inside PodcastGrid component */}

          {/* Scorecard CTA */}
          <div
            className="scorecard-cta-grid"
            style={{
              background: "linear-gradient(135deg,#0d1a30 0%,#1b2a4a 50%,#3d65a8 100%)",
              borderRadius: "16px",
              padding: "2.25rem 2.5rem",
              margin: "2rem 0 2.5rem",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.75rem",
              alignItems: "center",
              boxShadow: "0 12px 40px rgba(11,37,69,.18)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".5rem",
                  background: "rgba(168,196,228,.15)",
                  color: "#a8c4e4",
                  padding: ".4rem .85rem",
                  borderRadius: "20px",
                  fontFamily: "var(--mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: ".12em",
                  textTransform: "uppercase" as const,
                  marginBottom: ".85rem",
                }}
              >
                Free &middot; 2 minutes
              </div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.85rem",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.15,
                  margin: "0 0 .65rem",
                }}
              >
                Not sure where to start?
              </h3>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,.85)", lineHeight: 1.55, margin: 0, maxWidth: "560px" }}>
                Take our free 2-minute <strong style={{ color: "#fff" }}>PPO Readiness Scorecard</strong> and get a
                personalised episode playlist tailored to your practice&rsquo;s situation.
              </p>
            </div>
            <Link
              href="/ppo-scorecard/"
              style={{
                background: "#fff",
                color: "#0d1a30",
                border: "none",
                borderRadius: "10px",
                padding: "1rem 1.85rem",
                fontFamily: "var(--sans)",
                fontSize: "14.5px",
                fontWeight: 700,
                whiteSpace: "nowrap" as const,
                display: "inline-flex",
                alignItems: "center",
                gap: ".55rem",
                boxShadow: "0 4px 16px rgba(0,0,0,.18)",
                textDecoration: "none",
                position: "relative",
                zIndex: 1,
              }}
            >
              Take the Scorecard <span style={{ fontSize: "18px" }}>&rarr;</span>
            </Link>
          </div>

          {/* Episode Grid - client-side fetch for instant updates */}
          <PodcastGrid initialEpisodes={episodes.map(ep => ({ episode: ep.episode, title: ep.title, category: ep.category, poster_image: ep.poster_image, audio_source: ep.audio_source }))} />

          {/* Platform CTAs */}
          <div style={{ marginTop: "2.5rem", padding: "1.75rem", background: "var(--paper)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--steel)", marginBottom: ".5rem" }}>
              Want all {episodes.length} episodes?
            </div>
            <p style={{ fontSize: "14px", color: "var(--ink-2)", marginBottom: "1rem" }}>
              Listen on Apple Podcasts, Spotify, or any podcast app &mdash; every episode is free.
            </p>
            <div style={{ display: "inline-flex", gap: ".6rem", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href="https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "#000", color: "#fff", padding: ".65rem 1.1rem", borderRadius: "var(--r)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
              >
                Apple Podcasts
              </a>
              <a
                href="https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "#1DB954", color: "#fff", padding: ".65rem 1.1rem", borderRadius: "var(--r)", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
              >
                Spotify
              </a>
            </div>
          </div>
          {/* Related content links */}
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/blog/" className="btn-outline" style={{ fontSize: "13.5px" }}>Read the Blog &rarr;</Link>
            <Link href="/events/" className="btn-outline" style={{ fontSize: "13.5px" }}>Watch Webinar Replays &rarr;</Link>
            <Link href="/ppo-scorecard/" className="btn-outline" style={{ fontSize: "13.5px" }}>Take the PPO Scorecard &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
