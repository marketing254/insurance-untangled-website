import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Dental Insurance Glossary — PPO & Fee Negotiation Terms Explained" },
  description:
    "Plain-English definitions of dental insurance terms: PPO, fee schedules, UCR, write-offs, umbrella networks, credentialing, downgrades, LEAT clauses, and more.",
  alternates: { canonical: "https://www.insuranceuntangled.com/glossary/" },
  openGraph: {
    title: "Dental Insurance Glossary | Insurance Untangled",
    description: "Every dental insurance term dentists actually encounter — defined in plain English by PPO negotiation experts.",
    url: "https://www.insuranceuntangled.com/glossary/",
  },
};

// Each definition leads with a direct answer and stays in the 40–60 word
// range — the passage length AI answer engines extract most reliably.
const TERMS: { term: string; definition: string; related?: string }[] = [
  {
    term: "PPO (Preferred Provider Organization)",
    definition:
      "A PPO is a dental insurance plan where dentists contract to accept discounted fees in exchange for patient volume from the insurer's network. In-network dentists typically write off 25–45% of their standard fees. PPO plans dominate US dental benefits, covering roughly 80% of insured dental patients.",
  },
  {
    term: "Fee Schedule",
    definition:
      "A fee schedule is the list of maximum amounts a dental insurance plan will pay for each procedure code (CDT code). When a dentist joins a PPO network, they agree to accept these contracted fees as payment in full — writing off the difference from their standard office fees.",
  },
  {
    term: "Write-Off",
    definition:
      "A write-off is the difference between a dentist's standard office fee and the lower contracted PPO fee they agreed to accept. If an office fee is $200 and the PPO allows $130, the $70 difference is written off. Total annual write-offs commonly reach 6 figures per practice.",
  },
  {
    term: "Umbrella Network (Leased Network)",
    definition:
      "An umbrella network is an arrangement that lets one insurance carrier lease a dentist's contracted fee schedule to other payers without a separate agreement. Dentists can end up in-network — at discounted fees — with plans they never knowingly joined. Umbrella clauses hide in the fine print of many PPO contracts.",
  },
  {
    term: "UCR (Usual, Customary, and Reasonable)",
    definition:
      "UCR is the fee benchmark insurers use to calculate reimbursements for out-of-network claims, supposedly reflecting typical fees in a geographic area. Insurers set their own UCR figures, which often trail real market fees — a common reason out-of-network reimbursements come in lower than expected.",
  },
  {
    term: "PPO Fee Negotiation",
    definition:
      "PPO fee negotiation is the process of formally requesting higher reimbursement rates from an in-network insurance plan. It requires documented fee data, plan-by-plan profitability analysis, and leverage. Practices working with professional negotiators recover an average of 15–30% more on their top PPO plans (Veritas Dental Resources, 2006–2026).",
  },
  {
    term: "Credentialing",
    definition:
      "Credentialing is the insurer's verification process a dentist completes to join a network — covering licensure, education, malpractice history, and practice details. It typically takes 60–120 days per plan. New practice owners and associates must credential with each plan individually before claims pay in-network rates.",
  },
  {
    term: "Downgrade (Alternate Benefit Provision)",
    definition:
      "A downgrade happens when insurance pays for a cheaper alternative procedure than the one performed — most commonly reimbursing a posterior composite filling at the amalgam rate. The patient owes the difference. Downgrades are legal under the plan's alternate benefit provision but must be caught and billed correctly.",
  },
  {
    term: "LEAT Clause (Least Expensive Alternative Treatment)",
    definition:
      "A LEAT clause allows an insurer to base reimbursement on the least expensive treatment that would adequately address the condition, regardless of what the dentist and patient chose. It is the contractual mechanism behind downgrades — for example paying a bridge benefit toward an implant case.",
  },
  {
    term: "Claim Denial",
    definition:
      "A claim denial is an insurer's refusal to pay a submitted dental claim, citing reasons like missing documentation, frequency limitations, or 'not dentally necessary.' Many denials are recoverable: appeals with narratives, radiographs, and periodontal charting overturn a meaningful share of first-pass denials.",
  },
  {
    term: "Out-of-Network (OON)",
    definition:
      "Out-of-network means a dentist has no contract with a patient's insurance plan, so they are not bound by a discounted fee schedule. The practice collects its full fee; patients are reimbursed at their plan's out-of-network rate. Practices with strong patient relationships typically retain most patients after leaving a network.",
  },
  {
    term: "Fee-for-Service Dentistry",
    definition:
      "Fee-for-service dentistry is a practice model with no PPO contracts — patients pay the practice's actual fees directly, and any insurance reimbursement goes to the patient. It eliminates write-offs entirely but requires strong marketing and patient loyalty to sustain new-patient flow without network directories.",
  },
  {
    term: "In-House Membership Plan",
    definition:
      "An in-house membership plan is a subscription program a dental practice offers directly to patients without insurance — typically an annual fee covering cleanings, exams, and X-rays plus a discount on other treatment. It reduces dependence on PPO participation and keeps uninsured patients returning regularly.",
  },
  {
    term: "Assignment of Benefits",
    definition:
      "Assignment of benefits is the patient's authorization for the insurance company to pay the dental practice directly rather than reimbursing the patient. Some states and plans restrict assignment for out-of-network dentists, sending checks to patients instead — an operational factor when planning a network exit.",
  },
  {
    term: "EOB (Explanation of Benefits)",
    definition:
      "An EOB is the statement an insurer sends after processing a claim, showing the billed fee, allowed amount, plan payment, patient responsibility, and any denial or downgrade codes. Reading EOBs systematically is how practices detect underpayments, silent fee reductions, and umbrella network activity.",
  },
];

export default function GlossaryPage() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": "https://www.insuranceuntangled.com/glossary/#glossary",
    name: "Dental Insurance Glossary",
    description: "Plain-English definitions of dental insurance and PPO negotiation terms for dental professionals.",
    url: "https://www.insuranceuntangled.com/glossary/",
    hasDefinedTerm: TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      inDefinedTermSet: "https://www.insuranceuntangled.com/glossary/#glossary",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Glossary", item: "https://www.insuranceuntangled.com/glossary/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Glossary</div>
          <h1 className="page-title">Dental insurance terms, untangled.</h1>
          <p className="page-sub" style={{ maxWidth: "640px" }}>
            Every term dentists actually encounter in PPO contracts, EOBs, and negotiations &mdash; defined
            in plain English by the team behind {""}
            <Link href="/podcast/" style={{ color: "var(--sky)", textDecoration: "underline" }}>the Insurance Untangled podcast</Link>.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <dl style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {TERMS.map((t) => (
              <div
                key={t.term}
                id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                style={{
                  background: "#fff",
                  border: "1px solid var(--paper-3)",
                  borderRadius: "var(--r-lg)",
                  padding: "1.5rem 1.75rem",
                }}
              >
                <dt>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", marginBottom: ".5rem" }}>
                    {t.term}
                  </h2>
                </dt>
                <dd style={{ fontSize: "14.5px", color: "var(--ink-3)", lineHeight: 1.75, margin: 0 }}>
                  {t.definition}
                </dd>
              </div>
            ))}
          </dl>

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
              Ready to act on what these terms mean for your practice?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--ink-3)", marginBottom: "1.5rem", maxWidth: "520px", margin: "0 auto 1.5rem" }}>
              Take the free 2-minute PPO Readiness Scorecard, or listen to the podcast where these
              concepts are covered in depth every week.
            </p>
            <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/ppo-scorecard/" className="btn-primary">Take the Scorecard →</Link>
              <Link href="/podcast/" className="btn-outline">Browse the Podcast</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
