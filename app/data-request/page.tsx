import type { Metadata } from "next";
import Link from "next/link";
import DataDeletionForm from "@/components/DataDeletionForm";

export const metadata: Metadata = {
  title: "Data Deletion Request",
  description:
    "Request deletion of your personal data from Insurance Untangled. Required by GDPR (Article 17) and CCPA (Section 1798.105).",
  alternates: { canonical: "https://www.insuranceuntangled.com/data-request/" },
  robots: { index: true, follow: true },
};

export default function DataDeletionPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Your Privacy</div>
          <h1 className="page-title">Request data deletion</h1>
          <p className="page-sub" style={{ maxWidth: "640px" }}>
            Under GDPR and CCPA you have the right to request that we delete your personal information.
            Submit the form below and we will action your request within 30 days.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginBottom: ".75rem", color: "var(--ink)" }}>
              What gets deleted?
            </h2>
            <ul style={{ paddingLeft: "1.5rem", fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.8 }}>
              <li>Your name and email address from our Google Sheets database</li>
              <li>Any form submissions (podcast gate, webinar gate, contact, scorecard, etc.)</li>
              <li>Your subscription status — you will be unsubscribed from all communications</li>
              <li>Any historical activity logs tied to your email address</li>
            </ul>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginBottom: ".75rem", color: "var(--ink)" }}>
              What we cannot delete
            </h2>
            <p style={{ fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.7 }}>
              Some records must be retained for legitimate business or legal reasons — e.g. records of
              completed transactions (if any), records subject to tax law, or content you posted publicly
              (e.g. a review with your name on it). We will tell you in our confirmation email if any of
              your data falls into these categories.
            </p>
          </div>

          <DataDeletionForm />

          <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "var(--paper-2)", borderRadius: "var(--r-lg)", border: "1px solid var(--paper-3)" }}>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".75rem" }}>
              Prefer to email us?
            </h3>
            <p style={{ fontSize: "13.5px", color: "var(--ink-3)", lineHeight: 1.65 }}>
              Send a request to{" "}
              <a href="mailto:support@insuranceuntangled.com?subject=Data%20Deletion%20Request" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                support@insuranceuntangled.com
              </a>{" "}
              with the subject line &ldquo;Data Deletion Request&rdquo; and the email address you want removed.
              See our <Link href="/privacy-policy/" style={{ color: "var(--steel)" }}>Privacy Policy</Link> for
              the full data rights statement.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
