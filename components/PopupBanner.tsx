"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PopupBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("iu_home_popup_seen")) return;

    let shown = false;
    const show = () => {
      if (shown || sessionStorage.getItem("iu_home_popup_seen") === "1") return;
      shown = true;
      sessionStorage.setItem("iu_home_popup_seen", "1");
      setVisible(true);
    };

    // 1. Desktop exit-intent — mouse leaves viewport from the top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && e.relatedTarget === null) show();
    };

    // 2. Mobile/tablet fallback — user scrolls past 50% of page (closest analog
    //    to "about to leave" on touch devices where mouseleave doesn't fire)
    let scrolledPast = false;
    const onScroll = () => {
      if (scrolledPast) return;
      const scrollPct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPct > 0.5) {
        scrolledPast = true;
        show();
      }
    };

    // 3. Hard fallback after 90 seconds of engagement (was 6s timer)
    const idleTimer = setTimeout(show, 90000);

    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9997,
        background: "rgba(11,25,55,.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "popupFadeIn .3s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <style>{`@keyframes popupFadeIn{from{opacity:0}to{opacity:1}}@keyframes epSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          maxWidth: "520px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(11,25,55,.28)",
          animation: "epSlideUp .4s cubic-bezier(.22,.8,.3,1)",
        }}
      >
        {/* Dark accent top */}
        <div style={{
          background: "linear-gradient(135deg,#0B2545,#1B3060)",
          padding: "2rem 2rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", background: "radial-gradient(circle,rgba(14,165,160,.2),transparent 70%)" }}></div>
          <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(14,198,192,.8)", marginBottom: ".6rem", position: "relative", zIndex: 1 }}>Free Resource</div>
          <div style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, position: "relative", zIndex: 1 }}>
            Get Your Free PPO<br />Readiness Scorecard
          </div>
          <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,.6)", marginTop: ".6rem", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
            Discover exactly where your practice stands &mdash; and what to do first.
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(255,255,255,.15)",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            zIndex: 10,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Bottom white section */}
        <div style={{ padding: "1.75rem 2rem 2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: ".55rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".55rem", fontSize: "13.5px", color: "var(--ink-2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              10 quick questions &mdash; under 2 minutes
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".55rem", fontSize: "13.5px", color: "var(--ink-2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Personalised score across 6 dimensions
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: ".55rem", fontSize: "13.5px", color: "var(--ink-2)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EA5A0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Free report delivered to your inbox after you finish
            </div>
          </div>
          <Link
            href="/ppo-scorecard"
            onClick={dismiss}
            style={{
              display: "block",
              width: "100%",
              background: "linear-gradient(135deg,#0EA5A0,#0C8C87)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: ".95rem",
              fontFamily: "var(--sans)",
              fontSize: "15px",
              fontWeight: 700,
              textAlign: "center",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(14,165,160,.3)",
              marginBottom: ".75rem",
            }}
          >
            Take the Free Scorecard &rarr;
          </Link>
          <div style={{ textAlign: "center", fontSize: "12px", color: "var(--ink-4)" }}>
            Answer 10 questions &bull; Get your score &bull; Report sent to your inbox
          </div>
          <button
            onClick={dismiss}
            style={{
              display: "block",
              width: "100%",
              background: "none",
              border: "none",
              fontFamily: "var(--sans)",
              fontSize: "12.5px",
              color: "var(--ink-4)",
              cursor: "pointer",
              marginTop: ".6rem",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            No thanks, I wanna miss out
          </button>
        </div>
      </div>
    </div>
  );
}
