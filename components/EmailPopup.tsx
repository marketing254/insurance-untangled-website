"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxRI5Yq-07jqisMQTGS9uglC0EyBrAlxRzqJHl0FyL-0XUL7LhZ7TTfKRtbjqZ4MwXiHA/exec"; // Paste your deployed Apps Script URL here

const ALLOWED_PATHS = ["/", "/podcast", "/events"];

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

async function submitForm(
  data: Record<string, string>,
  formType: string
): Promise<boolean> {
  if (!FORM_ENDPOINT) {
    console.warn("Form endpoint not configured");
    return false;
  }
  // Prevent blank submissions
  const hasData = Object.values(data).some((v) => v && v.trim().length > 0);
  if (!hasData) return false;

  const params = new URLSearchParams();
  params.set("form_type", formType);
  Object.entries(data).forEach(([k, v]) => {
    if (v && v.trim()) params.set(k, v.trim());
  });
  try {
    await fetch(FORM_ENDPOINT + "?" + params.toString(), {
      method: "GET",
      mode: "no-cors",
    });
    return true;
  } catch {
    return false;
  }
}

export default function EmailPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const openedAt = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("iu_popup_dismissed") === "1") return;

    // Check if current path is allowed
    const isAllowed = ALLOWED_PATHS.some(
      (p) => pathname === p || pathname === p + "/"
    );
    if (!isAllowed) return;

    const timer = setTimeout(() => {
      // Re-check in case it was dismissed during the wait
      if (sessionStorage.getItem("iu_popup_dismissed") !== "1") {
        setOpen(true);
        openedAt.current = Date.now();
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, [pathname]);

  function handleClose() {
    setOpen(false);
    sessionStorage.setItem("iu_popup_dismissed", "1");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - openedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    await submitForm({ name: name.trim(), email: email.trim().toLowerCase() }, "email_popup");
    setSubmitting(false);
    setSubmitted(true);
    sessionStorage.setItem("iu_popup_dismissed", "1");
  }

  if (!open) return null;

  return (
    <div className={`ep-overlay${open ? " open" : ""}`}>
      <div className="ep-modal">
        <button
          className="ep-close"
          onClick={handleClose}
          aria-label="Close"
          type="button"
        >
          &#x2715;
        </button>

        {!submitted ? (
          <>
            <div className="ep-badge">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Free weekly insights
            </div>

            <h2 className="ep-title">
              Untangle dental insurance, week by week.
            </h2>

            <p className="ep-sub">
              Join thousands of dentists who get clear, actionable insurance
              intel delivered every week.
            </p>

            <div className="ep-perks">
              <div className="ep-perk">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0ea5a0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Latest episode recaps
              </div>
              <div className="ep-perk">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0ea5a0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                One actionable insurance insight per week
              </div>
              <div className="ep-perk">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0ea5a0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Webinar invitations &amp; replays
              </div>
            </div>

            <form className="ep-form" onSubmit={handleSubmit} noValidate autoComplete="on" style={{ flexDirection: "column", position: "relative" }}>
              {/* Multi-honeypot — invisible to humans, bots fill these */}
              <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
                <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
                <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
                <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
              </div>
              <input
                className="ep-input"
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
              <input
                className="ep-input"
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              {error && <div style={{ fontSize: "12px", color: "#c0392b", textAlign: "left" }}>{error}</div>}
              <button
                className="ep-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Subscribing..." : "Subscribe Free \u2192"}
              </button>
            </form>

            <p className="ep-privacy">No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <div className="ep-success">
            <div className="ep-success-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0ea5a0"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="ep-success-title">You&apos;re in!</div>
            <p className="ep-success-sub">
              Check your inbox.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
