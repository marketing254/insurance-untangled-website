"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchSheetClient } from "@/lib/sheets-client";

const GATE_KEY = "iu_podcast_unlocked";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyQYiQ18Iw1tsSibabGYqmfRhSvplUBbLCi7aICxDPGzNrE6stcv_LdOOkmVLa8DpPtlw/exec";

// Shared inline gate form for webinar cards
function WebinarGateForm({ title, onUnlock }: { title: string; onUnlock: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!name.trim() || !email.trim()) { setError("Please fill in both fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ form_type: "webinar_access", name: name.trim(), email: email.trim(), webinar_title: title, hp_field: "" });
      await fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors" });
    } catch { /* non-blocking */ }
    localStorage.setItem(GATE_KEY, "1");
    onUnlock();
  };

  return (
    <form onSubmit={submit} onClick={stop} style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: ".55rem" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)" }}>
        Free CE webinar access
      </div>
      <input type="text" placeholder="Your name" value={name} required onClick={stop}
        onChange={(e) => { stop(e); setName(e.target.value); }}
        style={{ padding: ".5rem .7rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "12.5px", fontFamily: "var(--sans)", background: "#fff" }} />
      <input type="email" placeholder="your@email.com" value={email} required onClick={stop}
        onChange={(e) => { stop(e); setEmail(e.target.value); }}
        style={{ padding: ".5rem .7rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "12.5px", fontFamily: "var(--sans)", background: "#fff" }} />
      {/* Honeypot */}
      <input type="text" name="hp_field" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }} />
      {error && <div style={{ fontSize: "11px", color: "#c0392b" }}>{error}</div>}
      <button type="submit" disabled={loading} onClick={stop}
        style={{ padding: ".55rem", background: "var(--teal)", color: "#fff", border: "none", borderRadius: "var(--r)", fontFamily: "var(--sans)", fontWeight: 700, fontSize: "12.5px", cursor: loading ? "wait" : "pointer" }}>
        {loading ? "Unlocking…" : "Watch Replay →"}
      </button>
      <div style={{ fontFamily: "var(--mono)", fontSize: "9px", color: "var(--ink-4)", textAlign: "center" }}>No spam. Unsubscribe anytime.</div>
    </form>
  );
}

interface EventRow {
  date_iso: string;
  day: string;
  month_year: string;
  time: string;
  title: string;
  description: string;
  register_url: string;
  Panelists: string;
}

interface WebinarRow {
  date_iso: string;
  month_year: string;
  title: string;
  "description - Key notes": string;
  webinar_url: string;
  image_url: string;
}

function webinarSlug(w: WebinarRow): string {
  return w.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
}

export function UpcomingEvents({ initialEvents }: { initialEvents: EventRow[] }) {
  const [events, setEvents] = useState<EventRow[]>(initialEvents);

  useEffect(() => {
    fetchSheetClient('events').then((rows) => {
      const all = rows.filter((r) => {
        if (!r.title || !r.date_iso) return false;
        const firstCol = Object.values(r)[0];
        if (firstCol === 'EXAMPLE') return false;
        return true;
      }) as unknown as EventRow[];
      // Sort: upcoming first (ascending), then past events (descending - most recent past first)
      const today = new Date().toISOString().split('T')[0];
      const upcoming = all
        .filter((e) => e.date_iso >= today)
        .sort((a, b) => a.date_iso.localeCompare(b.date_iso));
      const past = all
        .filter((e) => e.date_iso < today)
        .sort((a, b) => b.date_iso.localeCompare(a.date_iso));
      setEvents([...upcoming, ...past]);
    }).catch(() => {});
  }, []);

  const today = new Date().toISOString().split('T')[0];
  // Re-sort initial/server events using the same upcoming-then-past order in case
  // the server returned a different ordering.
  const upcomingSorted = events
    .filter((e) => (e.date_iso || '') >= today)
    .sort((a, b) => (a.date_iso || '').localeCompare(b.date_iso || ''));
  const pastSorted = events
    .filter((e) => (e.date_iso || '') < today)
    .sort((a, b) => (b.date_iso || '').localeCompare(a.date_iso || ''));
  const sorted = [...upcomingSorted, ...pastSorted];

  if (sorted.length === 0) return null;

  return (
    <section style={{ background: "var(--paper)" }}>
      <div className="container">
        <div className="sec-eyebrow">Upcoming</div>
        <h2 className="sec-title">Live Events</h2>
        <div className="iu-upcoming-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {sorted.map((event, i) => {
            const isPast = (event.date_iso || '') < today;
            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--paper-3)",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  opacity: isPast ? 0.55 : 1,
                  filter: isPast ? "grayscale(60%)" : "none",
                  position: "relative",
                }}
              >
                {isPast && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      zIndex: 2,
                      background: "rgba(0,0,0,0.7)",
                      color: "#fff",
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      padding: ".25rem .6rem",
                      borderRadius: "4px",
                    }}
                  >
                    Completed
                  </div>
                )}
                <div style={{ background: "linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 50%,var(--steel) 100%)", padding: "1.5rem", color: "#fff" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sky)", marginBottom: ".5rem" }}>{event.month_year}</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>{event.day}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,.7)", marginTop: ".5rem" }}>{event.time}</div>
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, marginBottom: ".75rem", lineHeight: 1.3 }}>{event.title}</h3>
                  <div style={{ fontSize: "13.5px", color: "var(--ink-3)", lineHeight: 1.65, marginBottom: "1rem", flex: 1 }}>
                    {event.description.split("\n").slice(0, 3).map((line, j) => (
                      <div key={j} style={{ display: "flex", gap: ".5rem", marginBottom: ".4rem" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--steel)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: "3px" }}><polyline points="20 6 9 17 4 12" /></svg>
                        <span>{line.trim()}</span>
                      </div>
                    ))}
                  </div>
                  {!isPast && event.register_url && (
                    <a href={event.register_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ alignSelf: "flex-start" }}>Register Free &rarr;</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const REPLAYS_PER_PAGE = 9;

function formatReplayDate(dateIso: string, monthYear: string): string {
  if (!dateIso) return monthYear || "";
  const d = new Date(dateIso + "T00:00:00");
  if (isNaN(d.getTime())) return monthYear || "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// Gradient colours per index to give cards visual variety
const THUMB_GRADIENTS = [
  "linear-gradient(135deg,#1b2a4a,#3d65a8)",
  "linear-gradient(135deg,#0B2545,#1B3A6B)",
  "linear-gradient(135deg,#1a3a52,#2e6a8a)",
  "linear-gradient(135deg,#1b2a4a,#2e4a8a)",
  "linear-gradient(135deg,#0d2038,#3d65a8)",
];

export function WebinarReplays({ initialWebinars }: { initialWebinars: WebinarRow[] }) {
  const router = useRouter();
  const [webinars, setWebinars] = useState<WebinarRow[]>(initialWebinars);
  const [page, setPage] = useState(1);
  const [unlocked, setUnlocked] = useState(false);
  const [gateCard, setGateCard] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(!!localStorage.getItem(GATE_KEY));
  }, []);

  useEffect(() => {
    fetchSheetClient("Webinars").then((rows) => {
      const parsed = rows.filter((r) => r.title && r.webinar_url) as unknown as WebinarRow[];
      if (parsed.length > 0) setWebinars(parsed);
    }).catch(() => {});
  }, []);

  const handleUnlock = useCallback((slug: string) => {
    setUnlocked(true);
    setGateCard(null);
    router.push(`/events/replay/${slug}/`);
  }, [router]);

  const sorted = [...webinars].sort((a, b) => (b.date_iso || "").localeCompare(a.date_iso || ""));
  const totalPages = Math.ceil(sorted.length / REPLAYS_PER_PAGE);
  const paged = sorted.slice((page - 1) * REPLAYS_PER_PAGE, page * REPLAYS_PER_PAGE);

  if (sorted.length === 0) return null;

  const thumbContent = (w: WebinarRow, grad: string) => (
    <>
      {w.image_url ? (
        <div className="replay-thumb-bg" style={{ backgroundImage: `url('${w.image_url}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
      ) : (
        <>
          <div className="replay-thumb-bg" style={{ background: grad }} />
          <div className="replay-thumb-pattern" />
        </>
      )}
      <div className="replay-thumb-icon">CE Webinar</div>
      <div className="replay-thumb-caption">{w.title}</div>
      <div className="replay-play-btn">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </div>
    </>
  );

  return (
    <section style={{ background: "var(--paper-2)", padding: "3rem 0" }}>
      <div className="container">
        <div className="sec-eyebrow">On-Demand Archive</div>
        <h2 className="sec-title" style={{ marginBottom: ".5rem" }}>Webinar Replays</h2>
        <p style={{ fontSize: "14px", color: "var(--ink-4)", marginBottom: "2rem" }}>
          {sorted.length} CE-eligible sessions — watch anytime, free.
        </p>
        <div className="replay-grid">
          {paged.map((w, i) => {
            const slug = webinarSlug(w);
            const grad = THUMB_GRADIENTS[(i + (page - 1) * REPLAYS_PER_PAGE) % THUMB_GRADIENTS.length];
            const isGating = gateCard === slug;

            // Unlocked — direct link to replay page
            if (unlocked) {
              return (
                <Link key={i} href={`/events/replay/${slug}/`} className="replay-card" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="replay-thumb">{thumbContent(w, grad)}</div>
                  <div className="replay-body">
                    <div className="replay-date">{formatReplayDate(w.date_iso, w.month_year)}</div>
                    <div className="replay-title">{w.title}</div>
                    <div className="replay-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      1 CE Credit
                    </div>
                  </div>
                </Link>
              );
            }

            // Locked — div wrapper so form inputs never trigger navigation
            return (
              <div
                key={i}
                className="replay-card"
                style={{ cursor: isGating ? "default" : "pointer" }}
                onClick={() => !isGating && setGateCard(slug)}
                role="button"
                tabIndex={0}
                aria-label={`${w.title} — click to unlock replay`}
                onKeyDown={(e) => e.key === "Enter" && !isGating && setGateCard(slug)}
              >
                <div className="replay-thumb">{thumbContent(w, grad)}</div>
                {isGating ? (
                  <WebinarGateForm title={w.title} onUnlock={() => handleUnlock(slug)} />
                ) : (
                  <div className="replay-body">
                    <div className="replay-date">{formatReplayDate(w.date_iso, w.month_year)}</div>
                    <div className="replay-title">{w.title}</div>
                    <div className="replay-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      🔒 Free Access
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="pagination" aria-label="Webinar replay pages" style={{ marginTop: "2.5rem" }}>
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous" style={{ opacity: page === 1 ? 0.4 : 1 }}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "…")[]>((acc, p, i, arr) => {
                if (i > 0 && typeof arr[i - 1] === "number" && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`el-${i}`} className="page-btn" style={{ cursor: "default", border: "none" }}>…</span>
                ) : (
                  <button key={p} className={`page-btn${page === p ? " active" : ""}`} onClick={() => setPage(p as number)} aria-label={`Page ${p}`} aria-current={page === p ? "page" : undefined}>{p}</button>
                )
              )}
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next" style={{ opacity: page === totalPages ? 0.4 : 1 }}>›</button>
          </nav>
        )}
      </div>
    </section>
  );
}
