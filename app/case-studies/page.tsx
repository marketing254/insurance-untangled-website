import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — Real Dental Practice Outcomes",
  description:
    "Real case studies from dental practices that worked with Veritas Dental Resources and Ekwa Marketing. PPO fee recoveries, patient acquisition growth, and umbrella network audits.",
  alternates: { canonical: "https://www.insuranceuntangled.com/case-studies/" },
  openGraph: {
    title: "Case Studies | Insurance Untangled",
    description: "Real outcomes from dental practices — PPO fee recoveries, patient acquisition wins, and practice growth stories.",
    url: "https://www.insuranceuntangled.com/case-studies/",
  },
};

interface CaseStudy {
  badge: string;
  badgeColor: "teal" | "gold" | "steel";
  title: string;
  practice: string;
  location: string;
  challenge: string;
  approach: string;
  result: string;
  stat: { value: string; label: string };
  service: "ppo-negotiation" | "dental-marketing";
}

const CASE_STUDIES: CaseStudy[] = [
  {
    badge: "PPO Negotiation",
    badgeColor: "teal",
    title: "Florida endodontist reclaims $750 per molar endo",
    practice: "Specialty endodontic practice",
    location: "Florida",
    challenge:
      "The practice was contracted at a $450 molar endo fee under one major PPO — well below the regional out-of-network range of $800 and significantly under what comparable in-network specialists were collecting.",
    approach:
      "Veritas Dental Resources audited every active contract, identified the fee schedule gap, and ran the renegotiation directly with the carrier. The team handled every call, follow-up, and documentation request over the 90-day negotiation cycle.",
    result:
      "Molar endo reimbursement increased from $450 to $1,200 — a $750 lift per procedure. Annual impact in the high six figures based on the practice's existing endodontic volume.",
    stat: { value: "$1,200", label: "new fee (was $450)" },
    service: "ppo-negotiation",
  },
  {
    badge: "PPO Strategy",
    badgeColor: "gold",
    title: "5-plan practice outperforms 100-plan practice",
    practice: "Two adjacent general practices, compared side by side",
    location: "Pacific Northwest",
    challenge:
      "One client practice was contracted with over 100 dental plans. A second, in the same market, had only 5 plan contracts. The 100-plan practice was working harder, seeing more patients, and collecting less.",
    approach:
      "Insurance Untangled and Veritas Dental Resources worked with the 100-plan practice on a structured plan-exit strategy — analyzing reimbursement rate vs. plan volume and prioritizing exits from the lowest-paying carriers first.",
    result:
      "After 18 months, the practice exited 40+ low-paying plans, focused capacity on higher-value patient relationships, and matched the 5-plan practice's profitability with significantly less administrative overhead.",
    stat: { value: "40+", label: "low-pay plans exited" },
    service: "ppo-negotiation",
  },
  {
    badge: "Write-Off Recovery",
    badgeColor: "teal",
    title: "Million-dollar practice recovers $546K in annual write-offs",
    practice: "General dentistry, multi-doctor",
    location: "Midwest United States",
    challenge:
      "The practice was producing $1.56M in dentistry annually but only collecting $1M. The $546,000 gap was driven by a combination of unfavorable PPO fee schedules, write-offs at point of service, and undetected umbrella network contracts.",
    approach:
      "Comprehensive audit of every PPO contract and umbrella network affiliation. Veritas identified three umbrella networks the practice was contracted with through carve-out clauses they had never reviewed. Renegotiation focused on the highest-impact plans first.",
    result:
      "Recovered an additional $180,000 in year-one collections by closing umbrella network loopholes and renegotiating the four highest-volume plans. Practice profitability up by 18%.",
    stat: { value: "$180K", label: "year-one recovery" },
    service: "ppo-negotiation",
  },
  {
    badge: "Dental Marketing",
    badgeColor: "steel",
    title: "From 30 unconverted calls to a full schedule of high-value patients",
    practice: "General practice marketing client",
    location: "Major metro area",
    challenge:
      "The practice was generating ~30 inquiry calls per month from existing marketing efforts but converting almost none of them into booked appointments. Front-office team was overwhelmed and the marketing felt unproductive.",
    approach:
      "Ekwa Marketing rebuilt the patient acquisition funnel from the ground up: SEO targeting higher-intent procedures, website redesign focused on conversion, and front-office call-handling training.",
    result:
      "Inquiry volume held steady but conversion rate jumped sharply — practice moved from struggling to fill the schedule to selectively booking the patient mix that fit the doctor's clinical interests and ideal case acceptance.",
    stat: { value: "200+", label: "practices served by Ekwa" },
    service: "dental-marketing",
  },
];

