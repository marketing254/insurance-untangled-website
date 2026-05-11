"use client";

import { useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQYiQ18Iw1tsSibabGYqmfRhSvplUBbLCi7aICxDPGzNrE6stcv_LdOOkmVLa8DpPtlw/exec";

export default function DataDeletionForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setLoading(true);
    setError("");
    try {
      const hp = (e.currentTarget.querySelector<HTMLInputElement>('[name="hp_field"]')?.value || "");
      const params = new URLSearchParams({
        form_type: "data_deletion",
        email: email.trim(),
        name: name.trim(),
        reason: reason.trim(),
        hp_field: hp,
      });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div
        style={{
          padding: "2rem",
          background: "var(--paper-2)",
          border: "1px solid var(--paper-3)",
          borderRadius: "var(--r-lg)",
          textAlign: "center",
        }}
      >
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--green-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, marginBottom: ".5rem", color: "var(--ink)" }}>
          Request received
        </h3>
        <p style={{ fontSize: "14px", color: "var(--ink-3)", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto" }}>
          We have logged your request to delete <strong>{email}</strong> from our systems. You will receive
          a confirmation email within 7 days, and your data will be permanently removed within 30 days as
          required by GDPR and CCPA.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Honeypot */}
      <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />

      <div>
        <label htmlFor="dd-email" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
          Email to delete <span style={{ color: "#c0392b" }}>*</span>
        </label>
        <input
          id="dd-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="the@email.com you used"
          style={{ width: "100%", padding: ".75rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "14px", fontFamily: "var(--sans)", background: "#fff" }}
        />
      </div>

      <div>
        <label htmlFor="dd-name" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
          Name (optional)
        </label>
        <input
          id="dd-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Helps us find your records"
          style={{ width: "100%", padding: ".75rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "14px", fontFamily: "var(--sans)", background: "#fff" }}
        />
      </div>

      <div>
        <label htmlFor="dd-reason" style={{ display: "block", fontFamily: "var(--mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--steel)", marginBottom: ".4rem" }}>
          Reason (optional)
        </label>
        <textarea
          id="dd-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="No reason required by law — but it helps us improve."
          style={{ width: "100%", padding: ".75rem 1rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "14px", fontFamily: "var(--sans)", background: "#fff", resize: "vertical" }}
        />
      </div>

      {error && (
        <div style={{ fontSize: "13px", color: "#c0392b", padding: ".5rem .75rem", background: "#fff0f0", borderRadius: "var(--r)", border: "1px solid #f5c6cb" }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "14.5px" }}
      >
        {loading ? "Submitting…" : "Submit Deletion Request"}
      </button>

      <p style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--ink-4)", lineHeight: 1.6, textAlign: "center" }}>
        Your data will be deleted within 30 days. We will email you to confirm.
      </p>
    </form>
  );
}
