"use client";

import { useEffect, useRef, useState } from "react";

// Interactive sections of the /community/ page (Dental Member Network).
// Ported from the standalone "community page.html" and re-themed with the
// site's design tokens — the original's vanilla-JS typing demo and
// nine-doors switcher are reimplemented as React state.

// Insurance Untangled edition — scenarios per the rollout addendum: on an
// insurance-focused site the visitor sees INSURANCE problems, not the
// Thriving Dentist hygiene demo. Scenario 1 is the addendum's approved copy;
// 2 and 3 follow its tab labels and honesty gates (no statistics, written
// reply in 2–3 business days, illustrative only).
const SCENARIOS = [
  {
    tab: "PPO reimbursement",
    q: "Two of my PPO plans are reimbursing below my cost and I do not know which to drop first.",
    a: "Start with the plan carrying the lowest reimbursement against your highest-volume codes, not the smallest patient count. Here is how to run that comparison, and the letter that keeps the patients.",
    chips: ["Payer analysis worksheet", "Patient letter template", "Two vetted experts", "Fee schedule checklist"],
  },
  {
    tab: "Claims denied",
    q: "The same crown code keeps getting denied and my team has started writing it off.",
    a: "Denials like this usually trace to a documentation pattern, not the code. Here is the narrative and imaging checklist that gets it paid, and the appeal letter for the backlog you already wrote off.",
    chips: ["Appeal letter template", "Narrative checklist", "A vetted expert", "Denial tracking worksheet"],
  },
  {
    tab: "Fee schedule",
    q: "I have not touched my fee schedule in years and I have no idea where to start.",
    a: "There is almost always room after that long, but the ask has to be built on your own numbers. Start with your top codes, then go carrier by carrier in the right order. Here is the sequence.",
    chips: ["Fee schedule checklist", "Negotiation script", "Two vetted experts", "Cost-per-code worksheet"],
  },
];

const EXPERTS = [
  "gary-takacs", "naren-arulrajah", "ashley-boaz", "laura-phillips",
  "monica-watson", "callie-ward", "dr-parul-dua-makkar", "james-deluca",
  "dr-marilyn-sandor", "francesca-ortepi", "dr-christopher-phelps", "dr-david-moffet",
  "gerilyn-alfe", "kelly-fox-galvagni", "brian-hanks", "dr-robert-convissar",
];

const KITS = [
  "transition-without-turbulence-kit-card", "speak-so-patients-say-yes-kit-card",
  "build-a-team-that-takes-ownership-kit-card", "know-your-real-numbers-kit-card",
  "stop-working-for-the-insurance-company-kit-card", "successful-morning-huddle-kit-card",
  "connect-before-you-treat-kit-card", "seen-felt-and-acknowledged-kit-card",
  "teach-the-child-not-the-parent-kit-card",
];

const DIRECTORY = [
  { name: "Ekwa Marketing", cat: "Marketing" },
  { name: "Thriving Dentist", cat: "Practice coaching" },
  { name: "The Phillips Group", cat: "Accounting & tax" },
  { name: "Mint Conceptions", cat: "Coaching & consulting" },
  { name: "Precision Dental Analytics", cat: "Practice value & analytics" },
  { name: "Dua Good Job", cat: "Oral cancer & well-being" },
];

const DOORS: { id: string; group: string; num: string; label: string }[] = [
  { id: "p1", group: "Get unstuck", num: "01", label: "Expert Hotline" },
  { id: "p2", group: "Get unstuck", num: "02", label: "Vetted Expert Network" },
  { id: "p3", group: "Get it done", num: "03", label: "Resource Library" },
  { id: "p4", group: "Get it done", num: "04", label: "SOPs" },
  { id: "p5", group: "Get it done", num: "05", label: "Templates" },
  { id: "p6", group: "Get it done", num: "06", label: "Tools" },
  { id: "p7", group: "Spend less", num: "07", label: "Partner & Company Directory" },
  { id: "p8", group: "Keep learning", num: "08", label: "Member-only Podcasts" },
  { id: "p9", group: "Keep learning", num: "09", label: "Member-only Events" },
];

const DOOR_GROUPS = ["Get unstuck", "Get it done", "Spend less", "Keep learning"];

