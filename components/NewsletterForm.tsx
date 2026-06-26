"use client";

import { useRef, useState } from "react";
import { postToKit } from "@/lib/kit";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";

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
  const mountedAt = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - mountedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!isValidEmail(email)) { setError("Please enter a valid email address."); return; }

    setLoading(true);
    setError("");
    const formType = source === "blog" ? "newsletter_blog" : "newsletter";
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    try {
      const params = new URLSearchParams({
        form_type: formType,
        source,
        email: cleanEmail,
        ...(cleanName && { name: cleanName }),
      });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    // Send to Kit directly from the browser — proper Origin/Referer headers
    // make Kit accept the lead cleanly (unlike Apps Script's UrlFetchApp).
    postToKit(formType, { email: cleanEmail, name: cleanName, source });
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
    <form onSubmit={handleSubmit} noValidate autoComplete="on" className={formClassName} style={{ flexDirection: "column", gap: ".55rem", position: "relative" }}>
      {/* Multi-honeypot */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
        <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
      </div>
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
