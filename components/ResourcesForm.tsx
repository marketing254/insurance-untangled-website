"use client";

import { useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxcLEGqzCFAm55kZXMH4zwb4iheOgfMmEPuMHxNGvFETz-fvJd2bhKMXLW-Rq8YPqSfcw/exec";

export default function ResourcesForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [practice, setPractice] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }

    setLoading(true);
    setError("");
    try {
      const hp = (e.currentTarget.querySelector<HTMLInputElement>('[name="hp_field"]')?.value || "");
      const params = new URLSearchParams({
        form_type: "resource_request",
        name: name.trim(),
        email: email.trim(),
        practice: practice.trim(),
        hp_field: hp,
      });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    setSubmitted(true);
    setLoading(false);
  }

  // ── SUCCESS STATE ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid var(--paper-3)",
          borderRadius: "var(--r-lg)",
          padding: "3rem 2.5rem",
          textAlign: "center",
          boxShadow: "0 12px 36px rgba(11,37,69,.08)",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            background: "linear-gradient(135deg, var(--teal) 0%, var(--teal-lt) 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 12px 32px rgba(14,165,160,.32)",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="page-eyebrow" style={{ justifyContent: "center", color: "var(--teal)" }}>
          Request received
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.85rem", fontWeight: 800, color: "var(--ink)", marginBottom: "1rem", lineHeight: 1.2 }}>
          Thanks, {name.split(" ")[0]}!
        </h2>
        <p style={{ fontSize: "16px", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: "440px", margin: "0 auto 1.5rem" }}>
          The PDF will be sent to{" "}
          <strong style={{ color: "var(--ink)" }}>{email}</strong> shortly.
          Please check your inbox (and the spam folder, just in case).
        </p>
        <div style={{ padding: "1rem 1.25rem", background: "var(--paper-2)", borderRadius: "var(--r)", border: "1px solid var(--paper-3)", display: "inline-flex", alignItems: "center", gap: ".65rem", fontSize: "13px", color: "var(--ink-3)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          Most emails arrive within 5 minutes
        </div>
      </div>
    );
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        border: "1px solid var(--paper-3)",
        borderRadius: "var(--r-lg)",
        padding: "2.25rem 2rem",
        boxShadow: "0 12px 36px rgba(11,37,69,.08)",
      }}
    >
      {/* Honeypot — invisible to humans, bots fill it */}
      <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />

      <div className="page-eyebrow" style={{ color: "var(--teal)", marginBottom: ".5rem" }}>
        Free download
      </div>
      <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.55rem", fontWeight: 800, color: "var(--ink)", marginBottom: ".55rem", lineHeight: 1.25 }}>
        Get the resource pack delivered to your inbox
      </h2>
      <p style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
        Drop your details below — we&rsquo;ll email you the PDF guides and tools immediately. No spam, no funnels.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="r-name" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
            Your name <span style={{ color: "#c0392b" }}>*</span>
          </label>
          <input
            id="r-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Dr. Jane Smith"
            style={{ width: "100%", padding: ".8rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "15px", fontFamily: "var(--sans)", background: "#fff" }}
          />
        </div>
        <div>
          <label htmlFor="r-email" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
            Email address <span style={{ color: "#c0392b" }}>*</span>
          </label>
          <input
            id="r-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@yourpractice.com"
            style={{ width: "100%", padding: ".8rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "15px", fontFamily: "var(--sans)", background: "#fff" }}
          />
        </div>
        <div>
          <label htmlFor="r-practice" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
            Practice name <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="r-practice"
            type="text"
            value={practice}
            onChange={(e) => setPractice(e.target.value)}
            placeholder="Smith Family Dentistry"
            style={{ width: "100%", padding: ".8rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "15px", fontFamily: "var(--sans)", background: "#fff" }}
          />
        </div>

        {error && (
          <div style={{ fontSize: "13px", color: "#c0392b", padding: ".55rem .85rem", background: "#fff0f0", borderRadius: "var(--r)", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "1rem",
            background: "var(--teal)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--r)",
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "15px",
            cursor: loading ? "wait" : "pointer",
            transition: "background .18s, transform .15s",
          }}
        >
          {loading ? "Sending…" : "Send Me the PDF →"}
        </button>

        <p style={{ fontFamily: "var(--mono)", fontSize: "10.5px", color: "var(--ink-4)", letterSpacing: ".06em", textAlign: "center", marginTop: ".25rem" }}>
          No spam · Unsubscribe anytime · Your email is never shared
        </p>
      </div>
    </form>
  );
}
