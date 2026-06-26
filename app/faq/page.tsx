import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Dental Insurance FAQ | Insurance Untangled" },
  description:
    "Answers to the most common questions about Insurance Untangled, the podcast, PPO negotiation services, dental marketing, CE webinars, and the PPO Readiness Scorecard.",
  alternates: { canonical: "https://www.insuranceuntangled.com/faq/" },
  openGraph: {
    title: "FAQ | Insurance Untangled",
    description: "Common questions about our podcast, PPO negotiation, webinars, and services for dental practices.",
    url: "https://www.insuranceuntangled.com/faq/",
  },
};

interface FAQ {
  q: string;
  a: string;
}

interface FAQSection {
  title: string;
  items: FAQ[];
}

const SECTIONS: FAQSection[] = [
  {
    title: "Dental Insurance & PPO Basics",
    items: [
      {
        q: "How do I negotiate PPO fees with dental insurance companies?",
        a: "Start by pulling your full office fee schedule and your current reimbursement rates on your top 10 procedure codes for each PPO plan. Rank plans by profitability and patient volume, then contact each carrier's provider relations department with documented data showing how your fees compare to your region. Insurance companies default to \"no,\" so leverage, preparation, and a willingness to go out-of-network are what move the conversation. Most practices recover 15–30% more on their top plans when negotiations are handled correctly.",
      },
      {
        q: "Should I drop PPO plans from my dental practice?",
        a: "Not without data. First identify which plans are least profitable by comparing reimbursement rates against your office fees and the chair time each plan consumes. The least profitable 2–3 plans by patient volume are usually the first candidates to renegotiate or exit. Dropping a plan only makes sense once your marketing can replace those patients — so build your new-patient pipeline before reducing network participation.",
      },
      {
        q: "What is an umbrella network in dental insurance?",
        a: "An umbrella network (also called a leased or shared network) lets one insurance carrier lease your contracted fee schedule to other payers without a separate agreement. This means you can be in-network — and accepting lower fees — with plans you never knowingly signed up for. Reviewing your PPO contracts for umbrella network clauses is one of the fastest ways to find money you're leaving on the table.",
      },
      {
        q: "What is a dental fee schedule?",
        a: "A dental fee schedule is the list of maximum amounts an insurance plan will reimburse for each procedure code (CDT code). When you join a PPO, you agree to accept that plan's contracted fees as payment in full, writing off the difference between your standard office fee and the plan's allowed amount. Knowing your write-off percentage per plan is the foundation of any PPO strategy.",
      },
      {
        q: "How often can I renegotiate my dental PPO fees?",
        a: "Most carriers allow fee schedule reviews every 12–24 months, though many practices go 10+ years without ever asking. Some contracts now insert clauses locking in no-negotiation periods of up to three years while reserving the carrier's right to lower fees within twelve months — so reading the fine print before signing renewals is critical.",
      },
      {
        q: "What does going out-of-network mean for a dental practice?",
        a: "Going out-of-network means terminating your contract with a specific PPO plan so you are no longer bound by its discounted fee schedule. You can still treat patients with that insurance and submit claims on their behalf, but you collect your full fee and the patient is reimbursed at their plan's out-of-network rate. Practices with strong patient relationships and marketing typically see minimal attrition when they transition plans strategically.",
      },
    ],
  },
  {
    title: "About Insurance Untangled",
    items: [
      {
        q: "What is Insurance Untangled?",
        a: "Insurance Untangled is an educational platform for dental professionals founded in 2023 by Ben Tuinei (Veritas Dental Resources) and Naren Arulrajah (Ekwa Marketing). We help dentists understand, negotiate, and navigate dental PPO insurance through a free weekly podcast, live CE-eligible webinars, expert PPO fee negotiation services, and dental marketing services.",
      },
      {
        q: "Who is Insurance Untangled for?",
        a: "Independent dental practice owners, associate dentists planning to open their own practice, and practice managers who want to better understand insurance contracts, fee schedules, and how to grow a practice that is less dependent on PPO networks.",
      },
      {
        q: "Is everything really free?",
        a: "Yes. All 137+ podcast episodes, all 16+ webinar replays, the PPO Readiness Scorecard, the blog, and our resource library are free. We monetize through the PPO negotiation service (Veritas Dental Resources) and dental marketing service (Ekwa Marketing) — both of which are paid engagements you can opt into, never pushed.",
      },
    ],
  },
  {
    title: "The Podcast",
    items: [
      {
        q: "How many podcast episodes are there?",
        a: "137 episodes and growing. New episodes are released weekly. Topics include PPO contract negotiation, dental fee schedules, claim denials, umbrella networks, dental marketing, patient acquisition, and the business of dentistry.",
      },
      {
        q: "Where can I listen to the podcast?",
        a: "On Apple Podcasts, Spotify, YouTube, and directly on insuranceuntangled.com/podcast/. To listen on-site you'll need to drop your name and email once — that unlocks the entire archive.",
      },
      {
        q: "Why do I have to enter my email to listen on the website?",
        a: "It lets us keep the podcast genuinely free while building an audience we can email about new episodes and live events. You only enter your email once — after that, all episodes are accessible on the site and you can unsubscribe from any email at any time.",
      },
      {
        q: "Are full transcripts available?",
        a: "Yes — every episode page has a full text transcript alongside the audio player. Transcripts are searchable, accessible, and great for skimming or quoting.",
      },
    ],
  },
  {
    title: "PPO Negotiation",
    items: [
      {
        q: "How much more can I recover through PPO negotiation?",
        a: "Clients of Veritas Dental Resources recover an average of 15–30% more on their top PPO plans after negotiation. The exact improvement depends on your current fee schedule position relative to the market and the plans you are contracted with.",
      },
      {
        q: "How long does PPO fee negotiation take?",
        a: "Negotiating with insurance carriers typically takes 100+ hours for a practice to do alone — covering calls, follow-ups, tracking, and paperwork. Veritas Dental Resources handles every step on your behalf. Most negotiations complete within 60–90 days.",
      },
      {
        q: "Is there any risk if PPO negotiation doesn't improve my rates?",
        a: "No. The service is risk-free. If Veritas Dental Resources cannot improve your reimbursement rates, you pay nothing. You'll be told upfront whether your practice is a good candidate before any work begins.",
      },
      {
        q: "Who is Ben Tuinei?",
        a: "Ben Tuinei is the President of Veritas Dental Resources and one of the leading experts in dental PPO contract negotiation in North America. With 20 years specializing in PPO tactics, fee schedule strategy, and insurance contract reviews, he has helped dental practices nationwide recover over $3 billion in reimbursements.",
      },
    ],
  },
  {
    title: "Webinars & CE Credits",
    items: [
      {
        q: "Are the live webinars really CE-eligible?",
        a: "Yes. Every Insurance Untangled Live session qualifies for 1 Continuing Education credit through AGD-recognized providers. CE certificates are emailed to attendees who watch live.",
      },
      {
        q: "Can I get CE credit for watching replays?",
        a: "Live attendance is required for CE credit. Replays are free to watch anytime, but the certificate is only issued for live participation.",
      },
      {
        q: "How often are live webinars held?",
        a: "Once a month, typically in the evening to accommodate practice schedules. Upcoming dates are listed on the Events page with direct registration links.",
      },
    ],
  },
  {
    title: "PPO Readiness Scorecard",
    items: [
      {
        q: "What is the PPO Readiness Scorecard?",
        a: "A free 2-minute self-assessment for dental practices. Answer 10 yes/no questions across 6 dimensions of PPO readiness — financial awareness, insurance strategy, contract knowledge, and more. You'll receive a score and a personalized list of next steps.",
      },
      {
        q: "What do I do with my score?",
        a: "Low score? You'll get recommended podcast episodes and a path to a free PPO assessment. High score? You'll get advanced resources for optimizing further. Either way, no obligation.",
      },
    ],
  },
  {
    title: "Data & Privacy",
    items: [
      {
        q: "What do you do with my email address?",
        a: "We store it in Google Sheets to grant you access to gated content and to send occasional emails about new podcast episodes, webinars, and resources. We never sell or share your email with third parties. You can request deletion at any time.",
      },
      {
        q: "How do I unsubscribe?",
        a: "Every email we send contains an unsubscribe link. You can also email support@insuranceuntangled.com to request immediate removal from all lists.",
      },
      {
        q: "How do I request that you delete my data?",
        a: "Email support@insuranceuntangled.com with the subject line \"Data Deletion Request\" and the email address you used. We will remove your data from our systems within 30 days as required by GDPR and CCPA.",
      },
    ],
  },
];

