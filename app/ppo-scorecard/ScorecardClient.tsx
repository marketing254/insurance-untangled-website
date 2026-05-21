"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxJ26_n4we-gHF8djhI2a1n85DoWdghG5-r0JcTdDCRkE_6FvVMZQeTT0ACY_PZA7RmKg/exec";

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "trashmail.com",
  "yopmail.com", "throwawaymail.com", "fakeinbox.com", "getnada.com", "maildrop.cc",
  "sharklasers.com", "tempmailaddress.com", "dispostable.com", "mailnesia.com", "spam4.me",
  "tempinbox.com", "mintemail.com", "moakt.com", "tempr.email", "emailondeck.com",
]);

function isValidEmail(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return false;
  const domain = v.split("@")[1] || "";
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return false;
  return true;
}

// ── Data model ───────────────────────────────────────────────────────────────

type Dimension =
  | "Financial Awareness"
  | "Marketing Readiness"
  | "Operational Readiness"
  | "Insurance Strategy"
  | "Financial Resilience"
  | "Strategic Planning";

interface Question {
  id: number;
  dim: Dimension;
  text: string;
}

const QUESTIONS: Question[] = [
  { id: 1,  dim: "Financial Awareness",   text: "Do you know exactly what percentage of your revenue comes from PPO plans?" },
  { id: 2,  dim: "Financial Awareness",   text: "Have you identified which specific PPO plans are losing you money on hygiene and basic procedures?" },
  { id: 3,  dim: "Marketing Readiness",   text: "Are you currently ranking on the first page of Google for at least 5 dental keywords in your area?" },
  { id: 4,  dim: "Marketing Readiness",   text: "Do you have a system to track where your new patients are coming from each month?" },
  { id: 5,  dim: "Operational Readiness", text: "Is your new patient call conversion rate above 60%?" },
  { id: 6,  dim: "Operational Readiness", text: "Do you have a membership or in-house plan available as an alternative for uninsured patients?" },
  { id: 7,  dim: "Insurance Strategy",    text: "Have you negotiated your PPO fees in the last 12 months?" },
  { id: 8,  dim: "Insurance Strategy",    text: "Do you know which umbrella networks your practice is connected to and their fee schedules?" },
  { id: 9,  dim: "Financial Resilience",  text: "Could your practice sustain a 10–15% short-term dip in patient volume while building fee-for-service revenue?" },
  { id: 10, dim: "Strategic Planning",    text: "Do you have a written plan or timeline for reducing insurance complexity?" },
];

const DIMENSION_ORDER: Dimension[] = [
  "Financial Awareness",
  "Marketing Readiness",
  "Operational Readiness",
  "Insurance Strategy",
  "Financial Resilience",
  "Strategic Planning",
];

type TierKey = "low" | "mid" | "high" | "top";

interface EpisodeRec {
  num: string;
  title: string;
  why: string;
  url: string;
}

interface Tier {
  label: string;
  color: string;
  tagline: string;
  narrative: string;
  steps: { title: string; desc: string }[];
  episodes: EpisodeRec[];
  ctaTitle: string;
  ctaSub: string;
}

