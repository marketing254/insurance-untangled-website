"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { postToKit } from "@/lib/kit";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";

type ResType = "ep-guide" | "ebook" | "tool";

interface Resource {
  id: string;
  type: ResType;
  badge: string;
  title: string;
  desc: string;
  meta: string[];
  cta: string;
  gateTitle: string;
  gateSub: string;
  gateButton: string;
  icon: "document" | "book" | "lightning" | "grid" | "list";
  // If set, the card links to this internal route instead of opening a gate
  href?: string;
  hrefCta?: string;
}

const RESOURCES: Resource[] = [
  // ── EPISODE GUIDES ───────────────────────────────────────────────────────
  {
    id: "ep-137-guide",
    type: "ep-guide",
    badge: "EPISODE GUIDE",
    title: "Ep 137: Why Doing More Isn't the Answer",
    desc: "Key takeaways, step-by-step action plan, and resources mentioned in this episode about focusing on the right activities.",
    meta: ["PDF", "1 PAGE", "EP 137"],
    cta: "Get free PDF",
    gateTitle: "Get the Episode 137 Guide",
    gateSub: "We'll email the one-pager straight to your inbox.",
    gateButton: "Send me the PDF",
    icon: "document",
  },
  {
    id: "ep-136-guide",
    type: "ep-guide",
    badge: "EPISODE GUIDE",
    title: "Ep 136: The Hidden Cost of Low PPO Fees",
    desc: "How to calculate your true cost per procedure and use that data to prioritize which plans to renegotiate first.",
    meta: ["PDF", "1 PAGE", "EP 136"],
    cta: "Get free PDF",
    gateTitle: "Get the Episode 136 Guide",
    gateSub: "We'll email the one-pager straight to your inbox.",
    gateButton: "Send me the PDF",
    icon: "document",
  },
  {
    id: "ep-135-guide",
    type: "ep-guide",
    badge: "EPISODE GUIDE",
    title: "Ep 135: Scripts That Get Patients to Say Yes",
    desc: "Word-for-word scripts your front desk can use to present treatment plans when patients push back on insurance coverage.",
    meta: ["PDF", "1 PAGE", "EP 135"],
    cta: "Get free PDF",
    gateTitle: "Get the Episode 135 Guide",
    gateSub: "We'll email the one-pager straight to your inbox.",
    gateButton: "Send me the PDF",
    icon: "document",
  },
  // ── EBOOKS ───────────────────────────────────────────────────────────────
  {
    id: "ebook-drop-worst-ppo",
    type: "ebook",
    badge: "EBOOK",
    title: "How to Drop Your Worst PPO Plan Without Losing Patients",
    desc: "The complete framework from our most popular webinar — patient communication scripts, timeline, and financial projections included.",
    meta: ["PDF", "14 PAGES", "WEBINAR"],
    cta: "Get free ebook",
    gateTitle: "Get the free ebook",
    gateSub: "14-page guide delivered straight to your inbox.",
    gateButton: "Send me the ebook",
    icon: "book",
  },
  {
    id: "ebook-marketing-playbook",
    type: "ebook",
    badge: "EBOOK",
    title: "The Dental Marketing Playbook: From Insurance-Dependent to Patient-Driven",
    desc: "A step-by-step marketing strategy built specifically for practices reducing PPO participation. SEO, Google Ads, and reputation management.",
    meta: ["PDF", "18 PAGES", "WEBINAR"],
    cta: "Get free ebook",
    gateTitle: "Get the free ebook",
    gateSub: "18-page playbook delivered straight to your inbox.",
    gateButton: "Send me the ebook",
    icon: "book",
  },
  {
    id: "ebook-membership-plans",
    type: "ebook",
    badge: "EBOOK",
    title: "Membership Plans 101: Build Recurring Revenue Outside Insurance",
    desc: "How to launch an in-house membership plan that retains uninsured patients and creates predictable monthly cash flow.",
    meta: ["PDF", "12 PAGES", "WEBINAR"],
    cta: "Get free ebook",
    gateTitle: "Get the free ebook",
    gateSub: "12-page guide delivered straight to your inbox.",
    gateButton: "Send me the ebook",
    icon: "book",
  },
  // ── TOOLS ────────────────────────────────────────────────────────────────
  {
    id: "tool-scorecard",
    type: "tool",
    badge: "TOOL",
    title: "PPO Readiness Scorecard",
    desc: "Answer 10 quick questions and get a personalised score showing how ready your practice is to renegotiate or drop PPO plans.",
    meta: ["INTERACTIVE", "2 MIN"],
    cta: "Take the scorecard",
    gateTitle: "",
    gateSub: "",
    gateButton: "",
    icon: "lightning",
    href: "/ppo-scorecard/",
    hrefCta: "Take the scorecard",
  },
  {
    id: "tool-fee-template",
    type: "tool",
    badge: "TEMPLATE",
    title: "Fee Schedule Comparison Template",
    desc: "Plug in your top 20 procedure codes across all your PPO plans and instantly see which plans are underpaying you the most.",
    meta: ["XLSX", "TEMPLATE"],
    cta: "Get template",
    gateTitle: "Get the free template",
    gateSub: "Excel spreadsheet delivered to your inbox.",
    gateButton: "Send me the template",
    icon: "grid",
  },
  {
    id: "tool-patient-scripts",
    type: "tool",
    badge: "TEMPLATE",
    title: "Patient Communication Scripts: Dropping a PPO Plan",
    desc: "Word-for-word scripts for front desk, hygienists, and doctors to communicate plan changes without losing patient trust.",
    meta: ["PDF", "3 PAGES"],
    cta: "Get scripts",
    gateTitle: "Get the free scripts",
    gateSub: "3-page PDF delivered to your inbox.",
    gateButton: "Send me the scripts",
    icon: "list",
  },
];

