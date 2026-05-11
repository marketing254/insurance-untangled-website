import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thanks for getting in touch with Insurance Untangled. Here's what happens next and some resources to explore in the meantime.",
  alternates: { canonical: "https://www.insuranceuntangled.com/thank-you/" },
  // Don't index — this is a post-conversion page only reachable via redirects
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner" style={{ textAlign: "center" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-lt) 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              boxShadow: "0 12px 32px rgba(14,165,160,.32)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="page-eyebrow" style={{ justifyContent: "center" }}>
            All set
          </div>
          <h1 className="page-title">Thank you — we got it.</h1>
          <p className="page-sub" style={{ maxWidth: "640px", margin: "0 auto" }}>
            A team member will review your submission and get back to you within one business day. In the meantime,
            here are a few resources to dig into.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>

          {/* What happens next */}
          <div
            style={{
              background: "var(--paper-2)",
              border: "1px solid var(--paper-3)",
              borderRadius: "var(--r-lg)",
              padding: "2rem",
              marginBottom: "2.5rem",
            }}
          >
            <div className="sec-eyebrow">What happens next</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--ink)" }}>
              Here&rsquo;s the flow
            </h2>
            <ol style={{ paddingLeft: "1.5rem", fontSize: "15px", color: "var(--ink-2)", lineHeight: 1.75 }}>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>Confirmation email</strong> — Check your inbox (and spam folder) for a confirmation from{" "}
                <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)" }}>support@insuranceuntangled.com</a>.
              </li>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>A team member reviews your submission</strong> — Usually within a few hours during business
                hours, and always within one business day.
              </li>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>We follow up directly</strong> — by email, or for service inquiries by scheduled call. No
                automated nags, no funnels.
              </li>
            </ol>
          </div>

          {/* Resources to explore */}
          <div className="sec-eyebrow">While you wait</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "1.5rem", color: "var(--ink)" }}>
            Three things worth your time
          </h2>

          <div className="stay-updated-grid" style={{ marginBottom: "2.5rem" }}>
            <Link href="/podcast/" className="su-card">
              <div className="su-icon-wrap">
                <svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <div className="su-title">Latest podcast episode</div>
              <p className="su-desc">137+ free episodes on PPO strategy, fee negotiation, and dental practice growth.</p>
            </Link>
            <Link href="/ppo-scorecard/" className="su-card">
              <div className="su-icon-wrap">
                <svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <div className="su-title">PPO Readiness Scorecard</div>
              <p className="su-desc">2 minutes, 10 questions. See where your practice stands on insurance management.</p>
            </Link>
            <Link href="/events/" className="su-card">
              <div className="su-icon-wrap">
                <svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="su-title">CE Webinar Replays</div>
              <p className="su-desc">16+ on-demand CE-eligible sessions covering practice growth and PPO strategy.</p>
            </Link>
          </div>

          {/* Direct contact fallback */}
          <div
            style={{
              background: "var(--navy)",
              color: "#fff",
              borderRadius: "var(--r-lg)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--sky)", opacity: 0.7, marginBottom: ".65rem" }}>
              Need to reach us sooner?
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, marginBottom: ".75rem", color: "#fff" }}>
              We&apos;re a quick email away
            </h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,.65)", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              For urgent questions, email us directly. Our average response time is under 4 hours during business hours.
            </p>
            <a
              href="mailto:support@insuranceuntangled.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                background: "var(--teal)",
                color: "#fff",
                padding: ".85rem 1.75rem",
                borderRadius: "var(--r)",
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: "14.5px",
                textDecoration: "none",
              }}
            >
              support@insuranceuntangled.com →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
