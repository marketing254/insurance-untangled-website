"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchSheetClient } from "@/lib/sheets-client";
import { driveImageUrl } from "@/lib/sheets";
import { postToKit } from "@/lib/kit";

const GATE_KEY = "iu_podcast_unlocked";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";
const PER_PAGE = 12;

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "trashmail.com",
  "yopmail.com", "throwawaymail.com", "fakeinbox.com", "getnada.com", "maildrop.cc",
  "sharklasers.com", "tempmailaddress.com", "dispostable.com", "mailnesia.com", "spam4.me",
  "tempinbox.com", "mintemail.com", "moakt.com", "tempr.email", "emailondeck.com",
]);

function isValidEmailLocal(value: string): boolean {
  const v = value.trim().toLowerCase();
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v)) return false;
  const domain = v.split("@")[1] || "";
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return false;
  return true;
}

interface Episode {
  episode: string;
  title: string;
  category: string;
  poster_image: string;
  audio_source: string;
  date_iso: string;   // dd-mm-yyyy from the sheet
}

function titleSlug(ep: Episode): string {
  const num = ep.episode.replace(/\D/g, "");
  const slug = ep.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  return `${num}-${slug}`;
}

// The sheet stores dates as "dd-mm-yyyy" (e.g. "13-01-2026"), but some rows
// may have been auto-formatted by Sheets into locale-dependent forms like
// "1/13/2026" or "2026-01-13". Handle all common variants defensively so a
// stray format doesn't wipe the date from a card.
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatEpDate(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  const parts = s.split(/[-/]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 3) return "";
  const a = parseInt(parts[0], 10);
  const b = parseInt(parts[1], 10);
  const c = parseInt(parts[2], 10);
  if (!a || !b || !c) return "";
  let dd = 0, mm = 0, yyyy = 0;
  // yyyy-mm-dd
  if (parts[0].length === 4 && c <= 31) { yyyy = a; mm = b; dd = c; }
  // dd-mm-yyyy (sheet default) — if first part > 12 it MUST be day
  else if (parts[2].length === 4 && a > 12) { dd = a; mm = b; yyyy = c; }
  // mm-dd-yyyy — if second part > 12 it MUST be day
  else if (parts[2].length === 4 && b > 12) { mm = a; dd = b; yyyy = c; }
  // Ambiguous (both ≤ 12) — assume dd-mm-yyyy per the sheet's stated convention
  else if (parts[2].length === 4) { dd = a; mm = b; yyyy = c; }
  else return "";
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return "";
  return `${MONTH_ABBR[mm - 1]} ${dd}, ${yyyy}`;
}

// Every card now shows the episode number + title as visible text. Older
// episodes (1–135) also have the title baked into their poster image, but
// the visible text is still worth rendering for consistency and for
// screen-reader / search-index accessibility.
function shouldShowVisibleTitle(_epNum: string): boolean {
  return true;
}

function categoryColor(cat: string): { bg: string; color: string } {
  const c = (cat || "").toLowerCase();
  if (c.includes("market")) return { bg: "var(--gold-pale)", color: "#8a6010" };
  if (c.includes("negotiat")) return { bg: "var(--sky-pale)", color: "var(--steel)" };
  return { bg: "var(--paper-3)", color: "var(--ink-3)" };
}