const badgeStyle = (color: CaseStudy["badgeColor"]) => {
  if (color === "teal") return { bg: "rgba(14,165,160,.12)", color: "var(--teal)" };
  if (color === "gold") return { bg: "var(--gold-pale)", color: "#8a6010" };
  return { bg: "var(--sky-pale)", color: "var(--steel)" };
};

export default function CaseStudiesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://www.insuranceuntangled.com/case-studies/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Real Results</div>
          <h1 className="page-title">Case studies — dental practices that untangled it.</h1>
          <p className="page-sub" style={{ maxWidth: "640px" }}>
            Specific outcomes from real practices that worked with Veritas Dental Resources and Ekwa Marketing.
            Dollar figures, plan counts, and timelines are practice-reported.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {CASE_STUDIES.map((cs, i) => {
              const badge = badgeStyle(cs.badgeColor);
              return (
                <article
                  key={i}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--paper-3)",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "1fr 220px",
                    gap: 0,
                  }}
                  className="cs-card"
                >
                  <div style={{ padding: "2rem 2.25rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--mono)",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        padding: ".3rem .7rem",
                        borderRadius: "20px",
                        background: badge.bg,
                        color: badge.color,
                        marginBottom: ".85rem",
                      }}
                    >
                      {cs.badge}
                    </span>
                    <h2
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "var(--ink)",
                        lineHeight: 1.2,
                        marginBottom: ".5rem",
                      }}
                    >
                      {cs.title}
                    </h2>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--ink-4)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                      {cs.practice} · {cs.location}
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", fontWeight: 600, marginBottom: ".35rem" }}>
                        The challenge
                      </div>
                      <p style={{ fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.7 }}>{cs.challenge}</p>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", fontWeight: 600, marginBottom: ".35rem" }}>
                        The approach
                      </div>
                      <p style={{ fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.7 }}>{cs.approach}</p>
                    </div>

                    <div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--teal)", fontWeight: 600, marginBottom: ".35rem" }}>
                        The result
                      </div>
                      <p style={{ fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.7 }}>{cs.result}</p>
                    </div>

                    <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid var(--paper-3)" }}>
                      <Link
                        href={cs.service === "ppo-negotiation" ? "/ppo-negotiation/" : "/msm/"}
                        style={{ fontFamily: "var(--mono)", fontSize: "12px", fontWeight: 600, color: "var(--steel)", textDecoration: "none", letterSpacing: ".04em" }}
                      >
                        {cs.service === "ppo-negotiation" ? "Learn about PPO Negotiation →" : "Learn about Dental Marketing →"}
                      </Link>
                    </div>
                  </div>

                  {/* Right rail — stat */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%)",
                      color: "#fff",
                      padding: "2rem 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "2.4rem",
                        fontWeight: 900,
                        color: "var(--gold-lt)",
                        lineHeight: 1,
                        marginBottom: ".5rem",
                      }}
                    >
                      {cs.stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: "10.5px",
                        letterSpacing: ".1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.65)",
                      }}
                    >
                      {cs.stat.label}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: "12px", color: "var(--ink-4)", marginTop: "2rem", textAlign: "center", lineHeight: 1.7 }}>
            <strong>Note:</strong> Case studies describe individual practice outcomes and are not guarantees of future performance.
            Results depend on practice-specific factors. See our{" "}
            <Link href="/terms/" style={{ color: "var(--steel)" }}>Terms of Service</Link> for full disclaimers.
          </p>

          {/* CTA */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2.5rem",
              background: "linear-gradient(135deg, #0d1a30 0%, #1b2a4a 50%, #243260 100%)",
              borderRadius: "var(--r-lg)",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <div style={{ fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-lt)", marginBottom: "1rem" }}>
              Ready to be the next case study?
            </div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.7rem", fontWeight: 800, marginBottom: ".75rem", color: "#fff", lineHeight: 1.2 }}>
              Start with a free PPO assessment
            </h3>
            <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,.7)", marginBottom: "1.75rem", maxWidth: "500px", margin: "0 auto 1.75rem" }}>
              No risk. If we cannot improve your rates, you pay nothing. Take the 2-minute scorecard first or book a call directly.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/ppo-scorecard/" className="btn-primary" style={{ background: "var(--gold-lt)", color: "var(--ink)" }}>
                Take the Scorecard →
              </Link>
              <Link href="/contact/" className="btn-outline-light">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