function TypingDemo() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [planOn, setPlanOn] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPlanOn(false);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = SCENARIOS[idx].q;

    if (reduce) {
      setTyped(q);
      setPlanOn(true);
      return;
    }

    setTyped("");
    let k = 0;
    const type = () => {
      if (k <= q.length) {
        setTyped(q.slice(0, k));
        k++;
        timers.current.push(setTimeout(type, 34));
      } else {
        timers.current.push(setTimeout(() => setPlanOn(true), 350));
        timers.current.push(setTimeout(() => setIdx((i) => (i + 1) % SCENARIOS.length), 9000));
      }
    };
    type();

    return () => timers.current.forEach(clearTimeout);
  }, [idx]);

  const s = SCENARIOS[idx];

  return (
    <div className="cm-demo" aria-label="Watch how the hotline answers a problem">
      <div className="cm-tabs" role="tablist" aria-label="Example problems">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.tab}
            className="cm-tab"
            role="tab"
            aria-selected={i === idx}
            onClick={() => setIdx(i)}
          >
            {sc.tab}
          </button>
        ))}
      </div>
      <div className="cm-term">
        <div className="cm-term-bar"><span>To: the network</span><span>Any problem · plain English</span></div>
        <div className="cm-term-q"><p><span>{typed}</span><span className="cm-caret" /></p></div>
        <div className={`cm-plan${planOn ? " on" : ""}`}>
          <div className="cm-plan-from">From: Dental Member Network · the written plan</div>
          <p className="cm-plan-body">{s.a}</p>
          <div className="cm-chips">
            {s.chips.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div><span className="cm-stamp">Written reply · 2 to 3 business days</span></div>
        </div>
      </div>
      <div className="cm-note">Illustrative example</div>
    </div>
  );
}

