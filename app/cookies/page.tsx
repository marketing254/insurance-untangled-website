import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how Insurance Untangled uses cookies to improve your browsing experience, analyze site traffic, and deliver relevant content.",
  alternates: { canonical: "https://www.insuranceuntangled.com/cookies/" },
};

export default function CookiesPage() {
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Legal</div>
          <h1 className="page-title">Cookie Policy</h1>
          <p className="page-sub">
            This policy explains how Insurance Untangled uses cookies and similar technologies.
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
              What are cookies?
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you interact with the site, and improve your overall experience.
            </p>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Essential Cookies
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              These cookies are necessary for the website to function properly. They enable core features such as page navigation, access to secure areas, and remembering your preferences (e.g., cookie consent choice). Without these cookies, the website cannot function correctly.
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--paper-3)" }}>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Cookie</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>cookie_consent</td>
                  <td style={{ padding: ".5rem .75rem" }}>Stores your cookie consent preference</td>
                  <td style={{ padding: ".5rem .75rem" }}>1 year</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>session_id</td>
                  <td style={{ padding: ".5rem .75rem" }}>Maintains your session while browsing</td>
                  <td style={{ padding: ".5rem .75rem" }}>Session</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Analytics Cookies
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We use Google Analytics to understand how visitors interact with our website. These cookies collect information about page views, traffic sources, and user behaviour in an aggregated and anonymous form. This helps us improve our content and user experience.
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--paper-3)" }}>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Cookie</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>_ga</td>
                  <td style={{ padding: ".5rem .75rem" }}>Distinguishes unique visitors</td>
                  <td style={{ padding: ".5rem .75rem" }}>2 years</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>_ga_*</td>
                  <td style={{ padding: ".5rem .75rem" }}>Maintains session state for Google Analytics 4</td>
                  <td style={{ padding: ".5rem .75rem" }}>2 years</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Marketing Cookies
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We use ConvertKit to manage our email newsletter and deliver relevant content to subscribers. When you sign up for our newsletter or interact with embedded forms, ConvertKit may place cookies to track form submissions and optimize our email marketing.
            </p>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--paper-3)" }}>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Cookie</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: ".5rem .75rem", fontWeight: 600 }}>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>ck_subscriber_id</td>
                  <td style={{ padding: ".5rem .75rem" }}>Identifies returning newsletter subscribers</td>
                  <td style={{ padding: ".5rem .75rem" }}>2 years</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--paper-3)" }}>
                  <td style={{ padding: ".5rem .75rem" }}>_ck_form_*</td>
                  <td style={{ padding: ".5rem .75rem" }}>Tracks form interactions and submissions</td>
                  <td style={{ padding: ".5rem .75rem" }}>30 days</td>
                </tr>
              </tbody>
            </table>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Managing your cookie preferences
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              You can control and delete cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect site functionality. Here are links to manage cookies in popular browsers:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: ".5rem" }}>Chrome: Settings &gt; Privacy and Security &gt; Cookies</li>
              <li style={{ marginBottom: ".5rem" }}>Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies</li>
              <li style={{ marginBottom: ".5rem" }}>Safari: Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li style={{ marginBottom: ".5rem" }}>Edge: Settings &gt; Cookies and Site Permissions</li>
            </ul>

            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: "2rem 0 1rem" }}>
              Contact us
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:support@insuranceuntangled.com" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                support@insuranceuntangled.com
              </a>.
            </p>
            <p>
              For more information about how we handle your personal data, please see our{" "}
              <Link href="/privacy-policy/" style={{ color: "var(--steel)", textDecoration: "underline" }}>
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
