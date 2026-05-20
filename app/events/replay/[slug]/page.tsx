import type { Metadata } from "next";
import Link from "next/link";
import { getWebinars, getUpcomingEvents, webinarSlug, driveImageUrl } from "@/lib/sheets";
import WebinarGate from "@/components/WebinarGate";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const webinars = await getWebinars();
  return webinars.map((w) => ({ slug: webinarSlug(w) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const webinars = await getWebinars();
  const webinar = webinars.find((w) => webinarSlug(w) === slug);

  if (!webinar) return { title: "Replay Not Found" };

  const description = webinar["description - Key notes"]
    ? webinar["description - Key notes"].replace(/\\n|\n/g, " ").slice(0, 160)
    : `Watch the replay of ${webinar.title}`;

  return {
    title: webinar.title,
    description,
    alternates: { canonical: `https://www.insuranceuntangled.com/events/replay/${slug}/` },
    openGraph: {
      title: webinar.title,
      description,
      type: "video.other",
      url: `https://www.insuranceuntangled.com/events/replay/${slug}/`,
    },
  };
}

// Extract Vimeo ID from a URL like https://vimeo.com/1149979907
function vimeoId(url: string): string {
  return url.match(/vimeo\.com\/(\d+)/)?.[1] || "";
}

// "2025-12-18" → "December 18, 2025"
function fmtDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function ReplayPage({ params }: Props) {
  const { slug } = await params;
  const [webinars, upcomingEvents] = await Promise.all([getWebinars(), getUpcomingEvents()]);

  // Sort webinars newest first
  const sorted = [...webinars].sort((a, b) =>
    (b.date_iso || "").localeCompare(a.date_iso || "")
  );

  const idx = sorted.findIndex((w) => webinarSlug(w) === slug);
  const webinar = idx !== -1 ? sorted[idx] : null;

  if (!webinar) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--steel)", marginBottom: "1rem" }}>404</div>
        <h1 className="page-title">Replay Not Found</h1>
        <Link href="/events/" className="btn-primary" style={{ marginTop: "1.5rem", display: "inline-block" }}>Browse All Replays →</Link>
      </div>
    );
  }

  const prevWebinar = idx > 0 ? sorted[idx - 1] : null;               // newer (higher index = older, so idx-1 is newer)
  const nextWebinar = idx < sorted.length - 1 ? sorted[idx + 1] : null; // older

  const notes = webinar["description - Key notes"]
    ? webinar["description - Key notes"].split(/\\n|\n/).filter((l: string) => l.trim())
    : [];

  const vid = vimeoId(webinar.webinar_url);
  const displayDate = fmtDate(webinar.date_iso) || webinar.month_year || "";

  // Next upcoming live event
  const today = new Date().toISOString().split("T")[0];
  const nextEvent = upcomingEvents.find((e) => e.date_iso >= today);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Events & Webinars", item: "https://www.insuranceuntangled.com/events/" },
      { "@type": "ListItem", position: 3, name: webinar.title, item: `https://www.insuranceuntangled.com/events/replay/${slug}/` },
    ],
  };

  // VideoObject — only emit if we have the minimum required props (uploadDate +
  // a real video thumbnail, not a logo fallback) for valid rich result eligibility.
  const validThumbnail = webinar.image_url ? driveImageUrl(webinar.image_url, 1200) : null;
  const videoSchema = (webinar.date_iso && validThumbnail) ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: webinar.title,
    description: notes.join(" ").slice(0, 500) || `Watch the replay of ${webinar.title}`,
    uploadDate: webinar.date_iso,
    // Use Vimeo player embed URL (not the watch-page URL) for valid embedUrl
    embedUrl: vid ? `https://player.vimeo.com/video/${vid}` : webinar.webinar_url,
    thumbnailUrl: validThumbnail,
    publisher: {
      "@type": "Organization",
      name: "Insurance Untangled",
      url: "https://www.insuranceuntangled.com",
    },
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {videoSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="r-hero">
        <div className="r-grain" />

        {/* Decorative circles */}
        <svg className="r-deco" style={{ top: "60px", right: "60px", color: "var(--gold-lt)" }} width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="6,4 6,20 20,12" />
        </svg>
        <svg className="r-deco" style={{ bottom: "40px", left: "80px", color: "var(--steel-lt)" }} width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="48" /><circle cx="50" cy="50" r="32" /><circle cx="50" cy="50" r="16" />
        </svg>

        <div className="container">
          {/* Breadcrumbs */}
          <div className="r-crumbs">
            <Link href="/">Home</Link>
            &nbsp;/&nbsp;
            <Link href="/events/">Events</Link>
            &nbsp;/&nbsp;
            Replay
          </div>

          {/* Eyebrow */}
          <div className="r-eyebrow">
            <span className="r-eyebrow-dot" />
            CE Webinar Replay
          </div>

          {/* Title */}
          <h1 className="r-title">{webinar.title}</h1>

          {/* Meta row */}
          <div className="r-meta">
            {displayDate && (
              <span className="r-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {displayDate}
              </span>
            )}
            <span className="r-meta-item">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15,8.5 22,9.3 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.3 9,8.5" />
              </svg>
              1 CE credit included
            </span>
            <span className="r-meta-item">Free to watch</span>
          </div>
        </div>
      </div>

      {/* ── BODY GRID ─────────────────────────────────────────── */}
      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="r-body-grid">

            {/* LEFT: Video + notes */}
            <div>
              <Link href="/events/" className="r-back-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                All replays
              </Link>

              {/* Gated video embed */}
              <WebinarGate title={webinar.title} vimeoUrl={webinar.webinar_url}>
                <></>
              </WebinarGate>

              {/* Key notes */}
              {notes.length > 0 && (
                <div className="r-desc" style={{ marginTop: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
                    Key Takeaways
                  </h3>
                  {notes.map((note: string, i: number) => (
                    <p key={i}>
                      {note.startsWith("* ") ? (
                        <>
                          <strong>{note.replace("* ", "").split(":")[0]}:</strong>
                          {note.replace("* ", "").includes(":")
                            ? note.replace("* ", "").slice(note.replace("* ", "").indexOf(":"))
                            : ""}
                        </>
                      ) : note}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <aside className="r-sidebar">

              {/* Platform links */}
              <div className="r-sidebar-label">Watch on your platform</div>
              <div className="r-platform-strip">
                <a className="r-platform-pill" href="https://www.youtube.com/@InsuranceUntangled" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12l-6 3.464z" />
                  </svg>
                  YouTube
                </a>
                {vid && (
                  <a className="r-platform-pill" href={`https://vimeo.com/${vid}`} target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1AB7EA">
                      <path d="M22.396 7.164c-.093 2.026-1.507 4.8-4.245 8.32C15.323 19.16 12.93 21 10.97 21c-1.214 0-2.24-1.12-3.08-3.36-.56-2.052-1.122-4.105-1.681-6.158-.624-2.24-1.292-3.36-2.005-3.36-.156 0-.701.328-1.635.98l-.978-1.26c1.027-.903 2.04-1.806 3.037-2.71C5.999 3.95 7.025 3.327 7.685 3.265c1.557-.156 2.516.91 2.876 3.196.388 2.466.658 4 .806 4.6.45 2.05.943 3.075 1.484 3.075.42 0 1.05-.664 1.89-1.992.84-1.328 1.29-2.34 1.351-3.038.12-1.151-.331-1.728-1.35-1.728-.482 0-.978.11-1.487.327.987-3.23 2.871-4.8 5.652-4.71 2.064.064 3.035 1.4 2.913 4.006z" />
                    </svg>
                    Vimeo
                  </a>
                )}
              </div>

              {/* Next live event */}
              <div className="r-sidebar-label" style={{ marginTop: "1.4rem" }}>Next live event</div>
              <div className="r-cta-block">
                {nextEvent ? (
                  <>
                    <div className="r-cta-label">{nextEvent.month_year} · {nextEvent.time}</div>
                    <h4>{nextEvent.title}</h4>
                    <p>Live panel · 1 CE credit · Free to attend</p>
                    {nextEvent.register_url && (
                      <a href={nextEvent.register_url} target="_blank" rel="noopener noreferrer">
                        Reserve Your Spot →
                      </a>
                    )}
                    {!nextEvent.register_url && (
                      <Link href="/events/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", background: "var(--gold-lt)", color: "var(--ink)", padding: ".6rem 1rem", borderRadius: "var(--r)", fontWeight: 700, textDecoration: "none", fontSize: "13px" }}>
                        View Events →
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <div className="r-cta-label">Coming soon</div>
                    <h4>Insurance Untangled Live</h4>
                    <p>Monthly live panels · CE credit · Free</p>
                    <Link href="/events/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", background: "var(--gold-lt)", color: "var(--ink)", padding: ".6rem 1rem", borderRadius: "var(--r)", fontWeight: 700, textDecoration: "none", fontSize: "13px" }}>
                      View Events →
                    </Link>
                  </>
                )}
              </div>

              {/* Prev / Next navigation */}
              {(prevWebinar || nextWebinar) && (
                <>
                  <div className="r-sidebar-label" style={{ marginTop: "1.4rem" }}>Browse replays</div>
                  <div className="r-nav-grid">
                    {prevWebinar ? (
                      <Link href={`/events/replay/${webinarSlug(prevWebinar)}/`} className="r-nav-btn">
                        <span className="r-nav-dir">← Newer</span>
                        <span className="r-nav-title">{prevWebinar.title}</span>
                      </Link>
                    ) : (
                      <span className="r-nav-btn disabled">
                        <span className="r-nav-dir">← Newer</span>
                        <span className="r-nav-title">—</span>
                      </span>
                    )}
                    {nextWebinar ? (
                      <Link href={`/events/replay/${webinarSlug(nextWebinar)}/`} className="r-nav-btn" style={{ textAlign: "right" }}>
                        <span className="r-nav-dir">Older →</span>
                        <span className="r-nav-title">{nextWebinar.title}</span>
                      </Link>
                    ) : (
                      <span className="r-nav-btn disabled" style={{ textAlign: "right" }}>
                        <span className="r-nav-dir">Older →</span>
                        <span className="r-nav-title">—</span>
                      </span>
                    )}
                  </div>
                </>
              )}

              {/* Back to all */}
              <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <Link href="/events/" style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--steel)", textDecoration: "none", fontWeight: 600 }}>
                  ← All Events &amp; Replays
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