const TIERS: Record<TierKey, Tier> = {
  low: {
    label: "Not Ready Yet",
    color: "#E85D5D",
    tagline:
      "Your practice needs foundational work before making PPO changes. The good news: now you know exactly where the gaps are.",
    narrative:
      "Your results show a practice that's working hard but flying blind on the insurance side. You don't yet have a clear picture of what percentage of revenue comes from PPOs, which makes it difficult to know where to start. The good news: the foundational steps are straightforward and free — and completing them will immediately change how you see your business. Your operational readiness suggests your team can execute once a plan is in place.",
    steps: [
      { title: "Calculate your PPO revenue percentage", desc: "Pull a report from your practice management software showing total collections vs. PPO adjustments for the last 12 months. This single number will change how you see your business." },
      { title: "Claim your Google Business Profile", desc: "Optimise your GBP listing and ask your top 10 patients for a Google review this week. These are free actions that compound over time and reduce dependence on insurance for new patients." },
      { title: "Identify which plans you're actually on", desc: "List every insurance plan you participate in. Many practices discover they're in-network with plans they never consciously signed — often through umbrella network clauses." },
    ],
    episodes: [
      { num: "Ep 126", title: "Getting Back to the Basics: Why Foundational Marketing Matters", why: "For your Marketing Readiness gap", url: "https://www.insuranceuntangled.com/getting-back-to-the-basics-why-foundational-marketing-matters-for-every-dental-practice/" },
      { num: "Ep 133", title: "What Google Really Wants From Your Dental Website in 2026", why: "For your Marketing Readiness gap", url: "https://www.insuranceuntangled.com/what-google-really-wants-from-your-dental-website-in-2026/" },
      { num: "Ep 127", title: "Umbrella Network Changes That Will Impact You Tomorrow", why: "For your Insurance Strategy gap", url: "https://www.insuranceuntangled.com/umbrella-network-changes-today-that-will-impact-you-tomorrow/" },
    ],
    ctaTitle: "Your gaps are fixable — let's make a plan.",
    ctaSub: "A free conversation with Ekwa and Veritas can give you a clear roadmap for the next 90 days.",
  },
  mid: {
    label: "Getting Close",
    color: "#E8AA42",
    tagline:
      "You have some pieces in place but critical gaps remain. Targeted improvements in 2–3 areas could make you ready within 6 months.",
    narrative:
      "Your results show a practice with solid foundations but a critical gap in Insurance Strategy — the area that most directly affects your reimbursements. You have financial awareness and a basic marketing presence, but you haven't negotiated your fees recently and may not fully understand your umbrella network exposure. Closing this single gap would have an outsized impact on your practice economics.",
    steps: [
      { title: "Audit your PPO contracts for umbrella network clauses", desc: "Many dentists are unknowingly in-network with plans they never signed. Call each carrier and ask which umbrella networks your contract allows them to lease your fee schedule to." },
      { title: "Negotiate your top 3 PPO plans by patient volume", desc: "Start with the plans that represent the most chair time. Even a 5–8% fee increase on your top plan can recover thousands per year without dropping any patients." },
      { title: "Get a marketing baseline before your next move", desc: "If you don't know your cost per new patient or call conversion rate, a free Marketing Strategy Meeting with Ekwa can give you that clarity in 90 minutes." },
    ],
    episodes: [
      { num: "Ep 128", title: "Creating a PPO Exit Strategy for Your Dental Practice", why: "For your Insurance Strategy gap", url: "https://www.insuranceuntangled.com/creating-a-ppo-exit-strategy-for-your-dental-practice/" },
      { num: "Ep 130", title: "Fighting the Culture of Insurance Claim Denials in Dentistry", why: "For your Insurance Strategy gap", url: "https://www.insuranceuntangled.com/fighting-the-culture-of-insurance-claim-denials-in-dentistry/" },
      { num: "Ep 121", title: "What's Happening With Out-of-Network Insurance Benefits?", why: "For your Financial Awareness score", url: "https://www.insuranceuntangled.com/whats-happening-with-out-of-network-insurance-benefits/" },
    ],
    ctaTitle: "You're closer than you think.",
    ctaSub: "Two or three targeted moves could significantly change your practice economics. Let's identify them together.",
  },
  high: {
    label: "Ready to Start",
    color: "#0EA5A0",
    tagline:
      "You are in a strong position. A strategic, phased approach to PPO reduction could begin now with the right guidance.",
    narrative:
      "Your results show a practice with strong financial awareness and operational foundations — you know your numbers, your team converts well, and you have membership plan infrastructure in place. The two areas holding you back are Insurance Strategy and Strategic Planning: you haven't yet built a written plan for how you want your insurance mix to evolve, and your marketing engine may not yet be strong enough to absorb a significant shift. These are very solvable gaps.",
    steps: [
      { title: "Rank your PPO plans by profitability", desc: "List every plan, its reimbursement rates on your top 10 procedure codes, and its patient volume. The bottom 2–3 plans are your first candidates for renegotiation or exit. Veritas can run this analysis for you." },
      { title: "Start the SEO engine now", desc: "SEO takes 3–6 months to mature. Every week you delay is a week of compounding growth you lose on the other side. Book a free session with Ekwa to see where your current online presence stands." },
      { title: "Write your 12-month insurance roadmap", desc: "A written plan — even one page — with specific dates for which plans you'll negotiate and when, dramatically increases the chance of follow-through. Schedule this as a half-day exercise with your office manager." },
    ],
    episodes: [
      { num: "Ep 129", title: "Do Dentists Really Have to Stay Trapped by PPOs?", why: "For your Strategic Planning gap", url: "https://www.insuranceuntangled.com/do-dentists-really-have-to-stay-trapped-by-ppos/" },
      { num: "Ep 128", title: "Creating a PPO Exit Strategy for Your Dental Practice", why: "For your Strategic Planning gap", url: "https://www.insuranceuntangled.com/creating-a-ppo-exit-strategy-for-your-dental-practice/" },
      { num: "Ep 125", title: "Spending Time Building Patient Relationships Reduces PPO Reliance", why: "For your Marketing Readiness score", url: "https://www.insuranceuntangled.com/spending-time-building-relationships-with-patients-can-help-you-reduce-your-dependence-on-ppos/" },
    ],
    ctaTitle: "You're ready. Let's build the plan.",
    ctaSub: "At your level, expert guidance can compress your timeline significantly. A free Marketing Strategy Meeting is your best next step.",
  },
  top: {
    label: "Ready to Accelerate",
    color: "#1E9E6B",
    tagline:
      "You have the infrastructure in place. The question is not if you should act, but how fast you can move with expert guidance.",
    narrative:
      "Your results are exceptional. You have near-perfect scores across Financial Awareness, Marketing Readiness, Operational Readiness, and Insurance Strategy — this is a practice that understands its numbers, converts patients well, has alternatives to insurance in place, and knows its contracts. The only gap is Strategic Planning: you don't yet have a written, time-bound plan. At your level of readiness, this is the one thing standing between you and meaningful action.",
    steps: [
      { title: "Build your 90-day PPO action timeline", desc: "Identify which plans to renegotiate and which to exit, in what order, with specific dates. Start with the least profitable by patient volume — this minimises disruption and builds confidence." },
      { title: "Pressure-test your marketing before you start", desc: "Before you drop or renegotiate any plans, confirm your digital presence can absorb the transition. Ekwa can give you a live analysis of your current new patient acquisition capacity in one free session." },
      { title: "Schedule a strategy call with Ben Tuinei at Veritas", desc: "At your readiness level, Ben can help you design a precise, phased strategy that protects revenue through the transition. His firm has done this for hundreds of practices and the results speak for themselves." },
    ],
    episodes: [
      { num: "Ep 137", title: "Why Doing \"More\" Isn't the Answer — Doing the Right Things Is!", why: "Directly relevant to your stage of readiness", url: "https://www.insuranceuntangled.com/why-doing-more-isnt-the-answer-doing-the-right-things-is/" },
      { num: "Ep 131", title: "How to Get Patients to Stay With Your Practice for Life", why: "As you expand your fee-for-service base", url: "https://www.insuranceuntangled.com/how-to-get-patients-to-stay-with-your-dental-practice-for-life/" },
      { num: "Ep 134", title: "Why Your Schedule Controls You and How to Change That", why: "For your Strategic Planning gap", url: "https://www.insuranceuntangled.com/why-your-schedule-controls-you-and-how-to-change-that/" },
    ],
    ctaTitle: "You're at the starting line. Let's go.",
    ctaSub: "Your practice is ready. The only missing piece is a precise execution plan — and we can help you build one.",
  },
};