export default function FAQPage() {
  // Flatten all Q&A for FAQPage JSON-LD schema
  const flatFAQs = SECTIONS.flatMap((s) => s.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: flatFAQs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://www.insuranceuntangled.com/faq/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Knowledge Base</div>
          <h1 className="page-title">Frequently Asked Questions</h1>
          <p className="page-sub" style={{ maxWidth: "640px" }}>
            Quick answers to common questions about the podcast, PPO negotiation, webinars, and how Insurance Untangled works.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          {SECTIONS.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "1rem",
                  paddingBottom: ".5rem",
                  borderBottom: "1px solid var(--paper-3)",
                }}
              >
                {section.title}
              </h2>
              <dl>
                {section.items.map(({ q, a }, i) => (
                  <details
                    key={i}
                    style={{
                      borderBottom: "1px solid var(--paper-3)",
                      padding: "1.1rem 0",
                    }}
                    open={sIdx === 0 && i === 0}
                  >
                    <summary
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--ink)",
                        cursor: "pointer",
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <span>{q}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </summary>
                    <p style={{ marginTop: ".75rem", fontSize: "14.5px", color: "var(--ink-3)", lineHeight: 1.75 }}>
                      {a}
                    </p>
                  </details>
                ))}
              </dl>
            </div>
          ))}

          {/* Still got questions? */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2rem",
              background: "var(--paper-2)",
              border: "1px solid var(--paper-3)",
              borderRadius: "var(--r-lg)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, marginBottom: ".75rem", color: "var(--ink)" }}>
              Still have questions?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--ink-3)", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
              Email us at <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)", textDecoration: "underline" }}>support@insuranceuntangled.com</a> or send a message via the contact form.
            </p>
            <Link href="/contact/" className="btn-primary">Contact Us →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