const FILTERS: { key: ResType | "all"; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "ep-guide", label: "Episode Guides" },
  { key: "ebook",    label: "Ebooks" },
  { key: "tool",     label: "Tools" },
];

function ResourceIcon({ type }: { type: Resource["icon"] }) {
  const common = { width: 36, height: 36, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 };
  switch (type) {
    case "document":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "lightning":
      return <svg {...common}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>;
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
  }
}

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Gate form (per card) ──────────────────────────────────────────────────
function GateForm({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!name.trim() || !email.trim()) { setError("Please fill in both fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setLoading(true);
    setError("");
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    try {
      const hp = (e.currentTarget.querySelector<HTMLInputElement>('[name="hp_field"]')?.value || "");
      const params = new URLSearchParams({
        form_type: "resource_request",
        name: cleanName,
        email: cleanEmail,
        resource_id: resource.id,
        resource_title: resource.title,
        resource_type: resource.type,
        hp_field: hp,
      });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    postToKit("resource_request", {
      email: cleanEmail,
      name: cleanName,
      resource_id: resource.id,
      resource_title: resource.title,
      resource_type: resource.type,
    });
    setDone(true);
    setLoading(false);
  }

  return (
    <div className="res-gate open" onClick={(e) => e.stopPropagation()}>
      <button className="res-gate-close" onClick={onClose} aria-label="Close">&times;</button>
      {done ? (
        <>
          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: ".75rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div className="res-gate-title">Check your inbox!</div>
          <p className="res-gate-sub">The PDF will be sent to <strong style={{ color: "#fff" }}>{email}</strong> shortly.</p>
        </>
      ) : (
        <form onSubmit={submit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Honeypot */}
          <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
          <div className="res-gate-title">{resource.gateTitle}</div>
          <p className="res-gate-sub">{resource.gateSub}</p>
          <input type="text" placeholder="Your name" value={name} required
            onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="your@practice.com" value={email} required
            onChange={(e) => setEmail(e.target.value)} />
          {error && <div style={{ fontSize: "11px", color: "#fca5a5", marginBottom: ".5rem" }}>{error}</div>}
          <button type="submit" disabled={loading} className="res-gate-btn">
            {loading ? "Sending…" : resource.gateButton}
          </button>
        </form>
      )}
    </div>
  );
}

// ── Main grid ─────────────────────────────────────────────────────────────
export default function ResourcesGrid() {
  const [activeFilter, setActiveFilter] = useState<ResType | "all">("all");
  const [gateOpen, setGateOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "all") return RESOURCES;
    return RESOURCES.filter((r) => r.type === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Filter bar */}
      <div className="res-filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`res-filter-btn${activeFilter === f.key ? " active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="res-grid">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="res-card"
            style={{ position: "relative" }}
          >
            <div className={`res-card-thumb ${r.type}`}>
              <ResourceIcon type={r.icon} />
              <span className={`res-card-badge ${r.type}`}>{r.badge}</span>
            </div>
            <div className="res-card-body">
              <div className="res-card-title">{r.title}</div>
              <p className="res-card-desc">{r.desc}</p>
              <div className="res-card-meta">
                {r.meta.map((m, i) => (
                  <span key={i}>
                    {i > 0 && <span style={{ margin: "0 .35rem" }}>•</span>}
                    {m}
                  </span>
                ))}
              </div>
              {r.href ? (
                <Link href={r.href} className="res-card-cta">
                  <ArrowIcon />
                  {r.hrefCta || r.cta}
                </Link>
              ) : (
                <button
                  type="button"
                  className="res-card-cta"
                  onClick={() => setGateOpen(r.id)}
                >
                  <DownloadIcon />
                  {r.cta}
                </button>
              )}
            </div>
            {gateOpen === r.id && (
              <GateForm
                resource={r}
                onClose={() => setGateOpen(null)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
