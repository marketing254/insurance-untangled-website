"use client";

import { useState } from "react";

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyQYiQ18Iw1tsSibabGYqmfRhSvplUBbLCi7aICxDPGzNrE6stcv_LdOOkmVLa8DpPtlw/exec";

type FormState = {
  firstName: string;
  lastName: string;
  title: string;
  firm: string;
  email: string;
  phone: string;
  applyAs: string;
  topic: string;
  bio: string;
  links: string;
};

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  title: "",
  firm: "",
  email: "",
  phone: "",
  applyAs: "",
  topic: "",
  bio: "",
  links: "",
};

export default function GuestForm() {
  const [data, setData] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.title.trim() ||
      !data.firm.trim() ||
      !data.email.trim() ||
      !data.applyAs ||
      !data.topic ||
      !data.bio.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    const hp = (e.currentTarget.querySelector<HTMLInputElement>('[name="hp_field"]')?.value || "");
    const params = new URLSearchParams();
    params.set("form_type", "guest");
    params.set("hp_field", hp);
    params.set("firstName", data.firstName.trim());
    params.set("lastName", data.lastName.trim());
    params.set("title", data.title.trim());
    params.set("firm", data.firm.trim());
    params.set("email", data.email.trim());
    if (data.phone.trim()) params.set("phone", data.phone.trim());
    params.set("applyAs", data.applyAs);
    params.set("topic", data.topic);
    params.set("bio", data.bio.trim());
    if (data.links.trim()) params.set("links", data.links.trim());

    try {
      await fetch(FORM_ENDPOINT + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try again or email us directly at support@insuranceuntangled.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="guest-form-wrap" style={{ textAlign: "center" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "var(--green-pale)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a7a52"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--navy)",
            margin: "0 0 .5rem",
          }}
        >
          Application received!
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--ink-3)",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Thanks for your interest in joining Insurance Untangled. Our team reviews every
          application within 3 business days &mdash; we&apos;ll be in touch soon at the email you
          provided.
        </p>
      </div>
    );
  }

  return (
    <div className="guest-form-wrap">
      <div className="guest-form-badge">&#128293; APPLY NOW &mdash; OPEN SPOTS AVAILABLE</div>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--navy)",
          margin: ".75rem 0 .25rem",
        }}
      >
        Apply as a Guest or Speaker
      </h2>
      <p
        style={{
          fontSize: ".85rem",
          color: "var(--ink-3)",
          lineHeight: 1.55,
          margin: "0 0 1.25rem",
        }}
      >
        Tell us about yourself and what you&apos;d like to share. We review all applications within
        3 business days.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — invisible to humans, bots fill it; server discards if filled */}
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
        <div className="guest-field-row">
          <div className="guest-field">
            <label htmlFor="gf-first">First Name *</label>
            <input
              id="gf-first"
              name="gf-first"
              type="text"
              required
              value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div className="guest-field">
            <label htmlFor="gf-last">Last Name *</label>
            <input
              id="gf-last"
              name="gf-last"
              type="text"
              required
              value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="guest-field">
          <label htmlFor="gf-title">Professional Title / Designation *</label>
          <input
            id="gf-title"
            name="gf-title"
            type="text"
            required
            placeholder="e.g. Practice Owner, Dental Consultant"
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="guest-field">
          <label htmlFor="gf-firm">Firm / Organization *</label>
          <input
            id="gf-firm"
            name="gf-firm"
            type="text"
            required
            placeholder="e.g. Carter Dental Group"
            value={data.firm}
            onChange={(e) => update("firm", e.target.value)}
          />
        </div>

        <div className="guest-field">
          <label htmlFor="gf-email">Email Address *</label>
          <input
            id="gf-email"
            name="gf-email"
            type="email"
            required
            placeholder="john@carterdental.com"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        <div className="guest-field">
          <label htmlFor="gf-phone">Phone Number</label>
          <input
            id="gf-phone"
            name="gf-phone"
            type="tel"
            placeholder="(555) 000-0000"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div className="guest-field">
          <label htmlFor="gf-applyas">I&apos;m applying as a *</label>
          <select
            id="gf-applyas"
            name="gf-applyas"
            required
            value={data.applyAs}
            onChange={(e) => update("applyAs", e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="Podcast Guest">Podcast Guest</option>
            <option value="Webinar Speaker">Webinar Speaker</option>
            <option value="Both">Both</option>
          </select>
        </div>

        <div className="guest-field">
          <label htmlFor="gf-topic">Proposed Topic / Area of Expertise *</label>
          <select
            id="gf-topic"
            name="gf-topic"
            required
            value={data.topic}
            onChange={(e) => update("topic", e.target.value)}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="PPO Negotiations & Fee Schedules">
              PPO Negotiations &amp; Fee Schedules
            </option>
            <option value="Dental Marketing & Patient Acquisition">
              Dental Marketing &amp; Patient Acquisition
            </option>
            <option value="Insurance Strategy & Credentialing">
              Insurance Strategy &amp; Credentialing
            </option>
            <option value="Practice Management & Growth">Practice Management &amp; Growth</option>
            <option value="Dental Technology & Innovation">
              Dental Technology &amp; Innovation
            </option>
            <option value="Leadership & Team Building">Leadership &amp; Team Building</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="guest-field">
          <label htmlFor="gf-bio">Brief Bio / Why You? *</label>
          <textarea
            id="gf-bio"
            name="gf-bio"
            rows={4}
            required
            placeholder="Tell us about your background, what makes you a great guest, and what value you'll bring to our dental audience..."
            value={data.bio}
            onChange={(e) => update("bio", e.target.value)}
          />
        </div>

        <div className="guest-field">
          <label htmlFor="gf-links">Website / LinkedIn / Social Profiles</label>
          <input
            id="gf-links"
            name="gf-links"
            type="url"
            placeholder="https://"
            value={data.links}
            onChange={(e) => update("links", e.target.value)}
          />
        </div>

        {error && (
          <div
            style={{
              color: "#c0392b",
              fontSize: "13px",
              margin: ".5rem 0 .25rem",
              fontWeight: 500,
              padding: ".5rem .75rem",
              background: "#fff0f0",
              borderRadius: "5px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="guest-submit-btn" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit My Application →"}
        </button>
      </form>
    </div>
  );
}
