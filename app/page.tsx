import type { Metadata } from "next";
import Link from "next/link";
import CounterAnimation from "@/components/CounterAnimation";
import NewsletterForm from "@/components/NewsletterForm";
import { getUpcomingEvents } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Dental Insurance Strategy for Dental Practices",
  description:
    "Insurance Untangled cuts through the confusion of dental PPOs - helping dentists negotiate better reimbursements, understand their plans, and build a practice that works with insurance.",
  alternates: { canonical: "https://www.insuranceuntangled.com/" },
};

function formatEventDate(dateIso: string, time: string): string {
  if (!dateIso) return "";
  const d = new Date(dateIso + "T00:00:00");
  if (isNaN(d.getTime())) return time || "";
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}${time ? `  ·  ${time}` : ""}`;
}

export default async function Home() {
  const events = await getUpcomingEvents();
  const today = new Date().toISOString().split("T")[0];
  const nextEvent = events.find((e) => e.date_iso >= today);
  return (
    <>
      {/* Hero */}
      <section className="h2-hero" id="main-content">
        <div className="h2-hero-bg"></div>
        <div className="container h2-hero-inner">

          <div>
            <div className="h2-tag">
              <span className="h2-tag-dot"></span>
              Making sense of dental insurance
            </div>
            <h1 className="h2-headline reveal">
              <span className="h2-hl-top" id="tw-line">Insurance is complex.</span>
              <span className="h2-hl-mid">We untangle it.</span>
              <span className="h2-hl-bot">So your practice can thrive.</span>
            </h1>
            <p className="h2-hero-sub reveal reveal-d1">Insurance Untangled cuts through the confusion of dental PPOs &mdash; helping dentists negotiate better reimbursements, understand their plans, and build a practice that works with insurance rather than against it.</p>
            <div className="h2-hero-actions reveal reveal-d2">
              <Link href="/dental-marketing" className="h2-btn-primary">Book Free Marketing Consult</Link>
              <Link href="/podcast" className="h2-btn-ghost-hero">
                Browse 137 episodes
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>

          <div className="h2-hero-right">
            <div className="h2-yarn-wrap">
              <div className="h2-yarn-glow"></div>
              <img src="/images/hero-yarn.png" alt="Dental insurance complexity untangled" className="h2-yarn-img" loading="eager" fetchPriority="high" width={480} height={520} />
              <div className="h2-yarn-stats">
                <div className="h2-img-stat">
                  <div className="h2-img-stat-val">137<sup>+</sup></div>
                  <div className="h2-img-stat-lbl">Episodes</div>
                </div>
                <div className="h2-img-stat-div"></div>
                <div className="h2-img-stat">
                  <div className="h2-img-stat-val">$3B</div>
                  <div className="h2-img-stat-lbl">Recovered</div>
                </div>
                <div className="h2-img-stat-div"></div>
                <div className="h2-img-stat">
                  <div className="h2-img-stat-val">20yr</div>
                  <div className="h2-img-stat-lbl">Experience</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Trust bar */}
        <div className="h2-trust">
          <div className="container h2-trust-inner">
            <div className="h2-trust-item reveal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Weekly new episodes
            </div>
            <div className="h2-trust-sep"></div>
            <div className="h2-trust-item reveal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Untangling dental insurance
            </div>
            <div className="h2-trust-sep"></div>
            <div className="h2-trust-item reveal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              Better reimbursements, less confusion
            </div>
            <div className="h2-trust-sep"></div>
            <div className="h2-trust-item reveal">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              Free resources &amp; consultations
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="h2-problem" style={{ position: "relative" }}>
        <div className="container">
          <div className="h2-section-header reveal">
            <span className="h2-num">01</span>
            <div>
              <div className="h2-eyebrow">The problem</div>
              <h2 className="h2-title">Heavy PPO reliance is quietly<br />holding your practice back.</h2>
            </div>
          </div>
          <div className="h2-problem-body">
            <p className="h2-problem-intro reveal-d1">Dental insurance is deliberately complex. Fee schedules, umbrella networks, claim denials, and contract language are designed to be confusing &mdash; and most dentists don&apos;t have the time or tools to navigate it confidently.</p>
            <div className="h2-problem-cols reveal">
              <div className="h2-problem-point reveal-d1">
                <div className="h2-pp-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /><line x1="9" y1="11" x2="13" y2="11" /></svg></div>
                <div className="h2-pp-text">
                  <div className="h2-pp-title">Fee schedules are hard to negotiate without expertise</div>
                  <div className="h2-pp-desc">Most dentists don&apos;t know what they&apos;re entitled to ask for &mdash; or how to ask for it. The plans count on that.</div>
                </div>
              </div>
              <div className="h2-problem-point reveal-d2">
                <div className="h2-pp-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12s1.5-4 4-4 4 4 4 4-1.5 4-4 4-4-4-4-4" /></svg></div>
                <div className="h2-pp-text">
                  <div className="h2-pp-title">Umbrella networks and contract terms catch dentists off guard</div>
                  <div className="h2-pp-desc">Many dentists are unknowingly in-network with plans they never signed &mdash; because they didn&apos;t understand the network structure.</div>
                </div>
              </div>
              <div className="h2-problem-point reveal-d3">
                <div className="h2-pp-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
                <div className="h2-pp-text">
                  <div className="h2-pp-title">Claim denials and downgrades drain revenue silently</div>
                  <div className="h2-pp-desc">Insurance companies deny, downcode, and delay claims in ways most practices never fully track &mdash; costing thousands every year.</div>
                </div>
              </div>
            </div>
            <div className="h2-problem-stat reveal-d2">
              <CounterAnimation target={47} suffix="%" className="h2-big-num" suffixClassName="h2-big-pct" />
              <div className="h2-big-label">of dental practices say navigating insurance administration is their biggest operational headache</div>
              <div className="h2-big-source">&mdash; dental industry survey, 2024</div>
              <blockquote className="h2-quote">
                &ldquo;They truly go above and beyond to make sure your office will succeed. We appreciate them so much and look forward to continue to grow with them.&rdquo;
                <cite>&mdash; Brittney Price, Google Review</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="h2-offerings">
        <div className="container">
          <div className="h2-section-header reveal">
            <span className="h2-num">02</span>
            <div>
              <div className="h2-eyebrow">What we offer</div>
              <h2 className="h2-title">Four ways we help you untangle it.</h2>
            </div>
          </div>
          <div className="h2-offer-grid reveal">

            <Link href="/podcast" className="h2-offer h2-offer-featured h2-offer-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=70&auto=format&fit=crop')" }}>
              <div className="h2-offer-num">01</div>
              <div className="h2-offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
              </div>
              <div className="h2-offer-body">
                <div className="h2-offer-title">Podcast</div>
                <p className="h2-offer-desc">137 expert conversations that decode PPO strategy, fee negotiation, claim management, and the business of dentistry. New episodes weekly &mdash; free forever.</p>
                <div className="h2-offer-link">Listen on Apple &amp; Spotify &rarr;</div>
              </div>
            </Link>

            <Link href="/ppo-negotiation" className="h2-offer h2-offer-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=70&auto=format&fit=crop')" }}>
              <div className="h2-offer-num">02</div>
              <div className="h2-offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <div className="h2-offer-body">
                <div className="h2-offer-title">PPO Negotiation</div>
                <p className="h2-offer-desc">Veritas Dental Resources handles every negotiation with insurance companies on your behalf &mdash; getting you better rates without the confusion or the admin.</p>
                <div className="h2-offer-link">See how it works &rarr;</div>
              </div>
            </Link>

            <Link href="/dental-marketing" className="h2-offer h2-offer-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=70&auto=format&fit=crop')" }}>
              <div className="h2-offer-num">03</div>
              <div className="h2-offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" /></svg>
              </div>
              <div className="h2-offer-body">
                <div className="h2-offer-title">Dental Marketing</div>
                <p className="h2-offer-desc">Ekwa Marketing brings in high-value patients through digital channels &mdash; giving you more control over who walks through your door.</p>
                <div className="h2-offer-link">Book free consultation &rarr;</div>
              </div>
            </Link>

            <Link href="/events" className="h2-offer h2-offer-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=70&auto=format&fit=crop')" }}>
              <div className="h2-offer-num">04</div>
              <div className="h2-offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <div className="h2-offer-body">
                <div className="h2-offer-title">Live Webinars</div>
                <p className="h2-offer-desc">Monthly live panels where dental insurance experts answer your real questions. Earn CE credit, cut through the jargon, and walk away with clarity. Free to attend.</p>
                <div className="h2-offer-link">View upcoming events &rarr;</div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Scorecard Teaser */}
      <section className="h2-scorecard-teaser">
        <div className="container">
          <div className="h2-sc-inner">
            <div className="h2-sc-left reveal-left">
              <div className="h2-sc-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                Free tool
              </div>
              <h2 className="h2-sc-title">How well do you understand your PPO position?</h2>
              <p className="h2-sc-sub">Take our 10-question PPO Readiness Scorecard. In 2 minutes you&apos;ll see exactly where your practice stands &mdash; and what to untangle first.</p>
              <div className="h2-sc-checks">
                <div className="h2-sc-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> 10 yes/no questions &mdash; takes under 2 minutes</div>
                <div className="h2-sc-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Scored across 6 key dimensions of PPO readiness</div>
                <div className="h2-sc-check"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Personalised action steps based on your results</div>
              </div>
              <Link href="/ppo-scorecard/" className="h2-btn-teal">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                Take the Scorecard
              </Link>
            </div>
            <div className="h2-sc-preview reveal-right">
              <div className="h2-sc-preview-label">Sample questions</div>
              <div className="h2-sc-q">
                <div className="h2-sc-q-dim">Financial Awareness</div>
                <div className="h2-sc-q-text">Do you know exactly what percentage of your revenue comes from PPO plans?</div>
                <div className="h2-sc-q-opts">
                  <span className="h2-sc-opt h2-sc-opt-yes">Yes</span>
                  <span className="h2-sc-opt">No</span>
                </div>
              </div>
              <div className="h2-sc-q">
                <div className="h2-sc-q-dim">Insurance Strategy</div>
                <div className="h2-sc-q-text">Have you negotiated your PPO fees in the last 12 months?</div>
                <div className="h2-sc-q-opts">
                  <span className="h2-sc-opt">Yes</span>
                  <span className="h2-sc-opt h2-sc-opt-no">No</span>
                </div>
              </div>
              <div className="h2-sc-more">+ 8 more questions &middot; 4 scoring dimensions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="h2-podcast">
        <div className="container">
          <div className="h2-section-header reveal">
            <span className="h2-num">03</span>
            <div>
              <div className="h2-eyebrow">The podcast</div>
              <h2 className="h2-title">Real conversations that decode dental insurance.</h2>
            </div>
          </div>
          {/* Headphone illustration - full width banner */}
          <div className="h2-podcast-img-wrap reveal" style={{ marginBottom: "2rem", borderRadius: "10px", overflow: "hidden", height: "220px" }}>
            <img src="/images/headphone-podcast.jpg" alt="Podcast headphones" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} loading="lazy" />
          </div>
          <div className="h2-podcast-body reveal">
            <div className="h2-podcast-intro">
              <p>No jargon. No spin. Practical, honest conversations with dentists and experts who&apos;ve untangled the insurance system &mdash; and can show you how to do the same.</p>
              <div className="h2-platform-row">
                <a href="https://podcasts.apple.com/us/podcast/insurance-untangled" target="_blank" rel="noopener noreferrer" className="h2-platform">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                  Apple Podcasts
                </a>
                <a href="https://open.spotify.com/show/insurance-untangled" target="_blank" rel="noopener noreferrer" className="h2-platform">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                  Spotify
                </a>
                <a href="https://www.youtube.com/@insuranceuntangled" target="_blank" rel="noopener noreferrer" className="h2-platform">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                  YouTube
                </a>
              </div>
              <Link href="/podcast" className="h2-btn-outline" style={{ marginTop: "1.75rem" }}>View all 137 episodes &rarr;</Link>
            </div>
            <div className="h2-ep-stack">
              <Link href="/podcast/" className="h2-ep" role="button" tabIndex={0}>
                <span className="h2-ep-num">137</span>
                <span className="h2-ep-title">Why Doing &quot;More&quot; Isn&apos;t the Answer &mdash; Doing the Right Things Is!</span>
                <span className="h2-ep-tag">Marketing</span>
              </Link>
              <Link href="/podcast" className="h2-ep" role="button" tabIndex={0}>
                <span className="h2-ep-num">136</span>
                <span className="h2-ep-title">Are Out-of-Network Benefits Getting Better or Worse?</span>
                <span className="h2-ep-tag">Negotiating</span>
              </Link>
              <Link href="/podcast" className="h2-ep" role="button" tabIndex={0}>
                <span className="h2-ep-num">135</span>
                <span className="h2-ep-title">Why Your Schedule Controls You and How to Change That</span>
                <span className="h2-ep-tag">Marketing</span>
              </Link>
              <Link href="/podcast" className="h2-ep" role="button" tabIndex={0}>
                <span className="h2-ep-num">134</span>
                <span className="h2-ep-title">What Google Really Wants From Your Dental Website in 2026</span>
                <span className="h2-ep-tag">Marketing</span>
              </Link>
              <Link href="/podcast" className="h2-ep" role="button" tabIndex={0}>
                <span className="h2-ep-num">133</span>
                <span className="h2-ep-title">Creating a PPO Exit Strategy for Your Dental Practice</span>
                <span className="h2-ep-tag">Negotiating</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="h2-founders">
        <div className="container">
          <div className="h2-section-header reveal">
            <span className="h2-num">04</span>
            <div>
              <div className="h2-eyebrow">The founders</div>
              <h2 className="h2-title">The people behind the untangling.</h2>
            </div>
          </div>
          <div className="h2-founders-grid reveal">
            <Link href="/about" className="h2-founder reveal-d1" role="button" tabIndex={0}>
              <img src="/images/naren-founder.jpg" alt="Naren Arulrajah" className="h2-founder-photo" loading="lazy" />
              <div className="h2-founder-body">
                <div className="h2-founder-name">Naren Arulrajah</div>
                <div className="h2-founder-role">CEO &amp; Founder, Ekwa Marketing</div>
                <p className="h2-founder-bio">Serial entrepreneur and founder of Ekwa Marketing. Naren has spent 15+ years helping dental practices grow through smarter digital marketing &mdash; bringing new patients in without depending on insurance referrals alone.</p>
                <div className="h2-founder-badge">200+ practices served</div>
              </div>
            </Link>
            <Link href="/about" className="h2-founder reveal-d2" role="button" tabIndex={0}>
              <img src="/images/ben-founder.jpg" alt="Ben Tuinei" className="h2-founder-photo" loading="lazy" />
              <div className="h2-founder-body">
                <div className="h2-founder-name">Ben Tuinei</div>
                <div className="h2-founder-role">President, Veritas Dental Resources</div>
                <p className="h2-founder-bio">20 years specialising in PPO contract negotiations, fee schedules, and insurance strategy. Ben has recovered over $3 billion for dental clients and is one of the most sought-after speakers on insurance in dentistry.</p>
                <div className="h2-founder-badge">$3B+ recovered for clients</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="h2-reviews">
        <div className="container">
          <div className="h2-section-header reveal">
            <span className="h2-num">05</span>
            <div>
              <div className="h2-eyebrow">What partners say</div>
              <h2 className="h2-title">Real practices, real results.</h2>
            </div>
          </div>
          <div className="h2-reviews-grid reveal">
            <article className="h2-review reveal-d1">
              <div className="h2-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="h2-review-quote">After working with several marketing companies, we moved forward with Ekwa. I have a high standard for what I want, and I appreciate their precision and punctuality. The results were exactly what I wanted. We&rsquo;ve given them the second office to work on. I highly recommend them.</p>
              <div className="h2-review-meta">
                <div className="h2-review-avatar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&q=80&fit=crop&crop=faces')" }} aria-label="Reina Acosta">RA</div>
                <div>
                  <div className="h2-review-name">Reina Acosta</div>
                  <div className="h2-review-role">Google Review</div>
                </div>
              </div>
            </article>
            <article className="h2-review reveal-d2">
              <div className="h2-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="h2-review-quote">My office has been using EKWA for 10 plus years and had great results as well as great customer service. They truly go above and beyond to make sure your office will succeed. We appreciate them so much and look forward to continue to grow with them.</p>
              <div className="h2-review-meta">
                <div className="h2-review-avatar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&q=80&fit=crop&crop=faces')" }} aria-label="Brittney Price">BP</div>
                <div>
                  <div className="h2-review-name">Brittney Price</div>
                  <div className="h2-review-role">Google Review</div>
                </div>
              </div>
            </article>
            <article className="h2-review reveal-d3">
              <div className="h2-review-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="h2-review-quote">Recently partnered with Ekwa after a couple years of learning through their very informative podcasts and webinars. Looking forward to experiencing growth with their team helping with SEO. Special thanks to Lana, Nithin and team for getting our new website up and running.</p>
              <div className="h2-review-meta">
                <div className="h2-review-avatar" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&q=80&fit=crop&crop=faces')" }} aria-label="Arthur Vasquez">AV</div>
                <div>
                  <div className="h2-review-name">Arthur Vasquez</div>
                  <div className="h2-review-role">o41 Skin Lab</div>
                </div>
              </div>
            </article>
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }} className="reveal">
            <Link href="/dental-marketing" className="btn-primary" style={{ display: "inline-block", fontSize: ".95rem", padding: ".85rem 2rem" }}>Book a Strategy Meeting &rarr;</Link>
          </div>
          <div className="h2-review-trust reveal" style={{ marginTop: "1.5rem" }}>
            <span className="h2-review-trust-stars" aria-hidden="true">★★★★★</span>
            <span><strong>Trusted</strong> by independent dental practices nationwide</span>
            <span className="h2-review-trust-sep" aria-hidden="true"></span>
            <span>Listen to full stories on <Link href="/podcast" style={{ color: "var(--navy)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--paper-3)" }}>the podcast &rarr;</Link></span>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: "var(--paper-2)", padding: "2.5rem 0", borderTop: "1px solid var(--paper-3)", borderBottom: "1px solid var(--paper-3)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div className="sec-eyebrow" style={{ display: "inline-block" }}>Trusted by dental professionals nationwide</div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.25rem",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                ),
                title: "20 Years",
                sub: "PPO negotiation expertise",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                ),
                title: "$3B+",
                sub: "Recovered for clients",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ),
                title: "4.9 / 5",
                sub: "Google review average",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                ),
                title: "200+",
                sub: "Practices served",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                ),
                title: "GDPR / CCPA",
                sub: "Data privacy compliant",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                ),
                title: "Weekly",
                sub: "New podcast episodes",
              },
            ].map((badge, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--paper-3)",
                  borderRadius: "var(--r-lg)",
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: ".5rem",
                }}
              >
                <div style={{ width: "36px", height: "36px", color: "var(--steel)" }}>{badge.icon}</div>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.25rem", fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>
                  {badge.title}
                </div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  {badge.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinar */}
      <div className="card-deck-wrap">
        <section className="h2-webinar card-deck-card" data-card="0">
          <div className="container">
            <div className="h2-section-header reveal">
              <span className="h2-num">06</span>
              <div>
                <div className="h2-eyebrow">Upcoming event</div>
                <h2 className="h2-title">Live answers to your real insurance questions.</h2>
              </div>
            </div>
            <div className="h2-webinar-card reveal">
              <div className="h2-webinar-left">
                <div className="h2-event-chip">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {nextEvent ? formatEventDate(nextEvent.date_iso, nextEvent.time) : "Upcoming event date TBA"}
                </div>
                <h3 className="h2-webinar-title">{nextEvent?.title || "Insurance Untangled Live"}</h3>
                <ul className="h2-webinar-perks">
                  {nextEvent?.description ? (
                    nextEvent.description.split("\n").filter(Boolean).slice(0, 4).map((line, i) => (
                      <li key={i}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> {line.trim()}
                      </li>
                    ))
                  ) : (
                    <>
                      <li><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Live insurance expert panel</li>
                      <li><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> CE credits included</li>
                      <li><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Live Q&amp;A &mdash; get your specific questions answered</li>
                      <li><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Free to attend</li>
                    </>
                  )}
                </ul>
                {nextEvent?.register_url ? (
                  <a href={nextEvent.register_url} target="_blank" rel="noopener noreferrer" className="h2-btn-primary">Reserve Your Spot &rarr;</a>
                ) : (
                  <Link href="/events" className="h2-btn-primary">Browse Events &rarr;</Link>
                )}
              </div>
              <div className="h2-webinar-right">
                <div className="h2-host-pair">
                  <div className="h2-host">
                    <img src="/images/naren-founder.jpg" alt="Naren Arulrajah" className="h2-host-avatar" style={{ objectFit: "cover" }} loading="lazy" />
                    <div className="h2-host-name">Naren Arulrajah</div>
                    <div className="h2-host-role">Host &bull; CEO, Ekwa</div>
                    <div className="h2-host-bio">18+ years helping dental practices grow through smarter marketing</div>
                  </div>
                  <div className="h2-host-x">&times;</div>
                  <div className="h2-host">
                    <img src="/images/ben-founder.jpg" alt="Ben Tuinei" className="h2-host-avatar" style={{ objectFit: "cover" }} loading="lazy" />
                    <div className="h2-host-name">Ben Tuinei</div>
                    <div className="h2-host-role">Expert &bull; Founder, Veritas</div>
                    <div className="h2-host-bio">$3B+ recovered in dental PPO reimbursements over 20 years</div>
                  </div>
                </div>
                <Link href="/events/" className="h2-btn-ghost-light" style={{ marginTop: "1.5rem", fontSize: "12.5px" }}>Browse webinar replays &rarr;</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="h2-newsletter card-deck-card" data-card="1">
          <div className="h2-nl-inner">
            <div className="h2-nl-left reveal-left">
              <div className="h2-eyebrow" style={{ color: "var(--sky)", opacity: 0.85 }}>Stay ahead</div>
              <h2 className="h2-title" style={{ color: "#fff" }}>The weekly guide to untangling dental insurance.</h2>
              <div className="h2-nl-bullets">
                <span>Weekly PPO strategy</span>
                <span>New episode recaps</span>
                <span>Event invitations</span>
              </div>
            </div>
            <div className="h2-nl-right reveal-right">
              <div className="h2-nl-form-wrap">
                <div className="h2-nl-form-label">No spam. Unsubscribe anytime.</div>
                <NewsletterForm source="homepage" formClassName="h2-nl-form" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="h2-cta card-deck-card" data-card="2">
          <div className="container h2-cta-inner">
            <div className="h2-cta-text reveal-left">
              <div className="h2-eyebrow">Ready to start?</div>
              <h2 className="h2-title" style={{ fontSize: "clamp(2rem,3.5vw,3rem)", marginBottom: ".5rem" }}>Ready to untangle your insurance situation?</h2>
              <p style={{ fontSize: "15.5px", color: "var(--ink-3)", maxWidth: "500px" }}>Book a free consultation with Ekwa Marketing and get a clear picture of where your practice stands &mdash; and what steps will make the biggest difference.</p>
            </div>
            <div className="h2-cta-action reveal-right">
              <Link href="/dental-marketing" className="h2-btn-primary h2-btn-xl">Book Your Free Consultation &rarr;</Link>
              <Link href="/ppo-scorecard/" className="h2-btn-ghost" style={{ marginTop: ".75rem", fontSize: "13px", justifyContent: "center" }}>
                Or take the free PPO Readiness Scorecard first &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
