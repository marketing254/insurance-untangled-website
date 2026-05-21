import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Browse our podcast, events, or resources instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <div className="page-banner" style={{ minHeight: "55vh", display: "flex", alignItems: "center" }}>
        <div className="container page-banner-inner" style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "rgba(168,196,228,.7)",
              marginBottom: "1rem",
            }}
          >
            Error 404
          </div>
          <h1
            className="page-title"
            style={{ maxWidth: "720px", margin: "0 auto", fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            We can&rsquo;t find that page.
          </h1>
          <p className="page-sub" style={{ maxWidth: "560px", margin: "1rem auto 2rem" }}>
            The link may be broken or the page may have moved. Here are a few places you can head instead.
          </p>
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn-primary" style={{ padding: ".85rem 1.5rem", fontSize: "14px" }}>
              ← Back home
            </Link>
            <Link href="/podcast/" className="btn-outline-light" style={{ padding: ".85rem 1.5rem", fontSize: "14px" }}>
              Browse podcast
            </Link>
            <Link href="/events/" className="btn-outline-light" style={{ padding: ".85rem 1.5rem", fontSize: "14px" }}>
              Watch replays
            </Link>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "780px", textAlign: "center" }}>
          <div className="sec-eyebrow">Looking for something specific?</div>
          <h2 className="sec-title" style={{ marginBottom: "1.25rem" }}>
            Popular destinations
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: ".75rem",
              marginTop: "1.5rem",
            }}
          >
            {[
              { href: "/ppo-scorecard/", label: "PPO Readiness Scorecard" },
              { href: "/ppo-negotiation/", label: "PPO Negotiation Service" },
              { href: "/msm/", label: "Dental Marketing" },
              { href: "/case-studies/", label: "Case Studies" },
              { href: "/faq/", label: "FAQ" },
              { href: "/contact/", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  padding: ".95rem 1rem",
                  background: "var(--paper-2)",
                  border: "1px solid var(--paper-3)",
                  borderRadius: "var(--r)",
                  fontFamily: "var(--sans)",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  color: "var(--ink-2)",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "border-color .18s, background .18s",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