function tierFromScore(score: number): TierKey {
  if (score <= 3) return "low";
  if (score <= 6) return "mid";
  if (score <= 8) return "high";
  return "top";
}

interface DimResult {
  dim: Dimension;
  total: number;
  max: number;
}

function computeDimensions(answers: Record<number, 0 | 1>): DimResult[] {
  const acc: Record<string, { total: number; max: number }> = {};
  QUESTIONS.forEach((q) => {
    if (!acc[q.dim]) acc[q.dim] = { total: 0, max: 0 };
    acc[q.dim].max += 1;
    acc[q.dim].total += answers[q.id] ?? 0;
  });
  return DIMENSION_ORDER.map((dim) => ({ dim, total: acc[dim]?.total ?? 0, max: acc[dim]?.max ?? 0 }));
}

// ── Score ring (SVG) ─────────────────────────────────────────────────────────

function ScoreRing({ score, color, size = 130 }: { score: number; color: string; size?: number }) {
  const r = size / 2 - size * 0.07;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 10) * c;
  const center = size / 2;
  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
        <circle cx={center} cy={center} r={r} fill="none" stroke="#E8E6E3" strokeWidth={size * 0.07} />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.07}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "var(--serif)", fontSize: size * 0.34, fontWeight: 900, color: "var(--navy)", lineHeight: 1 }}>
          {score}
        </div>
        <div style={{ fontSize: 10.5, color: "var(--ink-4)", fontFamily: "var(--mono)", marginTop: 2 }}>out of 10</div>
      </div>
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

