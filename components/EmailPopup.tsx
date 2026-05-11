"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyQYiQ18Iw1tsSibabGYqmfRhSvplUBbLCi7aICxDPGzNrE6stcv_LdOOkmVLa8DpPtlw/exec"; // Paste your deployed Apps Script URL here

const ALLOWED_PATHS = ["/", "/podcast", "/events"];

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
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    const hp = (e.currentTarget.querySelector<HTMLInputElement>('[name="hp_field"]')?.value || "");
    await submitForm({ name: name.trim(), email: email.trim(), hp_field: hp }, "email_popup");
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

            <form className="ep-form" onSubmit={handleSubmit} style={{ flexDirection: "column" }}>
              {/* Honeypot — invisible to humans, bots fill it */}
              <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
              <input
                className="ep-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="ep-input"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
