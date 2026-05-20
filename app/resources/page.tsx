import type { Metadata } from "next";
import Link from "next/link";
import ResourcesGrid from "@/components/ResourcesGrid";

export const metadata: Metadata = {
  title: { absolute: "Free Dental Insurance Resources — Guides & Tools | Insurance Untangled" },
  description:
    "Your dental insurance toolkit — episode guides, ebooks, templates, and tools. Every resource is free, built to save you time and make you money.",
  alternates: { canonical: "https://www.insuranceuntangled.com/resources/" },
  openGraph: {
    title: "Resources & Downloads | Insurance Untangled",
    description: "Episode guides, ebooks, negotiation tools, and templates — all free for dental practices.",
    url: "https://www.insuranceuntangled.com/resources/",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Resources &amp; Downloads</div>
          <h1 className="page-title">Your dental insurance toolkit &mdash; guides, ebooks, templates, and replays.</h1>
          <p className="page-sub">
            Every resource we create is built to save you time and make you money. Episode guides, webinar ebooks,
            negotiation tools &mdash; all free, all actionable.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container">
          <ResourcesGrid />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--paper-2)", padding: "3rem 0", borderTop: "1px solid var(--paper-3)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="sec-eyebrow">Can&rsquo;t find what you need?</div>
          <h2 className="sec-title">Talk to us &mdash; we&rsquo;ll point you in the right direction.</h2>
          <p className="sec-sub" style={{ maxWidth: "520px", margin: "0 auto 2rem" }}>
            Whether it&rsquo;s a specific episode, a negotiation question, or a marketing strategy &mdash; we&rsquo;re here to help.
          </p>
          <Link href="/contact/" className="btn-primary" style={{ fontSize: "15px", padding: ".9rem 2rem" }}>
            Book a free strategy call &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
