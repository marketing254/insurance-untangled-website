import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PPO Negotiation for Dental Practices",
  description:
    "Stop leaving money on the table with your PPO plans. Veritas Dental Resources handles every negotiation for you, recovering an average of 15-30% more on top PPO plans.",
  alternates: { canonical: "https://www.insuranceuntangled.com/ppo-negotiation/" },
};

export default function PPONegotiation() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Dental PPO Fee Negotiation",
            description: "Expert PPO contract negotiation for dental practices. Veritas Dental Resources handles every call, follow-up, and negotiation on your behalf — recovering an average of 15–30% more on top PPO plans.",
            url: "https://www.insuranceuntangled.com/ppo-negotiation/",
            provider: {
              "@type": "Organization",
              name: "Veritas Dental Resources",
              url: "https://veritasdentalresources.com",
              telephone: "+1-315-743-5373",
            },
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "Audience", audienceType: "Dental Practices" },
            // The initial assessment is free; the negotiation service itself is performance-based
            // (you pay only if rates improve). Pricing isn't a fixed amount, so emit AggregateOffer
            // semantics without a misleading `price: "0"` claim.
            offers: {
              "@type": "Offer",
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Performance-based — clients pay only if reimbursement rates improve. Initial assessment is free.",
              },
              availability: "https://schema.org/InStock",
              url: "https://veritasdentalresources.com/book-consultation",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How much more can I recover through PPO negotiation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Clients of Veritas Dental Resources recover an average of 15–30% more on their top PPO plans after negotiation.",
                },
              },
              {
                "@type": "Question",
                name: "How long does PPO fee negotiation take?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Negotiating with insurance carriers typically takes 100+ hours for a practice to do alone. Veritas Dental Resources handles every call, follow-up, and negotiation on your behalf so you can focus on patient care.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a risk if PPO negotiation doesn't improve my rates?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. If Veritas Dental Resources cannot improve your rates, you pay nothing. The service is risk-free.",
                },
              },
              {
                "@type": "Question",
                name: "What does PPO fee negotiation involve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The process starts with a free initial assessment of your current fee schedules. Then the team contacts insurance companies on your behalf, handles every negotiation, and reviews umbrella networks, leasing clauses, and contract carve-outs most practices never notice.",
                },
              },
            ],
          }),
        }}
      />
      {/* Full-width hero banner */}
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="ppo-hero-layout">

            {/* LEFT: Content */}
            <div className="ppo-hero-left">
              <div className="page-eyebrow">PPO Negotiation</div>
              <h1 className="page-title">Stop leaving money on the table with your PPO plans.</h1>
              <p className="page-sub">Most dentists don&rsquo;t know what their fee schedules should be &mdash; or how to push back. Veritas Dental Resources handles every negotiation for you, in a way that costs less than doing it yourself.</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
                <a href="https://veritasdentalresources.com/book-consultation" target="_blank" rel="noopener noreferrer" className="btn-primary">Schedule a Free Call &rarr;</a>
                <Link href="/about/" className="btn-outline-light">Meet Ben Tuinei</Link>
              </div>
              <div className="ppo-steps" style={{ marginTop: "2.5rem" }}>
                <div className="ppo-step"><div className="ppo-step-num">01</div><div><div className="ppo-step-title">We analyze your current fee schedules</div><div className="ppo-step-desc">Free initial assessment of where you stand versus what you could be earning.</div></div></div>
                <div className="ppo-step"><div className="ppo-step-num">02</div><div><div className="ppo-step-title">We contact insurance companies on your behalf</div><div className="ppo-step-desc">Every call, every follow-up, every rep conversation &mdash; handled by our experienced team.</div></div></div>
                <div className="ppo-step"><div className="ppo-step-num">03</div><div><div className="ppo-step-title">You keep doing what you love</div><div className="ppo-step-desc">We handle the paperwork. You focus on your patients. The recovered revenue arrives in your practice.</div></div></div>
              </div>
            </div>

            {/* RIGHT: Stats + image */}
            <div className="ppo-hero-right">
              <div className="ppo-stat-block">
                <div className="ppo-big-num">$3B<sup style={{ fontSize: "2rem" }}>+</sup></div>
                <div className="ppo-big-lbl">recovered in reimbursements for dental clients over 20 years</div>
                <div className="ppo-stat-source">Source: Veritas Dental Resources, 2006&ndash;2026</div>
              </div>
              <div className="ppo-hero-img-wrap">
                <img src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80" alt="Dentist reviewing PPO insurance contracts" className="ppo-hero-img" width={600} height={450} fetchPriority="high" />
              </div>
              <div className="ppo-stat-block">
                <div className="ppo-big-num" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>120<sup style={{ fontFamily: "var(--sans)", fontSize: "1.4rem", fontWeight: 600, verticalAlign: "super" }}>hrs</sup></div>
                <div className="ppo-big-lbl">average time a practice wastes chasing insurance reps annually &mdash; time we take off your plate</div>
              </div>
              <div className="ppo-guarantee">
                <div className="ppo-guarantee-label">Guarantee</div>
                <p className="ppo-guarantee-text">If you&rsquo;re not a good candidate for our service, you&rsquo;ll be the first to know &mdash; and it won&rsquo;t cost you a penny to find out.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Benefits section */}
      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">Why it works</div>
          <h2 className="sec-title reveal">How Does PPO Fee Negotiation Help Your Dental Practice?</h2>
          <div className="ppo-benefits-grid reveal">
            <div className="benefit-card reveal-d1"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div><div className="benefit-title">Better reimbursements</div><p className="benefit-desc">Our clients recover an average of 15&ndash;30% more on their top PPO plans after negotiation.</p></div>
            <div className="benefit-card reveal-d2"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg></div><div className="benefit-title">Saves 100+ hours</div><p className="benefit-desc">Negotiating with carriers takes 100+ hours most practices don&rsquo;t have. We do it for you.</p></div>
            <div className="benefit-card reveal-d3"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div><div className="benefit-title">Risk-free</div><p className="benefit-desc">If we don&rsquo;t improve your rates, you pay nothing.</p></div>
            <div className="benefit-card reveal-d4"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div><div className="benefit-title">20 years of expertise</div><p className="benefit-desc">Ben Tuinei has been negotiating dental PPOs for 20 years. He knows what to ask for &mdash; and how.</p></div>
            <div className="benefit-card reveal-d5"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div><div className="benefit-title">Full contract review</div><p className="benefit-desc">We audit umbrella networks, leasing clauses, and carve-outs that most practices never notice.</p></div>
            <div className="benefit-card"><div className="benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg></div><div className="benefit-title">Dedicated account team</div><p className="benefit-desc">A single point of contact who knows your practice and follows every negotiation through to completion.</p></div>
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://veritasdentalresources.com/book-consultation" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "15px", padding: ".9rem 2.5rem" }}>Schedule Your Free Call &rarr;</a>
            <Link href="/ppo-scorecard/" className="btn-outline" style={{ fontSize: "15px", padding: ".9rem 2rem" }}>Take the Free PPO Scorecard First</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section — visible HTML matching the FAQPage JSON-LD schema above */}
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--paper-3)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div className="sec-eyebrow">Common questions</div>
          <h2 className="sec-title">Frequently Asked Questions About PPO Negotiation</h2>
          <dl style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              {
                q: "How much more can I recover through PPO negotiation?",
                a: "Clients of Veritas Dental Resources recover an average of 15–30% more on their top PPO plans after negotiation. The exact improvement depends on your current fee schedule position relative to the market and the plans you are contracted with.",
              },
              {
                q: "How long does PPO fee negotiation take?",
                a: "Negotiating with insurance carriers typically takes 100+ hours for a practice to do alone — covering calls, follow-ups, tracking, and paperwork. Veritas Dental Resources handles every step on your behalf so you can stay focused on patient care. Most negotiations are completed within 60–90 days.",
              },
              {
                q: "Is there any risk if PPO negotiation doesn't improve my rates?",
                a: "No. The service is risk-free. If Veritas Dental Resources cannot improve your reimbursement rates, you pay nothing. You'll be told upfront whether your practice is a good candidate before any work begins.",
              },
              {
                q: "What does the PPO fee negotiation process involve?",
                a: "The process starts with a free initial assessment of your current fee schedules to identify where you stand versus what you could be earning. The team then contacts insurance companies directly, handles every negotiation call and follow-up, and reviews umbrella networks, leasing clauses, and contract carve-outs that most practices never notice. You receive clear reporting on every change secured.",
              },
            ].map(({ q, a }, i) => (
              <details key={i} style={{ borderBottom: "1px solid var(--paper-3)", padding: "1.25rem 0" }} open={i === 0}>
                <summary style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <span>{q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <p style={{ marginTop: ".85rem", fontSize: "15px", color: "var(--ink-3)", lineHeight: 1.75 }}>{a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
