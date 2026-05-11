import type { Metadata } from "next";
import GuestForm from "@/components/GuestForm";

export const metadata: Metadata = {
  title: "Be a Guest on the Podcast",
  description:
    "Share your expertise with thousands of dental professionals. Apply to be a guest on Insurance Untangled — the podcast for dentists navigating PPOs and practice growth.",
  alternates: { canonical: "https://www.insuranceuntangled.com/be-a-guest/" },
};

export default function BeAGuestPage() {
  return (
    <div className="guest-hero">
      <div className="container">
        <div className="guest-hero-grid">
          {/* Left column */}
          <div>
            <div className="page-eyebrow" style={{ color: "#0EA5A0" }}>
              Insurance Untangled Podcast
            </div>
            <h1
              className="page-title"
              style={{
                color: "#fff",
                fontSize: "clamp(2rem,5vw,3.2rem)",
                lineHeight: 1.15,
              }}
            >
              Share Your Expertise.
              <br />
              Reach <span style={{ color: "#0EA5A0" }}>Thousands of Dentists.</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,.8)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginTop: "1rem",
                maxWidth: "520px",
              }}
            >
              We&rsquo;re looking for dental industry experts, practice owners, consultants, and
              innovators to join us on the Insurance Untangled Podcast &mdash; the go-to show for
              dentists serious about growing their practice.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              <div className="guest-stat-pill">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0EA5A0"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                30&ndash;45 Min Episodes
              </div>
              <div className="guest-stat-pill">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0EA5A0"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Global Reach
              </div>
              <div className="guest-stat-pill">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0EA5A0"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                Dental Professional Audience
              </div>
            </div>
          </div>

          {/* Right column: Form */}
          <GuestForm />
        </div>
      </div>
    </div>
  );
}
