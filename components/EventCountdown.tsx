"use client";

import { useEffect, useState } from "react";

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

/** Minimal live countdown to an ISO-8601 UTC instant. Shows a "live now" line once the event has started. */
export default function EventCountdown({ target, label }: { target: string; label?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const end = new Date(target).getTime();
  // Server render + first paint: placeholders, so there's no hydration mismatch.
  const diff = now === null ? 0 : end - now;
  if (now !== null && diff <= 0) {
    return <div className="evr-countdown-done">We&rsquo;re live now &mdash; join from your Zoom confirmation email.</div>;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const cells: [string, string][] = [
    [pad(d), "days"],
    [pad(h), "hrs"],
    [pad(m), "min"],
    [pad(s), "sec"],
  ];

  return (
    <div className="evr-countdown" role="timer" aria-live="off">
      {label && <div className="evr-countdown-label">{label}</div>}
      <ul className="evr-countdown-cells">
        {cells.map(([v, u]) => (
          <li key={u}>
            <span className="evr-countdown-num">{now === null ? "--" : v}</span>
            <span className="evr-countdown-unit">{u}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
