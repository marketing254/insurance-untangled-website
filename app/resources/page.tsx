import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, guides, and resources to help dentists navigate dental insurance, negotiate PPO fees, and grow their practice with confidence.",
  alternates: { canonical: "https://www.insuranceuntangled.com/resources/" },
};

export default function ResourcesPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Tools &amp; Guides</div>
          <h1 className="page-title">Resources</h1>
          <p className="page-sub">
            Free tools and guides to help you navigate dental insurance with confidence.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {/* PPO Scorecard */}
            <div style={{ background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "42px", height: "42px", background: "var(--sky-pale)", borderRadius: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem" }}>
                PPO Readiness Scorecard
              </h3>
              <p style={{ fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.65, flex: 1, marginBottom: "1rem" }}>
                A 2-minute self-assessment that tells you exactly where your practice stands with PPO
                management &mdash; and what to focus on next.
              </p>
              <Link href="/ppo-scorecard/" className="btn-teal" style={{ alignSelf: "flex-start" }}>
                Take the Scorecard &rarr;
              </Link>
            </div>

            {/* Podcast */}
            <div style={{ background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "42px", height: "42px", background: "var(--sky-pale)", borderRadius: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem" }}>
                Weekly Podcast
              </h3>
              <p style={{ fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.65, flex: 1, marginBottom: "1rem" }}>
                Expert conversations on PPO strategy, dental marketing, fee negotiation, and building a
                practice with less insurance dependency.
              </p>
              <Link href="/podcast/" className="btn-outline" style={{ alignSelf: "flex-start" }}>
                Browse Episodes &rarr;
              </Link>
            </div>

            {/* Webinar Replays */}
            <div style={{ background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "2rem", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "42px", height: "42px", background: "var(--sky-pale)", borderRadius: "var(--r)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".9rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem" }}>
                CE Webinar Archive
              </h3>
              <p style={{ fontSize: "13px", color: "var(--ink-3)", lineHeight: 1.65, flex: 1, marginBottom: "1rem" }}>
                Watch any past live panel on your schedule. Each webinar comes with CE credit eligibility
                and expert Q&amp;A.
              </p>
              <Link href="/events/" className="btn-outline" style={{ alignSelf: "flex-start" }}>
                Watch Replays &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
