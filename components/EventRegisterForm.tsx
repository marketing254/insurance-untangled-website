"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zoom webinar registration form.
 * Posts JSON to the IU Zoom Registrations Apps Script (data/iu-zoom-registrations.gs),
 * which appends the row to the per-event tab and forwards it to n8n → Zoom.
 * The page never talks to Zoom directly; routing is resolved from `eventKey`
 * in the sheet's "Events Config" tab.
 *
 * After deploying the Apps Script, paste its /exec URL below.
 */
const ZOOM_REG_ENDPOINT = "https://script.google.com/macros/s/AKfycby1CYAbclHmhpq11tvZBR5EpdSkXBrcV4qP0e5SHpnt5H_ic2kEGwLlaHm6U6O_rE6z/exec";

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
  return !DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

/** Must match the answer list of the Zoom "Job title" registration question exactly. */
const JOB_TITLES = ["Practice Owner","Office Manager","Associate Dentist","Hygienist","Team Member","Front Desk","Other Roles","Consultant/Coach"];

/** Accepts "N/A", "NA", "none", or a practice name (no dots, letters only) for people without a website. */
function isNotApplicable(v: string) {
  const t = v.trim();
  return /^(n\/?a|none|not applicable)$/i.test(t) || (t.length >= 2 && !/[.\/]/.test(t));
}

function isValidWebsite(value: string): boolean {
  // Accept bare domains and full URLs; reject strings with no dot or with spaces.
  return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(value.trim());
}

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia", "New Zealand", "Other"];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  practiceWebsite: string;
  country: string;
  question: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  practiceWebsite: "",
  country: "",
  question: "",
};

export default function EventRegisterForm({
  eventKey,
  eventTitle,
}: {
  eventKey: string;
  eventTitle: string;
}) {
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const mountedAt = useRef<number>(Date.now());
  const sourceId = useRef<string>("");

  // Tracking links are /events/oct-22/?s=<zoom tracking source id>
  useEffect(() => {
    try {
      const s = new URLSearchParams(window.location.search).get("s") || "";
      sourceId.current = s.replace(/[^0-9A-Za-z_-]/g, "").slice(0, 64);
    } catch {
      /* ignore */
    }
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - mountedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    const d = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      jobTitle: data.jobTitle.trim(),
      practiceWebsite: data.practiceWebsite.trim(),
      country: data.country,
      question: data.question.trim(),
    };

    if (!d.firstName || !d.lastName || !d.email || !d.phone || !d.jobTitle || !d.practiceWebsite || !d.country || !d.question) {
      setError("All fields are required.");
      return;
    }
    if (!isValidEmail(d.email)) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (d.phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!isNotApplicable(d.practiceWebsite) && !isValidWebsite(d.practiceWebsite)) {
      setError("Please enter your practice website (e.g. yourpractice.com) or N/A.");
      return;
    }

    setSubmitting(true);

    const payload = {
      event_key: eventKey,
      first_name: d.firstName,
      last_name: d.lastName,
      email: d.email,
      phone: d.phone,
      job_title: d.jobTitle.slice(0, 128),
      practice_website: d.practiceWebsite.slice(0, 128),
      country: d.country,
      question: d.question.slice(0, 500),
      source_id: sourceId.current,
      source_name: "",
    };

    try {
      // text/plain avoids a CORS preflight; Apps Script still parses the JSON body.
      // no-cors returns an opaque response, so success is shown optimistically —
      // the sheet row is the source of truth.
      await fetch(ZOOM_REG_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email support@insuranceuntangled.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="guest-form-wrap evr-form" id="register" style={{ textAlign: "center" }}>
        <div className="evr-success-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a7a52" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="evr-form-title">You&rsquo;re registered!</h2>
        <p className="evr-form-sub" style={{ margin: 0 }}>
          Check your inbox for the Zoom joining link for <strong>{eventTitle}</strong>. The replay and CE
          details are sent to everyone who registers.
        </p>
      </div>
    );
  }

  return (
    <div className="guest-form-wrap evr-form" id="register">
      <div className="guest-form-badge">FREE &middot; 1 CE CREDIT &middot; LIVE ON ZOOM</div>
      <h2 className="evr-form-title">Reserve your seat</h2>
      <p className="evr-form-sub">
        All fields are required. Your Zoom link arrives by email the moment you register.
      </p>

      <form onSubmit={handleSubmit} noValidate autoComplete="on" style={{ position: "relative" }}>
        {/* Multi-honeypot — invisible to humans, bots fill these */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
          <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        </div>

        <div className="guest-field-row">
          <div className="guest-field">
            <label htmlFor="ev-first">First name *</label>
            <input id="ev-first" name="ev-first" type="text" required autoComplete="given-name"
              value={data.firstName} onChange={(e) => update("firstName", e.target.value)} />
          </div>
          <div className="guest-field">
            <label htmlFor="ev-last">Last name *</label>
            <input id="ev-last" name="ev-last" type="text" required autoComplete="family-name"
              value={data.lastName} onChange={(e) => update("lastName", e.target.value)} />
          </div>
        </div>

        <div className="guest-field">
          <label htmlFor="ev-email">Email *</label>
          <input id="ev-email" name="ev-email" type="email" required autoComplete="email" placeholder="you@yourpractice.com"
            value={data.email} onChange={(e) => update("email", e.target.value)} />
        </div>

        <div className="guest-field-row">
          <div className="guest-field">
            <label htmlFor="ev-phone">Phone *</label>
            <input id="ev-phone" name="ev-phone" type="tel" required autoComplete="tel" placeholder="(555) 000-0000"
              value={data.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div className="guest-field">
            <label htmlFor="ev-title">Job title *</label>
            <select id="ev-title" name="ev-title" required autoComplete="organization-title"
              value={data.jobTitle} onChange={(e) => update("jobTitle", e.target.value)}>
              <option value="" disabled>Select your role</option>
              {JOB_TITLES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="guest-field-row">
          <div className="guest-field">
            <label htmlFor="ev-site">Practice name or website *</label>
            <input id="ev-site" name="ev-site" type="text" required inputMode="url" autoComplete="url" placeholder="yourpractice.com or N/A"
              value={data.practiceWebsite} onChange={(e) => update("practiceWebsite", e.target.value)} />
          </div>
          <div className="guest-field">
            <label htmlFor="ev-country">Country *</label>
            <select id="ev-country" name="ev-country" required autoComplete="country-name"
              value={data.country} onChange={(e) => update("country", e.target.value)}>
              <option value="" disabled>Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="guest-field">
          <label htmlFor="ev-question">What question would you like the speakers to address? *</label>
          <textarea id="ev-question" name="ev-question" rows={3} required maxLength={500}
            placeholder="e.g. How do I know which PPO contracts are worth renegotiating first?"
            value={data.question} onChange={(e) => update("question", e.target.value)} />
        </div>

        {error && (
          <div role="alert" style={{ color: "#c0392b", fontSize: "13px", margin: ".5rem 0 .25rem", fontWeight: 500, padding: ".5rem .75rem", background: "#fff0f0", borderRadius: "5px", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}

        <button type="submit" className="guest-submit-btn" disabled={submitting}>
          {submitting ? "Registering..." : "Register Free →"}
        </button>
        <p className="evr-form-fine">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your details go straight to Zoom for your joining link. No spam, ever.
        </p>
      </form>
    </div>
  );
}
