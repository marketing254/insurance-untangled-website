"use client";

import { useState } from "react";

const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxcLEGqzCFAm55kZXMH4zwb4iheOgfMmEPuMHxNGvFETz-fvJd2bhKMXLW-Rq8YPqSfcw/exec";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("cf-name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("cf-email") as HTMLInputElement).value.trim();
    const practice = (form.elements.namedItem("cf-practice") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("cf-message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    const hp = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const params = new URLSearchParams();
    params.set("form_type", "contact");
    params.set("name", name);
    params.set("email", email);
    if (practice) params.set("practice", practice);
    params.set("message", message);
    params.set("hp_field", hp);

    try {
      await fetch(FORM_ENDPOINT + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors",
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-form" style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <div style={{ width: "56px", height: "56px", background: "var(--green-pale)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1a7a52" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: ".5rem" }}>Message sent!</div>
        <p style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: 1.65 }}>Thanks for reaching out. We&apos;ll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <div className="contact-form reveal-left">
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1.5rem" }}>Send us a message</h2>
      <form onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans, bots fill it */}
        <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
        <div className="form-group">
          <label className="form-label" htmlFor="cf-name">Your name <span style={{ color: "#c0392b" }}>*</span></label>
          <input id="cf-name" name="cf-name" className="form-input" type="text" placeholder="Dr. Jane Smith" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-email">Email address <span style={{ color: "#c0392b" }}>*</span></label>
          <input id="cf-email" name="cf-email" className="form-input" type="email" placeholder="jane@yourpractice.com" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-practice">Practice name</label>
          <input id="cf-practice" name="cf-practice" className="form-input" type="text" placeholder="Smith Family Dentistry" />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-message">How can we help? <span style={{ color: "#c0392b" }}>*</span></label>
          <textarea id="cf-message" name="cf-message" className="form-textarea" placeholder="Tell us about your practice and what you're looking for..." required></textarea>
        </div>
        {error && (
          <div style={{ color: "#c0392b", fontSize: "13px", marginBottom: ".75rem", fontWeight: 500, padding: ".5rem .75rem", background: "#fff0f0", borderRadius: "5px", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}
        <button className="btn-primary" type="submit" disabled={submitting} style={{ width: "100%", justifyContent: "center" }}>
          <span>{submitting ? "Sending..." : "Send Message \u2192"}</span>
        </button>
        <p style={{ fontSize: "12px", color: "var(--ink-4)", marginTop: ".75rem", textAlign: "center" }}>We typically respond within 1 business day.</p>
      </form>
    </div>
  );
}
