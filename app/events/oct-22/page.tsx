import type { Metadata } from "next";
import Link from "next/link";
import EventRegisterForm from "@/components/EventRegisterForm";
import EventCountdown from "@/components/EventCountdown";

/* ── Event data ────────────────────────────────────────────────────────────
   Oct 22 2026, 8:00–9:00 PM Eastern. US DST ends Nov 1 2026, so Eastern is
   still EDT (UTC-4) on this date → 2026-10-23T00:00:00Z.
   `EVENT_KEY` must match the row in the "Events Config" tab of the
   IU Zoom Webinar Registrants sheet exactly.                              */
const EVENT_KEY = "event_2026_10_22";
const START_ISO = "2026-10-23T00:00:00Z";
const END_ISO = "2026-10-23T01:00:00Z";
const URL = "https://www.insuranceuntangled.com/events/oct-22/";
const TITLE = "The Fee Schedule Reset — Renegotiating PPO Contracts Before 2027 Locks You In";
const SHORT_TITLE = "The Fee Schedule Reset";
const DESCRIPTION =
  "Free live Insurance Untangled panel, October 22, 2026 at 8 PM ET: how dental practices can evaluate, renegotiate, and make smarter decisions around PPO contracts before 2027 renewals are finalized. 1 CE credit.";

const SPEAKERS = [
  {
    name: "Tessina Bullock",
    role: "President",
    org: "Verus Dental",
    img: "/images/events/oct-22/tessina-bullock.jpg",
    bio: "Tessina Bullock is a respected dental insurance strategist and the President of Verus Dental, where she helps dental practices navigate insurance challenges, PPO strategy, and operational improvements. With extensive experience supporting dental teams, Tessina has developed a strong understanding of the systems and decisions that impact practice profitability. Known for her practical approach to insurance optimization and practice growth, she provides valuable insights into reimbursement strategies, fee schedule analysis, and building stronger financial foundations for dental practices.",
  },
  {
    name: "Ben Tuinei",
    role: "Founder",
    org: "Veritas Dental Resources",
    img: "/images/events/oct-22/ben-tuinei.jpg",
    bio: "Ben Tuinei is one of the dental industry's leading experts in PPO negotiations, dental insurance strategy, and practice profitability. As the Founder of Veritas Dental Resources, Ben has helped thousands of dental practices better understand insurance contracts, negotiate stronger reimbursement rates, and reduce the financial impact of ineffective PPO participation. With decades of experience working directly with dental practices and insurance networks, he is recognized for simplifying complex insurance challenges and providing actionable strategies that help dentists regain control over their revenue.",
  },
  {
    name: "Laura Johnston",
    role: "Founder",
    org: "My Dental SOP",
    img: "/images/events/oct-22/laura-johnston.jpg",
    bio: "Laura Johnston is a dental operations expert and the founder of My Dental SOP, where she helps dental practices create stronger systems, improve team accountability, and streamline daily operations. With a focus on operational excellence, Laura works with practices to develop repeatable processes that support efficiency, consistency, and growth. She brings valuable insights into creating workflows that allow practices to run more effectively while delivering a better patient experience, and continues to help dental teams build organized, scalable operations that support long-term success.",
  },
];

const TOPICS = [
  "Where real negotiation opportunities exist in PPO fee schedules and how practices can identify them.",
  "What data and practice metrics strengthen a dentist's position during insurance negotiations.",
  "When practices should renegotiate existing contracts versus when it may make sense to drop a plan.",
  "How teams can prepare for renewal notices and respond with a strategic approach.",
  "Systems practices can build to protect profitability and avoid costly insurance mistakes.",
];

const AUDIENCE = [
  "You have PPO contracts renewing in 2027 and no clear plan for the renewal notice.",
  "You suspect some fee schedules are underpaying you but don't know which to fight first.",
  "You want to know when renegotiating beats dropping a plan, with the numbers to back it.",
  "You're an owner, office manager, or billing lead who handles carrier conversations.",
  "You'd rather build a repeatable insurance system than react to one letter at a time.",
];

