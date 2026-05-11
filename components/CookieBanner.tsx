"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("iu_cookie_consent")) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept(level: "essential" | "all") {
    localStorage.setItem("iu_cookie_consent", level);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#0B2545",
        borderTop: "1px solid rgba(255,255,255,.12)",
        padding: "1rem 2rem",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "260px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: ".25rem" }}>
            We use cookies
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,.5)", lineHeight: 1.55 }}>
            We use essential cookies to make our site work, and optional analytics cookies to understand how you use it. No personal data is sold.{" "}
            <Link href="/cookies/" style={{ color: "rgba(168,196,228,.7)", textDecoration: "underline" }}>
              Learn more
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexShrink: 0 }}>
          <button
            onClick={() => accept("essential")}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,.25)",
              color: "rgba(255,255,255,.6)",
              borderRadius: "6px",
              padding: ".5rem 1rem",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Essential only
          </button>
          <button
            onClick={() => accept("all")}
            style={{
              background: "#0EA5A0",
              border: "none",
              color: "#fff",
              borderRadius: "6px",
              padding: ".5rem 1.1rem",
              fontFamily: "inherit",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
