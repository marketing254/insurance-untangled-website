import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Ben Tuinei & Naren Arulrajah",
  description:
    "Built by two people who know exactly how insurance works. Insurance Untangled was founded in 2023 to give dentists what they were never taught in school.",
  alternates: { canonical: "https://www.insuranceuntangled.com/about/" },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                name: "Benjamin Tuinei",
                alternateName: "Ben Tuinei",
                jobTitle: "President, Veritas Dental Resources",
                description: "Benjamin Tuinei is the President of Veritas Dental Resources and one of the leading experts in dental PPO contract negotiation in North America. With 20 years specializing in PPO tactics, fee schedule strategy, and insurance contract reviews, he has helped dental practices nationwide recover over $3 billion in reimbursements. Ben is a sought-after speaker at dental study clubs and conventions, known for his practical, results-driven approach grounded in deep knowledge of how insurance companies operate.",
                url: "https://veritasdentalresources.com/about",
                image: "https://www.insuranceuntangled.com/images/ben-founder.jpg",
                worksFor: { "@type": "Organization", name: "Veritas Dental Resources", url: "https://veritasdentalresources.com" },
                knowsAbout: ["dental PPO negotiation", "dental fee schedules", "insurance contract review", "umbrella network strategy", "dental reimbursement recovery"],
                sameAs: ["https://veritasdentalresources.com/about"],
              },
              {
                "@type": "Person",
                name: "Naren Arulrajah",
                jobTitle: "CEO & Founder, Ekwa Marketing",
                description: "Naren Arulrajah is the CEO and Founder of Ekwa Marketing and co-founder of Insurance Untangled. He has spent 15+ years helping dental practices grow through digital marketing, serving over 200 practices. His expertise spans dental patient acquisition, SEO, and practice growth strategy for independent dental professionals.",
                url: "https://www.ekwa.com/",
                image: "https://www.insuranceuntangled.com/images/naren-founder.jpg",
                worksFor: { "@type": "Organization", name: "Ekwa Marketing", url: "https://www.ekwa.com" },
                knowsAbout: ["dental marketing", "dental SEO", "patient acquisition", "dental practice growth", "digital marketing for dentists"],
                sameAs: ["https://www.ekwa.com/", "https://www.linkedin.com/in/narenarulrajah/"],
              },
            ],
          }),
        }}
      />
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">About Insurance Untangled</div>
          <h1 className="page-title">Built by two people who know exactly how insurance works &mdash; and why it&apos;s so hard to navigate.</h1>
          <p className="page-sub">Insurance Untangled was founded in 2023 to give dentists what they were never taught in school: how to read, negotiate, and work confidently within the insurance system.</p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">The founders</div>
          <h2 className="sec-title">Who Are the Founders of Insurance Untangled?</h2>
          <div className="about-founders">
            <div className="founder-bio-card reveal-scale">
              <div className="founder-bio-banner"></div>
              <div className="founder-bio-body">
                <img src="/images/naren-founder.jpg" alt="Naren Arulrajah" className="founder-avatar-lg" style={{ objectFit: "cover", objectPosition: "center top" }} loading="lazy" />
                <div className="founder-name-lg" style={{ marginTop: ".85rem" }}>Naren Arulrajah</div>
                <div className="founder-role-lg">CEO &amp; Founder, Ekwa Marketing</div>
                <div className="founder-stats-row">
                  <div><div className="founder-stat-val">200+</div><div className="founder-stat-lbl">Practices served</div></div>
                  <div><div className="founder-stat-val">15+</div><div className="founder-stat-lbl">Years in practice marketing</div></div>
                </div>
                <p className="founder-bio-text">Naren Arulrajah is a self-described &ldquo;serial entrepreneur&rdquo; who has spent his career empowering independent professionals &mdash; dentists, doctors, lawyers, and consultants &mdash; to achieve real practice success through smarter digital marketing. As the visionary founder and CEO of Ekwa Marketing, he leads a global team of experts serving over 200 clients at every stage of practice growth.</p>
                <div className="founder-quote">&ldquo;I consider myself an Imagineer on a mission to deliver out-of-the-box digital marketing solutions for doctors, which others are not even contemplating.&rdquo;</div>
                <Link href="/dental-marketing" className="btn-outline">About Ekwa Marketing &rarr;</Link>
              </div>
            </div>
            <div className="founder-bio-card reveal-scale">
              <div className="founder-bio-banner"></div>
              <div className="founder-bio-body">
                <img src="/images/ben-founder.jpg" alt="Ben Tuinei" className="founder-avatar-lg" style={{ objectFit: "cover", objectPosition: "center top" }} loading="lazy" />
                <div className="founder-name-lg" style={{ marginTop: ".85rem" }}>Ben Tuinei</div>
                <div className="founder-role-lg">President, Veritas Dental Resources</div>
                <div className="founder-stats-row">
                  <div><div className="founder-stat-val">$3B+</div><div className="founder-stat-lbl">Recovered for clients</div></div>
                  <div><div className="founder-stat-val">20yr</div><div className="founder-stat-lbl">PPO negotiation experience</div></div>
                </div>
                <p className="founder-bio-text">Benjamin Tuinei is the visionary behind Veritas Dental Resources and one of the most respected voices in dental insurance strategy. With 20 years specializing in PPO tactics and fee negotiations, he has helped dentists nationwide recover over $3 billion in reimbursements.</p>
                <p className="founder-bio-text" style={{ marginTop: ".75rem" }}>Ben is a sought-after speaker at study clubs and dental conventions, and holds key positions across multiple dental organizations. His approach is practical, results-driven, and grounded in deep knowledge of how insurance companies think.</p>
                <a href="https://veritasdentalresources.com/about" target="_blank" rel="noopener noreferrer" className="btn-outline">About Veritas Dental &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mission-band">
        <div className="container">
          <div className="mission-inner reveal">
            <div className="sec-eyebrow reveal">Our mission</div>
            <h2 className="sec-title">Untangling dental insurance for every practice.</h2>
            <p style={{ fontSize: "15.5px", color: "rgba(255,255,255,.68)", lineHeight: 1.8, margin: "1rem 0 2.5rem" }}>Insurance Untangled exists because dental insurance is genuinely complicated &mdash; and nobody teaches dentists how to navigate it. From understanding your fee schedules to negotiating with carriers to knowing when a claim denial is worth fighting, the system is designed to be opaque. We cut through that. Every week, for free.</p>
            <Link href="/podcast" className="btn-primary">Start with the podcast &rarr;</Link>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--paper-3)" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">The team</div>
          <h2 className="sec-title reveal">The team behind Insurance Untangled.</h2>

          <div className="team-grid reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginTop: "2rem" }}>

            <div className="team-card">
              <div className="team-card-header" style={{ background: "linear-gradient(135deg,#1B2A4A,#3D65A8)" }}>
                <div className="team-avatar-wrap">
                  <img src="/images/Lester.png" alt="Lester De Alwis" className="team-avatar" loading="lazy" />
                </div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Lester De Alwis</div>
                <div className="team-role">Partnerships &amp; Host</div>
                <p className="team-bio">Lester manages partnerships across the Insurance Untangled brand and co-hosts episodes and live events, connecting dental professionals with the right people and resources.</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-card-header" style={{ background: "linear-gradient(135deg,#1B2A4A,#2E4A8A)" }}>
                <div className="team-avatar-wrap">
                  <img src="/images/don-team.jpg" alt="Don Adeesha Achalanka" className="team-avatar" loading="lazy" />
                </div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Don Adeesha Achalanka</div>
                <div className="team-role">Webinar &amp; Podcast Host</div>
                <p className="team-bio">Don hosts the webinars and podcast episodes, guiding conversations with guests and making complex insurance topics accessible for every dentist tuning in.</p>
              </div>
            </div>

            <div className="team-card">
              <div className="team-card-header" style={{ background: "linear-gradient(135deg,#1B2A4A,#1B4965)" }}>
                <div className="team-avatar-wrap">
                  <img src="/images/dulaj-team.jpg" alt="Dulaj Perera" className="team-avatar" loading="lazy" />
                </div>
              </div>
              <div className="team-card-body">
                <div className="team-name">Dulaj Perera</div>
                <div className="team-role">Event &amp; Podcast Coordination</div>
                <p className="team-bio">Dulaj coordinates podcast production, event logistics, and the content backlog &mdash; keeping episodes on schedule and webinars running without a hitch.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">Stay updated</div>
          <h2 className="sec-title">Keep learning for free.</h2>
          <p className="sec-sub">Three ways to stay ahead of insurance changes and grow your practice knowledge at no cost.</p>
          <div className="stay-updated-grid">
            <Link href="/podcast" className="su-card">
              <div className="su-icon-wrap"><svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg></div>
              <div className="su-title">Listen to the Podcast</div>
              <p className="su-desc">Weekly episodes on dental insurance strategy, PPO negotiation, and practice growth.</p>
            </Link>
            <Link href="/events/" className="su-card">
              <div className="su-icon-wrap"><svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div>
              <div className="su-title">Watch the Webinars</div>
              <p className="su-desc">Free CE-eligible live webinars and on-demand replays with industry experts.</p>
            </Link>
            <Link href="/blog/" className="su-card">
              <div className="su-icon-wrap"><svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg></div>
              <div className="su-title">Read the Blog</div>
              <p className="su-desc">Strategy articles and plain-English guides on dental PPO negotiation and practice growth.</p>
            </Link>
            <Link href="/contact" className="su-card">
              <div className="su-icon-wrap"><svg className="su-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
              <div className="su-title">Get in Touch</div>
              <p className="su-desc">Questions about insurance strategy, marketing, or partnerships? We respond within 1 business day.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
