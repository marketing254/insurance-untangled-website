"use client";

import { useRef, useState } from "react";
import { postToKit } from "@/lib/kit";

const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";

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

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const mountedAt = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;

    // Multi-honeypot check
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    // Time trap — block submissions faster than 2.5s after form mount
    if (Date.now() - mountedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    const name = (form.elements.namedItem("cf-name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("cf-email") as HTMLInputElement).value.trim();
    const practice = (form.elements.namedItem("cf-practice") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("cf-message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid work email address.");
      return;
    }

    if (message.length < 10) {
      setError("Please share a bit more about how we can help.");
      return;
    }

    setSubmitting(true);

    const params = new URLSearchParams();
    params.set("form_type", "contact");
    params.set("name", name);
    params.set("email", email.toLowerCase());
    if (practice) params.set("practice", practice);
    params.set("message", message);

    try {
      await fetch(FORM_ENDPOINT + "?" + params.toString(), {
        method: "GET",
        mode: "no-cors",
      });
      postToKit("contact", { email: email.toLowerCase(), name, practice, message });
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
      <form onSubmit={handleSubmit} noValidate autoComplete="on" style={{ position: "relative" }}>
        {/* Multi-honeypot: three decoy fields with conventional names */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
          <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        </div>
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