function DoorPanel({ id }: { id: string }) {
  switch (id) {
    case "p1":
      return (
        <>
          <div className="cm-spmedia">
            <div className="cm-replycard">
              <div className="cm-rmeta"><span>From: Dental Member Network</span><span>The written plan</span></div>
              <div className="cm-rbody">
                Start with the plan carrying the lowest reimbursement against your highest-volume codes,
                not the smallest patient count. Here is how to run that comparison, and the letter that
                keeps the patients.
              </div>
              <div className="cm-rchips"><span>Payer analysis worksheet</span><span>Patient letter template</span><span>Two vetted experts</span></div>
              <span className="cm-stamp">Written reply · 2 to 3 business days</span>
            </div>
          </div>
          <div className="cm-spcap"><b>Expert Hotline</b><span>Any practice problem in plain English. A written plan back in 2 to 3 business days.</span></div>
        </>
      );
    case "p2":
      return (
        <>
          <div className="cm-spmedia">
            <div className="cm-wall">
              {EXPERTS.map((slug) => (
                <img key={slug} src={`/images/community/${slug}.jpg`} alt={slug.replace(/-/g, " ")} loading="lazy" />
              ))}
              <span className="cm-wplus">+</span>
            </div>
          </div>
          <div className="cm-spcap"><b>Vetted Expert Network</b><span>Named specialists we check ourselves, each with a booking link. And the lineup keeps growing.</span></div>
        </>
      );
    case "p3":
      return (
        <>
          <div className="cm-spmedia">
            <span className="cm-realchip">Real kits from the library</span>
            <div className="cm-pack">
              {KITS.map((slug) => (
                <img key={slug} src={`/images/community/${slug}.jpg`} alt={slug.replace(/-/g, " ")} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="cm-spcap"><b>Resource Library</b><span>A growing library of done-for-you kits, built from real expert sessions.</span></div>
        </>
      );
    case "p4":
      return (
        <>
          <div className="cm-spmedia">
            <span className="cm-realchip">A real page from a member kit</span>
            <img className="cm-pgshot" src="/images/community/action-guide-page-from-a-real-kit.jpg" alt="Action guide page from a real kit" loading="lazy" />
          </div>
          <div className="cm-spcap"><b>SOPs</b><span>Step-by-step procedures your team can run without you.</span></div>
        </>
      );
    case "p5":
      return (
        <>
          <div className="cm-spmedia">
            <span className="cm-realchip">A real page from a member kit</span>
            <img className="cm-pgshot" src="/images/community/checklist-page-from-a-real-kit.jpg" alt="Checklist page from a real kit" loading="lazy" />
          </div>
          <div className="cm-spcap"><b>Templates</b><span>Scripts, letters, checklists and forms, ready to edit and use.</span></div>
        </>
      );
    case "p6":
      return (
        <>
          <div className="cm-spmedia">
            <span className="cm-realchip">A real page from a member kit</span>
            <img className="cm-pgshot" src="/images/community/worksheet-page-from-a-real-kit.jpg" alt="Worksheet page from a real kit" loading="lazy" />
          </div>
          <div className="cm-spcap"><b>Tools</b><span>Worksheets and calculators for the numbers that run the practice.</span></div>
        </>
      );
    case "p7":
      return (
        <>
          <div className="cm-spmedia">
            <div className="cm-dirlist">
              {DIRECTORY.map((d) => (
                <div key={d.name} className="cm-dirrow"><b>{d.name}</b><span>{d.cat}</span><span className="cm-off">MEMBER OFFER</span></div>
              ))}
            </div>
          </div>
          <div className="cm-spcap"><b>Partner &amp; Company Directory</b><span>Who does what in dental, in one place, with member-only offers from the companies we work with.</span></div>
        </>
      );
    case "p8":
      return (
        <>
          <div className="cm-spmedia">
            <div className="cm-mystery">
              <span className="cm-gt">Guess the expert</span>
              <span className="cm-mimg"><img src="/images/community/img.jpg" alt="" loading="lazy" /><span className="cm-q">?</span></span>
              <span className="cm-topic">&ldquo;The numbers your front desk never shows you&rdquo;</span>
            </div>
          </div>
          <div className="cm-spcap"><b>Member-only Podcasts</b><span>Conversations that never go out on the public feed. Members find out who it is.</span></div>
        </>
      );
    case "p9":
      return (
        <>
          <div className="cm-spmedia cm-nopad">
            <div className="cm-bannerwrap">
              <img src="/images/community/a-live-member-event.jpg" alt="A live member event" loading="lazy" />
              <div className="cm-bannerov">
                <div className="cm-bt">Member-only event · Live</div>
                <div className="cm-bh">Ask your question from the front row.</div>
              </div>
            </div>
          </div>
          <div className="cm-spcap"><b>Member-only Events</b><span>Live sessions with the experts in the network, small enough to ask a question in.</span></div>
        </>
      );
    default:
      return null;
  }
}

export default function CommunityClient() {
  const [door, setDoor] = useState("p1");

  return (
    <>
      {/* Hero */}
      <div className="page-banner" style={{ paddingBottom: "3rem" }}>
        <div className="container">
          <div className="cm-hero-grid">
            <div>
              <div className="page-eyebrow">From the team behind Insurance Untangled</div>
              <h1 className="page-title" style={{ maxWidth: "560px" }}>
                Insurance is complex. <em style={{ color: "var(--teal-lt, #14C6C0)", fontStyle: "italic" }}>We untangle it.</em>
              </h1>
              <p className="page-sub" style={{ maxWidth: "540px" }}>
                That has always been the promise here. The Dental Member Network is how we keep making
                good on it, for every problem in your practice, not only the insurance ones. Bring us
                anything, and a real person writes back a plan within 2 to 3 business days.
              </p>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
                <a href="https://dentalmembernetwork.com" target="_blank" rel="noopener noreferrer" className="btn-teal">
                  Bring us a problem
                </a>
                <a href="#doors" className="btn-outline-light">See the nine doors</a>
              </div>
            </div>
            <TypingDemo />
          </div>
        </div>
      </div>

      {/* Nine doors */}
      <section style={{ background: "var(--paper)", padding: "4rem 0" }} id="doors">
        <div className="container">
          <div className="sec-eyebrow">The membership</div>
          <h2 className="sec-title">Nine doors. <em style={{ color: "var(--teal)", fontStyle: "italic" }}>One</em> key.</h2>
          <p className="sec-sub" style={{ maxWidth: "560px" }}>
            Everything in the membership sits behind one fee. No tiers inside, no add-ons, no upsell
            waiting on the other side.
          </p>
          <div className="cm-hint">Pick a door</div>

          <div className="cm-showcase">
            <nav className="cm-menu" aria-label="The nine doors">
              {DOOR_GROUPS.map((group) => (
                <div className="cm-mgroup" key={group}>
                  <span className="cm-sc">{group}</span>
                  {DOORS.filter((d) => d.group === group).map((d) => (
                    <button
                      key={d.id}
                      className="cm-mitem"
                      role="tab"
                      aria-selected={door === d.id}
                      onClick={() => setDoor(d.id)}
                    >
                      <span className="cm-mp">{d.num}</span>
                      {d.label}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
            <div className="cm-stage">
              <DoorPanel id={door} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="cm-price">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="cm-price-big">
            The advice stays free. The key is <em>$49 a month.</em>
          </div>
          <p className="cm-price-terms">
            <b>The founding rate, locked for the first 100 members</b> for as long as they stay.
            30-day money-back guarantee. Cancel anytime.
          </p>
          <a href="https://dentalmembernetwork.com" target="_blank" rel="noopener noreferrer" className="btn-teal" style={{ fontSize: "15px", padding: ".9rem 2rem" }}>
            Join the Dental Member Network
          </a>
          <div className="cm-open-line">Doors open the first week of August.</div>
        </div>
      </section>

      {/* Attribution strip — matches the original page's footer content */}
      <div className="cm-foot">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="cm-foot-sc">Powered by Thriving Dentist Inc.</div>
          <a href="https://dentalmembernetwork.com" target="_blank" rel="noopener noreferrer" className="cm-foot-url">dentalmembernetwork.com</a>
        </div>
      </div>
    </>
  );
}
