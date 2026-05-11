"use client";

import { useState } from "react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQYiQ18Iw1tsSibabGYqmfRhSvplUBbLCi7aICxDPGzNrE6stcv_LdOOkmVLa8DpPtlw/exec";

interface Props {
  source?: "homepage" | "blog" | "popup";
  formClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export default function NewsletterForm({
  source = "homepage",
  formClassName,
  inputClassName = "h2-nl-input",
  buttonClassName = "h2-nl-submit",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        form_type: "newsletter",
        source,
        email: email.trim(),
        hp_field: "",
        ...(name.trim() && { name: name.trim() }),
      });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div style={{ fontFamily: "var(--mono)", fontSize: "12px", color: "var(--teal)", letterSpacing: ".06em", padding: ".65rem 0" }}>
        ✓ You&apos;re subscribed — talk soon!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formClassName} style={{ flexDirection: "column", gap: ".55rem" }}>
      {/* Honeypot */}
      <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClassName}
        id={`nl-${source}-name`}
      />
      <div style={{ display: "flex", gap: ".5rem" }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
          style={{ flex: 1 }}
          required
          id={`nl-${source}-email`}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={loading}
          className={buttonClassName}
        >
          {loading ? "…" : "Subscribe"}
        </button>
      </div>
      {error && <div style={{ fontSize: "11.5px", color: "#f87171" }}>{error}</div>}
    </form>
  );
}
