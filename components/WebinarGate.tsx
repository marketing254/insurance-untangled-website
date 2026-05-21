"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const GATE_KEY = "iu_podcast_unlocked";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";

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

interface WebinarGateProps {
  title: string;
  vimeoUrl: string;
  children: React.ReactNode;
}

function vimeoEmbedUrl(url: string): string {
  const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
  if (id) return `https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0`;
  if (url.includes("player.vimeo.com")) return url;
  return url;
}

function ReplayGateOverlay({ title, onUnlock }: { title: string; onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const mountedAt = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget as HTMLFormElement;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - mountedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid work email address.");
      return;
    }

    setSubmitting(true);
    try {
      const params = new URLSearchParams();
      params.set("form_type", "webinar_access");
      params.set("name", name.trim());
      params.set("email", email.trim().toLowerCase());
      params.set("webinar_title", title);
      params.set("source", "replay_page");
      await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: params });
      localStorage.setItem(GATE_KEY, "1");
      onUnlock();
    } catch {
      localStorage.setItem(GATE_KEY, "1");
      onUnlock();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, rgba(11,37,69,.96), rgba(20,57,98,.96))",
        padding: "1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "460px", textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-lt)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.35rem", fontWeight: 800, color: "#fff", marginBottom: ".5rem", lineHeight: 1.3 }}>
          Watch the full replay
        </h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,.65)", marginBottom: "1.25rem", lineHeight: 1.55 }}>
          Enter your details once to unlock every webinar replay. Quick, free, no spam.
        </p>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
            <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
            <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: ".6rem", marginBottom: ".75rem" }}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              style={{ padding: ".75rem .95rem", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", borderRadius: "8px", color: "#fff", fontSize: "13px", fontFamily: "var(--sans)" }}
            />
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{ padding: ".75rem .95rem", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", borderRadius: "8px", color: "#fff", fontSize: "13px", fontFamily: "var(--sans)" }}
            />
          </div>
          {error && (
            <div style={{ fontSize: "12px", color: "#ffb4b4", marginBottom: ".6rem" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn-teal"
            style={{ width: "100%", justifyContent: "center", fontSize: "13px", opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? "Unlocking..." : "Unlock & Watch"}
          </button>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,.4)", marginTop: ".75rem", lineHeight: 1.5 }}>
            We respect your privacy. Read our <Link href="/privacy/" style={{ color: "rgba(255,255,255,.55)", textDecoration: "underline" }}>privacy policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function WebinarGate({ title, vimeoUrl, children }: WebinarGateProps) {
  const [unlocked, setUnlocked] = useState(false);

  // Player-only gate — page content (title, description, key takeaways)
  // stays visible to crawlers + direct-link visitors. Only the iframe is gated.
  useEffect(() => {
    setUnlocked(!!localStorage.getItem(GATE_KEY));
  }, []);

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "var(--r-xl, 18px)",
          overflow: "hidden",
          background: "#000",
          boxShadow: "0 20px 50px rgba(11,37,69,.18)",
        }}
      >
        {unlocked ? (
          <iframe
            src={vimeoEmbedUrl(vimeoUrl)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        ) : (
          <ReplayGateOverlay title={title} onUnlock={() => setUnlocked(true)} />
        )}
      </div>
      {children}
    </div>
  );
}
