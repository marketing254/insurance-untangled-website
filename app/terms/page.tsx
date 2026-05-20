import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Insurance Untangled — the rules governing your use of insuranceuntangled.com, our podcast, webinars, and related services.",
  alternates: { canonical: "https://www.insuranceuntangled.com/terms/" },
  // Legal boilerplate — don't index, but still follow internal links
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Legal</div>
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-sub">
            The rules that govern your use of insuranceuntangled.com and any services provided by Insurance Untangled.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.8, padding: "3rem 0" }}>
            <p style={{ marginBottom: "1rem", color: "var(--ink-3)", fontSize: "13px" }}>
              <strong>Last updated:</strong> May 8, 2026
            </p>

            <p style={{ marginBottom: "1.5rem" }}>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Insurance Untangled
              website at <Link href="/" style={{ color: "var(--steel)" }}>insuranceuntangled.com</Link>, the
              Insurance Untangled podcast, our webinars, the PPO Readiness Scorecard, and any related content or
              services we offer (collectively, the &ldquo;Services&rdquo;). By accessing or using the Services you
              agree to be bound by these Terms.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              1. Who we are
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Insurance Untangled is an educational platform for dental professionals founded by Ben Tuinei
              (Veritas Dental Resources) and Naren Arulrajah (Ekwa Marketing). Our address is 303 Pinetree Way,
              Mississauga, Ontario L5G 2R4, Canada. Contact:{" "}
              <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)" }}>support@insuranceuntangled.com</a>.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              2. Educational content — not professional advice
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              All content on the Services — including podcast episodes, blog posts, webinar replays, the PPO
              Readiness Scorecard, and any downloadable resources — is provided for general informational and
              educational purposes only. <strong>Nothing on the Services constitutes legal, financial, tax,
              accounting, medical, or professional advice.</strong> You should consult appropriate licensed
              professionals before making decisions about your practice, contracts, or business operations.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              3. Service results disclaimer
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Any results, statistics, testimonials, or case examples referenced on the Services — including
              reimbursement recovery amounts attributed to Veritas Dental Resources clients or marketing growth
              attributed to Ekwa Marketing clients — describe individual outcomes and are not guarantees of
              future performance. Results depend on practice-specific factors and cannot be predicted in advance.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              4. Account &amp; gated content
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Some content (podcast audio, webinar replays) requires you to submit your name and email address.
              You agree to provide accurate information. We use that information to grant access, send the
              occasional educational email, and maintain audience analytics. See our{" "}
              <Link href="/privacy-policy/" style={{ color: "var(--steel)" }}>Privacy Policy</Link> for details.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              5. Acceptable use
            </h2>
            <p style={{ marginBottom: ".75rem" }}>You agree not to:</p>
            <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: ".4rem" }}>Use the Services to violate any applicable law or regulation.</li>
              <li style={{ marginBottom: ".4rem" }}>Attempt to bypass any access controls, gate forms, or rate limits.</li>
              <li style={{ marginBottom: ".4rem" }}>Scrape, harvest, or otherwise extract content at scale without our written consent.</li>
              <li style={{ marginBottom: ".4rem" }}>Reverse engineer, decompile, or attempt to extract source code.</li>
              <li style={{ marginBottom: ".4rem" }}>Submit false information, spam, or automated form submissions.</li>
              <li style={{ marginBottom: ".4rem" }}>Use the Services to defame, harass, or harm another person or business.</li>
            </ul>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              6. Intellectual property
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              All content on the Services — including text, audio recordings, video, graphics, logos, podcast
              episode titles, and the Insurance Untangled brand name — is owned by Insurance Untangled or its
              licensors and is protected by copyright, trademark, and other intellectual property laws. You may
              link to our content and quote brief excerpts with attribution. You may not republish, redistribute,
              or commercially exploit our content without our written permission.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              7. Third-party services &amp; links
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              The Services link to or embed third-party platforms — Apple Podcasts, Spotify, YouTube, Vimeo,
              Zoom, YouCanBookMe, Google Forms, Veritas Dental Resources, and Ekwa Marketing. We are not
              responsible for the content, privacy practices, or availability of those third-party services.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              8. Disclaimer of warranties
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              The Services are provided &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; without warranties of
              any kind, either express or implied, including without limitation warranties of merchantability,
              fitness for a particular purpose, non-infringement, or course of performance. We do not warrant
              that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              9. Limitation of liability
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              To the maximum extent permitted by law, Insurance Untangled, its founders, officers, employees,
              and affiliates shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, data, or business opportunity, arising out of your
              use of or inability to use the Services. Our aggregate liability for any claim arising under these
              Terms shall not exceed CAD $100.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              10. Indemnification
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              You agree to indemnify and hold harmless Insurance Untangled and its affiliates from any claim,
              demand, loss, or expense (including reasonable legal fees) arising out of your breach of these
              Terms or your misuse of the Services.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              11. Termination
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We may suspend or terminate your access to the Services at any time, with or without notice, for
              any reason — including for breach of these Terms or suspected fraudulent or harmful activity.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              12. Governing law &amp; dispute resolution
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              These Terms are governed by the laws of the Province of Ontario, Canada, without regard to its
              conflict-of-laws principles. Any dispute arising from these Terms or the Services shall be
              resolved exclusively in the courts of Ontario, Canada, except where prohibited by local law.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              13. Changes to these Terms
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              We may update these Terms periodically. The &ldquo;Last updated&rdquo; date above reflects the most
              recent change. Continued use of the Services after a change constitutes acceptance of the revised
              Terms. Material changes affecting how we handle your personal data will be highlighted in our{" "}
              <Link href="/privacy-policy/" style={{ color: "var(--steel)" }}>Privacy Policy</Link>.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: ".75rem", color: "var(--ink)" }}>
              14. Contact us
            </h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Questions about these Terms? Email{" "}
              <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)" }}>support@insuranceuntangled.com</a>{" "}
              or use our <Link href="/contact/" style={{ color: "var(--steel)" }}>contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