type Stage = "quiz" | "results" | "sent";

export default function ScorecardClient() {
  const [stage, setStage] = useState<Stage>("quiz");
  const [answers, setAnswers] = useState<Record<number, 0 | 1>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");
  const mountedAt = useRef<number>(Date.now());

  const answeredCount = Object.keys(answers).length;
  const score = useMemo(() => Object.values(answers).reduce<number>((a, b) => a + b, 0), [answers]);
  const tierKey = tierFromScore(score);
  const tier = TIERS[tierKey];
  const dims = useMemo(() => computeDimensions(answers), [answers]);

  // Format dd MMM YYYY for the in-page report
  const completedDate = useMemo(
    () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    [stage]
  );

  function handleAnswer(id: number, value: 0 | 1) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function showResults() {
    if (answeredCount === QUESTIONS.length) {
      setStage("results");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function resetAll() {
    setAnswers({});
    setStage("quiz");
    setName("");
    setEmail("");
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const form = e.currentTarget;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - mountedAt.current < 2500) {
      setFormError("Please take a moment to fill in your details.");
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      setFormError("Please enter a valid work email address.");
      return;
    }

    setSending(true);

    // Send to Apps Script — it logs to the "PPO Scorecard" tab + sends the
    // user a personalised HTML report email + notifies the team.
    const params = new URLSearchParams();
    params.set("form_type", "ppo_scorecard");
    params.set("name", name.trim());
    params.set("email", email.trim().toLowerCase());
    params.set("score", String(score));
    params.set("tier", tier.label);
    params.set("tier_key", tierKey);
    dims.forEach((d) => params.set(`dim_${d.dim.replace(/\s+/g, "_")}`, `${d.total}/${d.max}`));
    QUESTIONS.forEach((q) => params.set(`q${q.id}`, answers[q.id] === 1 ? "Yes" : "No"));
    params.set("completed_date", completedDate);

    try {
      await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: params });
    } catch {
      /* non-blocking — still show success */
    }

    setSending(false);
    setStage("sent");
  }

  // ── QUIZ STAGE ─────────────────────────────────────────────────────────────
  if (stage === "quiz") {
    return (
      <>
        <div className="page-banner">
          <div className="container page-banner-inner">
            <div className="page-eyebrow">Free Self-Assessment</div>
            <h1 className="page-title">
              Are You Ready to Untangle Your Insurance Position?
            </h1>
            <p className="page-sub">
              10 questions. 5 minutes. A clear score that tells you exactly where your practice
              stands — and what to do next.
            </p>
            <div className="sc-hero-stats">
              <div className="sc-hero-stat">
                <div className="sc-hero-stat-num">10</div>
                <div className="sc-hero-stat-label">Questions</div>
              </div>
              <div className="sc-hero-stat">
                <div className="sc-hero-stat-num">5 min</div>
                <div className="sc-hero-stat-label">To Complete</div>
              </div>
              <div className="sc-hero-stat">
                <div className="sc-hero-stat-num">6</div>
                <div className="sc-hero-stat-label">Dimensions</div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
          <div className="container" style={{ maxWidth: "780px" }}>
            <div className="sc-progress-wrap">
              <div className="sc-progress-label">
                <span>Your Progress</span>
                <span className="sc-progress-count">
                  <strong>{answeredCount}</strong> of {QUESTIONS.length} answered
                </span>
              </div>
              <div className="sc-progress-track">
                <div
                  className="sc-progress-fill"
                  style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="sc-questions-wrap">
              {QUESTIONS.map((q) => {
                const a = answers[q.id];
                const answered = a !== undefined;
                return (
                  <div key={q.id} className={`sc-question-card${answered ? " sc-answered" : ""}`}>
                    <div className="sc-q-header">
                      <div className="sc-q-number">{q.id}</div>
                      <div className="sc-q-body">
                        <div className="sc-q-dimension">{q.dim}</div>
                        <div className="sc-q-text">{q.text}</div>
                        <div className="sc-q-options">
                          <button
                            type="button"
                            className={`sc-q-option${a === 1 ? " sc-selected-yes" : ""}`}
                            onClick={() => handleAnswer(q.id, 1)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className={`sc-q-option${a === 0 ? " sc-selected-no" : ""}`}
                            onClick={() => handleAnswer(q.id, 0)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sc-submit-wrap">
              <button
                type="button"
                className="sc-submit-btn"
                disabled={answeredCount < QUESTIONS.length}
                onClick={showResults}
              >
                See My Score
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              {answeredCount < QUESTIONS.length && (
                <div className="sc-submit-note">
                  Answer all {QUESTIONS.length} questions to see your results
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }

  // ── RESULTS / SENT STAGES ──────────────────────────────────────────────────
  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Your Results</div>
          <h1 className="page-title">
            You scored {score} out of 10.<br />
            You&apos;re {tier.label.toLowerCase()}.
          </h1>
          <p className="page-sub">
            Here&apos;s your full breakdown — including where your practice stands across 6 key
            dimensions and exactly what to prioritise next.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <div className="sc-report-card">
            {/* Score band */}
            <div className="sc-report-score">
              <ScoreRing score={score} color={tier.color} />
              <div className="sc-report-score-info">
                <div className="sc-report-rating" style={{ color: tier.color }}>
                  {tier.label}
                </div>
                <p className="sc-report-tagline">{tier.tagline}</p>
                <div className="sc-report-date">Completed {completedDate}</div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="sc-report-section">
              <div className="sc-report-section-title">Your readiness by dimension</div>
              <div>
                {dims.map((d) => {
                  const pct = d.max > 0 ? Math.round((d.total / d.max) * 100) : 0;
                  const barColor = pct === 100 ? "#1E9E6B" : pct >= 50 ? tier.color : "#E85D5D";
                  return (
                    <div key={d.dim} className="sc-dim-row">
                      <div className="sc-dim-name">{d.dim}</div>
                      <div className="sc-dim-bar-wrap">
                        <div
                          className="sc-dim-bar"
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                      <div className="sc-dim-score">
                        {d.total}/{d.max}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Narrative */}
            <div className="sc-report-narrative">
              <div className="sc-report-section-title">What your results mean</div>
              <p className="sc-narrative-text">{tier.narrative}</p>
            </div>

            {/* Next steps */}
            <div className="sc-report-section">
              <div className="sc-report-section-title">Your prioritised next steps</div>
              <div>
                {tier.steps.map((s, i) => (
                  <div key={i} className="sc-step-item">
                    <div className="sc-step-num">{i + 1}</div>
                    <div className="sc-step-body">
                      <div className="sc-step-title">{s.title}</div>
                      <div className="sc-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Episode recommendations */}
            <div className="sc-report-section">
              <div className="sc-report-section-title">Recommended episodes for your score tier</div>
              <div>
                {tier.episodes.map((ep, i) => (
                  <a
                    key={i}
                    href={ep.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sc-ep-rec"
                  >
                    <div className="sc-ep-num">{ep.num}</div>
                    <div className="sc-ep-body">
                      <div className="sc-ep-title">
                        {ep.title} <span style={{ color: "var(--teal)", fontSize: 11 }}>→</span>
                      </div>
                      <div className="sc-ep-why">{ep.why}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Email-me-the-report capture */}
            {stage === "results" && (
              <div className="sc-report-capture">
                <div className="sc-capture-grid">
                  <div className="sc-capture-copy">
                    <div className="sc-report-section-title" style={{ color: "rgba(255,255,255,.55)" }}>
                      Save your results
                    </div>
                    <h3 className="sc-capture-title">Get the full report in your inbox</h3>
                    <p className="sc-capture-sub">
                      We&apos;ll email you this personalised report — your score, dimension
                      breakdown, narrative, prioritised next steps, and matched episode picks — so
                      you can revisit and share with your team.
                    </p>
                    <ul className="sc-capture-perks">
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Your score + full dimension breakdown
                      </li>
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        3 prioritised next steps for your practice
                      </li>
                      <li>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#14C6C0" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Podcast episodes matched to your weakest areas
                      </li>
                    </ul>
                  </div>
                  <form
                    onSubmit={handleEmailSubmit}
                    noValidate
                    autoComplete="on"
                    className="sc-capture-form"
                  >
                    {/* Multi-honeypot */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                        width: 0,
                        height: 0,
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
                      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
                      <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Dr. Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                      className="sc-capture-input"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="jane@yourpractice.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="sc-capture-input"
                    />
                    {formError && <div className="sc-capture-error">{formError}</div>}
                    <button type="submit" disabled={sending} className="sc-capture-submit">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {sending ? "Sending…" : "Email Me My Report"}
                    </button>
                    <div className="sc-capture-privacy">
                      No spam. Unsubscribe any time. We respect your inbox.
                    </div>
                  </form>
                </div>
              </div>
            )}

            {stage === "sent" && (
              <div className="sc-report-capture sc-capture-success">
                <div className="sc-capture-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="sc-capture-success-title">Report sent!</div>
                <p className="sc-capture-success-sub">
                  Your personalised PPO Readiness Report is on its way from{" "}
                  <strong>support@insuranceuntangled.com</strong>. Check your spam folder if it
                  doesn&apos;t arrive in a couple of minutes.
                </p>
              </div>
            )}

            {/* Bottom CTAs (MSM + Veritas) — always visible */}
            <div className="sc-report-cta">
              <h3 className="sc-cta-title">{tier.ctaTitle}</h3>
              <p className="sc-cta-sub">{tier.ctaSub}</p>
              <div className="sc-cta-btns">
                <Link href="/dental-marketing/" className="sc-cta-primary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Book a Free Marketing Strategy Meeting
                </Link>
                <Link href="/ppo-negotiation/" className="sc-cta-secondary">
                  Talk to Veritas about PPO →
                </Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button onClick={resetAll} className="sc-retake-btn" type="button">
              Retake the Scorecard →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