// Inline gate form — appears inside a locked card (no <Link> wrapper, so inputs never navigate)
function GateForm({ onUnlock, episodeTitle }: { onUnlock: () => void; episodeTitle: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedAt = useRef<number>(Date.now());

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const hp1 = (form.elements.namedItem("hp_field") as HTMLInputElement)?.value || "";
    const hp2 = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
    const hp3 = (form.elements.namedItem("phone_alt") as HTMLInputElement)?.value || "";
    if (hp1 || hp2 || hp3) return;

    if (Date.now() - mountedAt.current < 2500) {
      setError("Please take a moment to fill in your details.");
      return;
    }

    if (!name.trim() || name.trim().length < 2) { setError("Please enter your full name."); return; }
    if (!isValidEmailLocal(email)) { setError("Please enter a valid work email."); return; }

    setLoading(true);
    setError("");
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    // Fire-and-forget: unlock IMMEDIATELY. Apps Script takes 3–10s (sheet
    // write + team email) — the user must never wait on that.
    const params = new URLSearchParams({
      form_type: "podcast_gate",
      name: cleanName,
      email: cleanEmail,
      episode_title: episodeTitle,
      source: "card_gate",
    });
    fetch(`${APPS_SCRIPT_URL}?${params}`, { method: "GET", mode: "no-cors", keepalive: true }).catch(() => {});
    postToKit("podcast_gate", { email: cleanEmail, name: cleanName });
    localStorage.setItem(GATE_KEY, "1");
    onUnlock();
  };

  return (
    <form onSubmit={submit} onClick={stop} noValidate autoComplete="off" style={{ padding: "1.1rem", display: "flex", flexDirection: "column", gap: ".6rem", position: "relative" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: ".1rem" }}>
        Free access — unlock all episodes
      </div>
      <input
        type="text" name="name" placeholder="Your name" value={name} required autoComplete="name"
        onChange={(e) => { stop(e); setName(e.target.value); }}
        onClick={stop}
        style={{ padding: ".55rem .75rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "13px", fontFamily: "var(--sans)", background: "#fff" }}
      />
      <input
        type="email" name="email" placeholder="your@email.com" value={email} required autoComplete="email"
        onChange={(e) => { stop(e); setEmail(e.target.value); }}
        onClick={stop}
        style={{ padding: ".55rem .75rem", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "13px", fontFamily: "var(--sans)", background: "#fff" }}
      />
      {/* Multi-honeypot: three decoy fields with conventional names that bots auto-fill */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
        <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
      </div>
      {error && <div style={{ fontSize: "11.5px", color: "#c0392b" }}>{error}</div>}
      <button
        type="submit" disabled={loading} onClick={stop}
        style={{ padding: ".6rem", background: "var(--teal)", color: "#fff", border: "none", borderRadius: "var(--r)", fontFamily: "var(--sans)", fontWeight: 700, fontSize: "13px", cursor: loading ? "wait" : "pointer" }}
      >
        {loading ? "Unlocking…" : "Unlock Free Access →"}
      </button>
      <div style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: ".04em", textAlign: "center" }}>
        No spam. Unsubscribe anytime.
      </div>
    </form>
  );
}

export default function PodcastGrid({ initialEpisodes }: { initialEpisodes: Episode[] }) {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [page, setPage] = useState(1);
  const [unlocked, setUnlocked] = useState(false);
  const [gateCard, setGateCard] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(!!localStorage.getItem(GATE_KEY));
  }, []);

  useEffect(() => {
    fetchSheetClient("podcasts").then((rows) => {
      const parsed = rows
        .filter((r) => r.episode && r.title)
        .sort((a, b) => (parseInt(b.episode) || 0) - (parseInt(a.episode) || 0)) as unknown as Episode[];
      if (parsed.length === 0) return;
      // Always replace with the fresh data — this refetch exists specifically
      // to surface sheet changes made after the last build (new dates on
      // existing episodes, new descriptions, etc.). A previous shallow-dedup
      // check here was silently discarding those field-level updates when
      // the row count + first episode's title stayed the same.
      setEpisodes(parsed);
    }).catch(() => {});
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    episodes.forEach((ep) => { if (ep.category?.trim()) cats.add(ep.category.trim()); });
    return ["All Topics", ...Array.from(cats).sort()];
  }, [episodes]);

  const filtered = useMemo(() => {
    if (activeCategory === "All Topics") return episodes;
    return episodes.filter((ep) => ep.category?.trim() === activeCategory);
  }, [episodes, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setPage(1);
    setGateCard(null);
  }, []);

  // After unlock: navigate to the episode that was clicked
  const handleUnlock = useCallback((slug: string) => {
    setUnlocked(true);
    setGateCard(null);
    router.push(`/podcast/${slug}/`);
  }, [router]);

  const cardContent = (ep: Episode, isGating: boolean, slug: string) => {
    const { bg, color } = categoryColor(ep.category);
    return (
      <>
        <div
          className="ep-thumb ep-thumb-glassy"
          style={{
            background: ep.poster_image
              ? `linear-gradient(180deg, rgba(255,255,255,.10) 0%, transparent 28%, transparent 72%, rgba(11,25,55,.18) 100%), url('${driveImageUrl(ep.poster_image, 800)}') center/cover no-repeat`
              : "linear-gradient(135deg,#0B2545,#13315C)",
          }}
        >
          {/* Episode number lives on the poster image itself — no overlay text */}
          {!ep.poster_image && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", padding: ".8rem 1rem" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(168,196,228,.65)" }}>
                Episode
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-.02em" }}>
                {ep.episode}
              </div>
            </div>
          )}
        </div>
        {isGating ? (
          <GateForm episodeTitle={`Ep ${ep.episode}: ${ep.title}`} onUnlock={() => handleUnlock(slug)} />
        ) : (
          <div className="ep-card-body">
            {shouldShowVisibleTitle(ep.episode) ? (
              <>
                <div className="ep-card-num">Episode {ep.episode}</div>
                <div className="ep-card-name">{ep.title}</div>
              </>
            ) : (
              <span className="sr-only">Episode {ep.episode}: {ep.title}</span>
            )}
            {formatEpDate(ep.date_iso) && (
              <div className="ep-card-date">{formatEpDate(ep.date_iso)}</div>
            )}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".4rem" }}>
              <span className="ep-card-tag" style={{ background: bg, color }}>{ep.category || "Episode"}</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--ink-4)", letterSpacing: ".04em" }}>
                🔒 Free Access
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="filter-row">
        {categories.map((cat) => (
          <button key={cat} className={`filter-tab${activeCategory === cat ? " active" : ""}`} onClick={() => handleCategoryChange(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ fontSize: "13px", color: "var(--ink-4)", marginBottom: "1rem" }}>
        {filtered.length} episode{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All Topics" && ` in "${activeCategory}"`}
        {" "}&mdash; page {page} of {totalPages}
      </div>

      <div className="ep-grid">
        {paged.map((ep) => {
          const slug = titleSlug(ep);
          const isGating = gateCard === ep.episode;

          // Unlocked: normal Link card
          if (unlocked) {
            return (
              <Link key={ep.episode} href={`/podcast/${slug}/`} className="ep-card" style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  className="ep-thumb ep-thumb-glassy"
                  style={{
                    background: ep.poster_image
                      ? `linear-gradient(180deg, rgba(255,255,255,.10) 0%, transparent 28%, transparent 72%, rgba(11,25,55,.18) 100%), url('${driveImageUrl(ep.poster_image, 800)}') center/cover no-repeat`
                      : "linear-gradient(135deg,#0B2545,#13315C)",
                  }}
                >
                  {!ep.poster_image && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end", padding: ".8rem 1rem" }}>
                      <div style={{ fontFamily: "var(--mono)", fontSize: "9px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(168,196,228,.65)" }}>Episode</div>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-.02em" }}>{ep.episode}</div>
                    </div>
                  )}
                </div>
                <div className="ep-card-body">
                  {shouldShowVisibleTitle(ep.episode) ? (
                    <>
                      <div className="ep-card-num">Episode {ep.episode}</div>
                      <div className="ep-card-name">{ep.title}</div>
                    </>
                  ) : (
                    <span className="sr-only">Episode {ep.episode}: {ep.title}</span>
                  )}
                  {formatEpDate(ep.date_iso) && (
                    <div className="ep-card-date">{formatEpDate(ep.date_iso)}</div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".4rem" }}>
                    <span className="ep-card-tag" style={{ ...categoryColor(ep.category) }}>{ep.category || "Episode"}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "9.5px", color: "var(--teal)", fontWeight: 700, letterSpacing: ".06em" }}>▶ Listen</span>
                  </div>
                </div>
              </Link>
            );
          }

          // Locked: div wrapper (no Link — prevents inputs from triggering navigation)
          return (
            <div
              key={ep.episode}
              className="ep-card"
              style={{ cursor: isGating ? "default" : "pointer" }}
              onClick={() => !isGating && setGateCard(ep.episode)}
              role="button"
              tabIndex={0}
              aria-label={`Episode ${ep.episode}: ${ep.title} — click to unlock`}
              onKeyDown={(e) => e.key === "Enter" && !isGating && setGateCard(ep.episode)}
            >
              {cardContent(ep, isGating, slug)}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--ink-4)" }}>
          No episodes in this category.
          <button onClick={() => handleCategoryChange("All Topics")} style={{ display: "block", margin: "1rem auto 0", background: "none", border: "none", color: "var(--steel)", fontWeight: 600, cursor: "pointer" }}>
            Show all episodes →
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Episode pages">
          <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page" style={{ opacity: page === 1 ? 0.4 : 1 }}>‹</button>
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
                <button key={p} className={`page-btn${page === p ? " active" : ""}`} onClick={() => setPage(p as number)} aria-label={`Page ${p}`}>{p}</button>
              )
            )}
          <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page" style={{ opacity: page === totalPages ? 0.4 : 1 }}>›</button>
        </nav>
      )}
    </>
  );
}