export const metadata: Metadata = {
  title: { absolute: `${SHORT_TITLE} — Live Panel, Oct 22 | Insurance Untangled` },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    siteName: "Insurance Untangled",
    title: TITLE,
    description:
      "Live virtual panel + moderated Q&A · October 22, 2026 · 8:00 PM ET · 1 CE credit. Free to attend, replay sent to every registrant.",
    url: URL,
    locale: "en_US",
    publishedTime: START_ISO,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${TITLE} — Insurance Untangled live event` }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@InsuranceUntangled",
    title: `${SHORT_TITLE} — Live Panel, Oct 22`,
    description: "Renegotiating PPO contracts before 2027 locks you in. Free, 1 CE credit, 8 PM ET on Zoom.",
  },
};

export default function Oct22EventPage() {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: TITLE,
    startDate: START_ISO,
    endDate: END_ISO,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "VirtualLocation", url: URL },
    organizer: { "@type": "Organization", name: "Insurance Untangled", url: "https://www.insuranceuntangled.com/" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${URL}#register`,
      validFrom: "2026-09-29T00:00:00Z",
    },
    performer: SPEAKERS.map((s) => ({ "@type": "Person", name: s.name, jobTitle: `${s.role}, ${s.org}` })),
    image: "https://www.insuranceuntangled.com/opengraph-image.png",
    description: DESCRIPTION,
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Events", item: "https://www.insuranceuntangled.com/events/" },
      { "@type": "ListItem", position: 3, name: SHORT_TITLE, item: URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero + registration ───────────────────────────────────── */}
      <section className="guest-hero evr-hero">
        <div className="container">
          <div className="guest-hero-grid evr-hero-grid">
            <div>
              <nav className="evr-crumbs" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/events/">Events</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">October 22</span>
              </nav>

              <div className="page-eyebrow" style={{ color: "#0EA5A0" }}>
                Insurance Untangled Live &middot; Free panel &middot; 1 CE credit
              </div>

              <h1 className="evr-title">
                The Fee Schedule Reset &mdash; <em>Renegotiating PPO Contracts</em> Before 2027 Locks You In
              </h1>

              <p className="evr-lede">
                A focused live discussion on how dental practices can evaluate, renegotiate, and make smarter
                decisions around PPO contracts before 2027 renewals are finalized &mdash; where the real leverage
                is, what data strengthens your position, and when it&rsquo;s time to walk away from a plan.
              </p>

              <dl className="evr-facts">
                <div>
                  <dt>Date</dt>
                  <dd>
                    <time dateTime="2026-10-22">Thu, Oct 22, 2026</time>
                  </dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>8:00 &ndash; 9:00 PM ET</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>Live Zoom panel + Q&amp;A</dd>
                </div>
                <div>
                  <dt>CE</dt>
                  <dd>1 credit &middot; Complimentary</dd>
                </div>
              </dl>

              <EventCountdown target={START_ISO} label="Panel starts in" />

              <ul className="evr-people" aria-label="Speakers">
                {SPEAKERS.map((s) => (
                  <li key={s.name}>
                    <img src={s.img} alt={s.name} width="44" height="44" loading="eager" />
                    <div>
                      <div className="name">{s.name}</div>
                      <div className="role">
                        {s.role} &middot; {s.org}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <EventRegisterForm eventKey={EVENT_KEY} eventTitle={SHORT_TITLE} />
          </div>
        </div>
      </section>

      {/* ── Key discussion topics ─────────────────────────────────── */}
      <section className="evr-section">
        <div className="container">
          <div className="sec-eyebrow">What we&rsquo;ll cover</div>
          <h2 className="sec-title">Key discussion topics</h2>
          <p className="sec-sub">Five questions the panel will answer with real numbers, real contracts, and real renewal timelines.</p>
          <ol className="evr-topics">
            {TOPICS.map((t, i) => (
              <li key={i}>
                <span className="counter" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── About + audience ──────────────────────────────────────── */}
      <section className="evr-section evr-section--alt">
        <div className="container">
          <div className="evr-two">
            <div className="evr-about">
              <div className="sec-eyebrow">About this session</div>
              <h2 className="sec-title">Renewals are coming. Your leverage is now.</h2>
              <p>
                2027 renewal notices are already in motion, and once a fee schedule is accepted it is locked for years. Join
                Insurance Untangled for a focused discussion on how dental practices can evaluate, renegotiate, and make
                smarter decisions around PPO contracts before those renewals are finalized.
              </p>
              <p>
                The panel will explore where real negotiation opportunities exist within fee schedules, what data
                strengthens a practice&rsquo;s position with insurance carriers, when renegotiating makes sense versus
                dropping a plan, and how teams can prepare strategically to protect profitability while maintaining
                sustainable growth. Bring your questions &mdash; the second half is moderated Q&amp;A.
              </p>
            </div>

            <aside className="evr-audience">
              <h3>This panel is for you if&hellip;</h3>
              <ul>
                {AUDIENCE.map((a, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <a href="#register" className="btn-primary" style={{ marginTop: "1.5rem", background: "var(--teal)" }}>
                Register Free &rarr;
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Speakers ──────────────────────────────────────────────── */}
      <section className="evr-section">
        <div className="container">
          <div className="sec-eyebrow">Speakers</div>
          <h2 className="sec-title">Meet the panel</h2>
          <p className="sec-sub">Three experts who negotiate, audit, and systematize PPO participation for dental practices every day.</p>
          <div className="evr-speakers">
            {SPEAKERS.map((s) => (
              <article className="evr-speaker" key={s.name}>
                <img src={s.img} alt={`${s.name}, ${s.role} of ${s.org}`} width="512" height="512" loading="lazy" />
                <div className="evr-speaker-body">
                  <h3>{s.name}</h3>
                  <div className="speaker">
                    {s.role} &middot; {s.org}
                  </div>
                  <p>{s.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="evr-cta">
        <div className="container">
          <h2>Don&rsquo;t sign the 2027 renewal blind.</h2>
          <p>October 22 &middot; 8:00 PM ET &middot; Free &middot; 1 CE credit &middot; Replay sent to every registrant.</p>
          <a href="#register" className="btn-primary btn-primary-lg">
            Reserve my seat &rarr;
          </a>
        </div>
      </section>
    </>
  );
}
