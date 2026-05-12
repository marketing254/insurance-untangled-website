import type { Metadata } from "next";
import YCBMScheduler from "@/components/YCBMScheduler";

export const metadata: Metadata = {
  title: "Dental Marketing by Ekwa Marketing",
  description:
    "Attract patients who choose you - not just whoever takes their insurance. Ekwa Marketing helps dental practices rank higher, convert more visitors, and grow.",
  alternates: { canonical: "https://www.insuranceuntangled.com/dental-marketing/" },
};

export default function DentalMarketing() {
  return (
    <>
      {/* ── HERO with scheduler embedded on the right ───────────────────────── */}
      <div className="page-banner mkt-hero">
        <div className="container">
          <div className="mkt-hero-grid">

            {/* LEFT: messaging */}
            <div className="mkt-hero-left">
              <div className="page-eyebrow">Dental Marketing by Ekwa</div>
              <h1 className="page-title" style={{ maxWidth: "560px" }}>
                Attract patients who choose you &mdash; not just whoever takes their insurance.
              </h1>
              <p className="page-sub" style={{ maxWidth: "520px" }}>
                Ekwa Marketing helps dental practices rank higher, convert more website visitors, and bring in the
                kind of patients who stay for years &mdash; not just whoever is in-network.
              </p>

              {/* Trust strip */}
              <div className="mkt-hero-trust">
                <div className="mkt-hero-trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>200+ dental practices served</span>
                </div>
                <div className="mkt-hero-trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>15 min strategy call, no obligation</span>
                </div>
                <div className="mkt-hero-trust-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>A strategist reviews your practice before the call</span>
                </div>
              </div>

              {/* Mobile: jump to scheduler */}
              <div className="mkt-hero-mobile-cta">
                <a href="#book" className="cqb-btn" style={{ display: "inline-block", textDecoration: "none" }}>
                  Book a Free Strategy Meeting &rarr;
                </a>
                <div className="cqb-sub" style={{ marginTop: ".5rem" }}>15 min &bull; Free &bull; No obligation</div>
              </div>
            </div>

            {/* RIGHT: YCBM scheduler card */}
            <div className="mkt-hero-right" id="book">
              <div className="scheduler-panel">
                <div className="scheduler-panel-header">
                  <div className="booking-panel-eyebrow">Free &bull; No obligation</div>
                  <div className="booking-panel-title">Book a Marketing Strategy Meeting</div>
                  <div className="booking-panel-sub">Pick a date and time that works for you.</div>
                </div>
                <YCBMScheduler height={640} title="Book a Marketing Strategy Meeting" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── REVIEWS ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "1080px" }}>
          <div className="sec-eyebrow">What dentists say</div>
          <h2 className="sec-title">Trusted by 200+ dental practices</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
              marginTop: "2rem",
            }}
          >
            <div className="review-card-light">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;After working with several marketing companies, we moved forward with Ekwa. I have a high
                standard for what I want, and I appreciate their precision and punctuality. The results were exactly
                what I wanted. We&rsquo;ve given them the second office to work on. I highly recommend them.&rdquo;
              </p>
              <div className="review-attr">&mdash; Reina Acosta</div>
            </div>
            <div className="review-card-light">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;My office has been using EKWA for 10 plus years and had great results as well as great customer
                service. They truly go above and beyond to make sure your office will succeed. We appreciate them so
                much and look forward to continue to grow with them.&rdquo;
              </p>
              <div className="review-attr">&mdash; Brittney Price</div>
            </div>
            <div className="review-card-light">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;Recently partnered with Ekwa after a couple years of learning through their very informative
                podcasts and webinars. Looking forward to experiencing growth with their team helping with SEO.
                Special thanks to Lana, Nithin and team for getting our new website up and running.&rdquo;
              </p>
              <div className="review-attr">&mdash; Arthur Vasquez, o41 Skin Lab</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ──────────────────────────────────────────────────── */}
      <section style={{ background: "var(--paper-2)", padding: "3rem 0", borderTop: "1px solid var(--paper-3)" }}>
        <div className="container" style={{ maxWidth: "1080px" }}>
          <div className="sec-eyebrow reveal">What Ekwa does</div>
          <h2 className="sec-title">Done-for-you digital marketing for dental practices.</h2>
          <p className="sec-sub" style={{ marginBottom: "2rem", maxWidth: "640px" }}>
            A dedicated strategist reviews your practice before every call &mdash; identifying what&rsquo;s working,
            what&rsquo;s not, and your biggest growth opportunities. You get a personalised plan, not a pitch.
          </p>
          <div className="marketing-features-grid">
            <div className="mf-card reveal-d1">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              </div>
              <div className="mf-title">Local SEO &amp; Google Rankings</div>
              <p className="mf-desc">Rank in the local top 5% on Google for the procedures and patient types you want most.</p>
            </div>
            <div className="mf-card reveal-d2">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
              <div className="mf-title">Website Conversion Optimisation</div>
              <p className="mf-desc">Turn visitors into booked appointments through design, copy, and UX improvements.</p>
            </div>
            <div className="mf-card reveal-d3">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              </div>
              <div className="mf-title">New Patient Acquisition</div>
              <p className="mf-desc">Attract patients who choose you for the quality of your care &mdash; not just your insurance network.</p>
            </div>
            <div className="mf-card reveal-d4">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <div className="mf-title">Monthly Strategy Reviews</div>
              <p className="mf-desc">Dedicated account manager, detailed reporting, and regular strategy adjustments based on your data.</p>
            </div>
            <div className="mf-card reveal-d5">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div className="mf-title">Reputation Management</div>
              <p className="mf-desc">Build and manage your online reviews to attract the right patients and outrank competitors.</p>
            </div>
            <div className="mf-card">
              <div className="mf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              </div>
              <div className="mf-title">Content &amp; Social Media</div>
              <p className="mf-desc">Educational content that positions your practice as the trusted authority in your market.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
