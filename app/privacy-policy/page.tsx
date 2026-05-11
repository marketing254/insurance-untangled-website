import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Insurance Untangled. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://www.insuranceuntangled.com/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Legal</div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-sub">
            Your privacy matters to us. This policy describes how Insurance Untangled collects, uses, and protects your information.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: "780px" }}>
          <div style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "1rem", color: "var(--ink-3)", fontSize: "13px" }}>
              <strong>Last updated:</strong> May 7, 2026
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              1. Information we collect
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We collect information you voluntarily provide when you:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".5rem" }}>Sign up for our newsletter</li>
              <li style={{ marginBottom: ".5rem" }}>Submit a contact form or guest application</li>
              <li style={{ marginBottom: ".5rem" }}>Register for a webinar or event</li>
              <li style={{ marginBottom: ".5rem" }}>Use our PPO Scorecard or other tools</li>
            </ul>
            <p style={{ marginBottom: "1rem" }}>
              This may include your name, email address, practice name, website URL, phone number, and any additional information you choose to share in form submissions.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              We also automatically collect certain technical data when you visit our website, including your IP address, browser type, device information, pages visited, and referring URLs. This data is collected via cookies and analytics tools.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              2. How we use your information
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".5rem" }}>Send you our newsletter and relevant content about dental insurance and practice growth</li>
              <li style={{ marginBottom: ".5rem" }}>Respond to your inquiries and contact form submissions</li>
              <li style={{ marginBottom: ".5rem" }}>Register you for webinars and send event-related communications</li>
              <li style={{ marginBottom: ".5rem" }}>Improve our website, content, and services based on usage patterns</li>
              <li style={{ marginBottom: ".5rem" }}>Deliver relevant resources and offers</li>
            </ul>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              3. Third-party services
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We use the following third-party services to operate our website and communicate with you:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>ConvertKit</strong> &mdash; Email marketing platform used to manage newsletter subscriptions, send emails, and host signup forms. ConvertKit stores your email and name when you subscribe.{" "}
                <a href="https://convertkit.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--steel)", textDecoration: "underline" }}>ConvertKit Privacy Policy</a>
              </li>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>Zoom</strong> &mdash; Video conferencing platform used for webinars and podcast recordings. When you register for a webinar, Zoom may collect your name and email.{" "}
                <a href="https://explore.zoom.us/en/privacy/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--steel)", textDecoration: "underline" }}>Zoom Privacy Policy</a>
              </li>
              <li style={{ marginBottom: ".75rem" }}>
                <strong>Google Analytics</strong> &mdash; Web analytics service that tracks and reports website traffic. We use this to understand how visitors use our site and improve our content.{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "var(--steel)", textDecoration: "underline" }}>Google Privacy Policy</a>
              </li>
            </ul>
            <p style={{ marginBottom: "1rem" }}>
              We do not sell, trade, or rent your personal information to third parties. We only share data with the services listed above as necessary to provide our services to you.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              4. Cookies
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Our website uses cookies to enhance your experience, analyse traffic, and support our marketing efforts. We use essential cookies, analytics cookies (Google Analytics), and marketing cookies (ConvertKit).
            </p>
            <p style={{ marginBottom: "1rem" }}>
              For detailed information about the specific cookies we use and how to manage them, please see our{" "}
              <Link href="/cookies/" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                Cookie Policy
              </Link>.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              5. Data retention
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Specifically:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".5rem" }}>Newsletter subscriber data is retained until you unsubscribe</li>
              <li style={{ marginBottom: ".5rem" }}>Contact form submissions are retained for up to 2 years</li>
              <li style={{ marginBottom: ".5rem" }}>Webinar registration data is retained for up to 1 year after the event</li>
              <li style={{ marginBottom: ".5rem" }}>Analytics data is retained according to our Google Analytics settings (14 months)</li>
            </ul>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              6. Your rights
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".5rem" }}><strong>Access</strong> &mdash; Request a copy of the personal data we hold about you</li>
              <li style={{ marginBottom: ".5rem" }}><strong>Correction</strong> &mdash; Request correction of inaccurate or incomplete data</li>
              <li style={{ marginBottom: ".5rem" }}><strong>Deletion</strong> &mdash; Request deletion of your personal data</li>
              <li style={{ marginBottom: ".5rem" }}><strong>Opt-out</strong> &mdash; Unsubscribe from marketing emails at any time using the link in every email</li>
              <li style={{ marginBottom: ".5rem" }}><strong>Portability</strong> &mdash; Request your data in a portable format</li>
            </ul>
            <p style={{ marginBottom: "1rem" }}>
              To exercise any of these rights, please contact us at the email address below. We will respond to your request within 30 days.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              7. Data security
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We take reasonable measures to protect your personal information from unauthorised access, use, or disclosure. Our website uses HTTPS encryption, and we rely on reputable third-party providers who maintain their own security practices. However, no method of electronic transmission or storage is 100% secure.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              8. Changes to this policy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              9. Contact us
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                support@insuranceuntangled.com
              </a>
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <Link href="/contact/" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                insuranceuntangled.com/contact
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
