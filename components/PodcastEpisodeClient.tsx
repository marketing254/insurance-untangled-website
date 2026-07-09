"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { fetchSheetClient } from "@/lib/sheets-client";
import { postToKit } from "@/lib/kit";
import { buildPodcastTranscript, type PodcastTranscript } from "@/lib/transcripts";

const GATE_KEY = "iu_podcast_unlocked";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzLJBbXsMR-Gio7KZaIuNvbPpnHr8P7ght6Uez73F9uOJeoqxbxg41dl5NMPhNBugMz0g/exec";

const TRANSCRIPT_ENDPOINT = APPS_SCRIPT_URL;

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

type Episode = {
  episode: string;
  title: string;
  guest_name: string;
  guest_photo_url: string;
  category: string;
  description: string;
  contact_info: string;
  poster_image: string;
  audio_source: string;
  transcript_url: string;
  date_iso: string;   // dd-mm-yyyy from the sheet
};

// The sheet stores dates as "dd-mm-yyyy" (e.g. "13-01-2026"), but some rows
// may have been auto-formatted by Sheets into locale-dependent forms like
// "1/13/2026" or "2026-01-13". Handle all common variants defensively.
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
function formatEpisodeDate(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  const parts = s.split(/[-/]/).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 3) return "";
  const a = parseInt(parts[0], 10);
  const b = parseInt(parts[1], 10);
  const c = parseInt(parts[2], 10);
  if (!a || !b || !c) return "";
  let dd = 0, mm = 0, yyyy = 0;
  if (parts[0].length === 4 && c <= 31) { yyyy = a; mm = b; dd = c; }
  else if (parts[2].length === 4 && a > 12) { dd = a; mm = b; yyyy = c; }
  else if (parts[2].length === 4 && b > 12) { mm = a; dd = b; yyyy = c; }
  else if (parts[2].length === 4) { dd = a; mm = b; yyyy = c; }
  else return "";
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return "";
  return `${MONTH_NAMES[mm - 1]} ${dd}, ${yyyy}`;
}

type Props = {
  slug: string;
  initialEpisode: Episode;
  initialEpisodes: Episode[];
};

type TranscriptProxyResult = {
  text: string | null;
  error?: string;
};

function episodeNumber(value: string): string {
  return String(value || "").match(/\d+/)?.[0] || "";
}

function episodeSlug(ep: Pick<Episode, "episode" | "title">): string {
  const num = episodeNumber(ep.episode);
  const titleSlug = ep.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${num}-${titleSlug}`;
}

function driveId(value: string): string {
  const trimmed = String(value || "").trim();
  const fileMatch = trimmed.match(/\/(?:file\/)?d\/([\w-]+)/);
  if (fileMatch) return fileMatch[1];

  const idMatch = trimmed.match(/[?&]id=([\w-]+)/);
  if (idMatch) return idMatch[1];

  if (/^[\w-]{20,}$/.test(trimmed)) return trimmed;
  return "";
}

function googleDocId(value: string): string {
  const match = String(value || "").match(/docs\.google\.com\/document\/d\/([\w-]+)/);
  return match ? match[1] : "";
}

function transcriptRef(value: string): string {
  return googleDocId(value) || driveId(value);
}

function normalizeEpisode(ep: Episode): Episode {
  return {
    ...ep,
    transcript_url: String(ep.transcript_url || "").trim(),
  };
}

function looksLikeHtmlDocument(text: string): boolean {
  const value = text.trim().toLowerCase();
  return (
    value.startsWith("<!doctype html") ||
    value.startsWith("<html") ||
    value.includes("<head>") ||
    value.includes("window['_drive_viewer_ctiming']")
  );
}

function looksLikeProxyError(text: string): boolean {
  const value = text.trim();
  return /^ERROR:/i.test(value) || /"success"\s*:\s*false/.test(value);
}

function usableTranscriptText(text: string | null): text is string {
  return Boolean(text && text.trim() && !looksLikeHtmlDocument(text) && !looksLikeProxyError(text));
}

function docExportUrl(id: string): string {
  return `https://docs.google.com/document/d/${encodeURIComponent(id)}/export?format=txt`;
}

function friendlyTranscriptError(message?: string): string {
  const value = String(message || "").trim();
  if (/UrlFetchApp|script\.external_request|authorization|permission|අවසර/i.test(value)) {
    return "Transcript proxy needs Apps Script authorization. Redeploy this web app and approve the requested permissions.";
  }

  return value || "The transcript proxy did not return readable text.";
}

function fetchProxyText(sourceUrl: string): Promise<TranscriptProxyResult> {
  return new Promise((resolve) => {
    if (!TRANSCRIPT_ENDPOINT) {
      resolve({ text: null, error: "Transcript proxy endpoint is not configured." });
      return;
    }

    const callbackName = `iuTranscript_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const params = new URLSearchParams();
    const value = String(sourceUrl || "").trim();
    const docId = googleDocId(value);
    const id = transcriptRef(sourceUrl);

    if (!value) {
      resolve({ text: null });
      return;
    }

    params.set("callback", callbackName);
    if (docId) {
      params.set("docUrl", docExportUrl(docId));
    } else if (id) {
      params.set("id", id);
    } else {
      params.set("url", value);
    }

    const script = document.createElement("script");
    const cleanup = () => {
      delete (window as typeof window & Record<string, unknown>)[callbackName];
      script.remove();
    };

    // 30s — Apps Script cold starts plus a Drive/Doc fetch routinely take
    // 15–20s on the first hit of the day; 15s was producing false timeouts.
    const timer = window.setTimeout(() => {
      cleanup();
      resolve({ text: null, error: "Transcript proxy timed out." });
    }, 30000);

    (window as typeof window & Record<string, (payload: { success?: boolean; text?: string; error?: string }) => void>)[callbackName] = (payload) => {
      window.clearTimeout(timer);
      cleanup();
      resolve(
        payload?.success && usableTranscriptText(payload.text || "")
          ? { text: payload.text || null }
          : { text: null, error: friendlyTranscriptError(payload?.error) }
      );
    };

    script.onerror = () => {
      window.clearTimeout(timer);
      cleanup();
      resolve({ text: null, error: "Transcript proxy script could not be loaded." });
    };

    script.src = `${TRANSCRIPT_ENDPOINT}?${params.toString()}`;
    document.head.appendChild(script);
  });
}

async function loadTranscript(sourceUrl: string, guestName: string): Promise<{ transcript: PodcastTranscript | null; error?: string }> {
  const result = await fetchProxyText(sourceUrl);
  if (!usableTranscriptText(result.text)) {
    return { transcript: null, error: result.error };
  }

  return { transcript: buildPodcastTranscript(result.text, sourceUrl, guestName) };
}

function parseDescription(description: string): string[] {
  return description ? description.split(/\\n|\n/).filter((line) => line.trim()) : [];
}

function PlayerGateForm({ episodeTitle, onUnlock }: { episodeTitle: string; onUnlock: () => void }) {
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
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    // Fire-and-forget: unlock IMMEDIATELY — never make the user wait for
    // Apps Script (3–10s for sheet write + team email).
    const params = new URLSearchParams();
    params.set("form_type", "podcast_gate");
    params.set("name", cleanName);
    params.set("email", cleanEmail);
    params.set("episode_title", episodeTitle);
    params.set("source", "episode_page");
    fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", body: params, keepalive: true }).catch(() => {});
    postToKit("podcast_gate", { email: cleanEmail, name: cleanName });
    localStorage.setItem(GATE_KEY, "1");
    onUnlock();
    setSubmitting(false);
  }

  return (
    <div style={{ background: "var(--navy)", borderRadius: "var(--r-lg)", padding: "1.75rem 1.75rem 1.5rem", marginBottom: "2.5rem", border: "1px solid rgba(168,196,228,.18)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".65rem", marginBottom: ".85rem" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold-lt)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sky)", opacity: 0.75 }}>
          Unlock the audio
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: ".4rem", lineHeight: 1.3 }}>
        Listen to the full episode
      </h3>
      <p style={{ fontSize: "13px", color: "rgba(255,255,255,.6)", marginBottom: "1.1rem", lineHeight: 1.55 }}>
        Enter your details once to unlock every episode. You will also receive new episode alerts. Unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, overflow: "hidden" }} aria-hidden="true">
          <label>Leave blank<input type="text" name="hp_field" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
          <label>Phone<input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" defaultValue="" /></label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem", marginBottom: ".85rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            style={{ padding: ".7rem .85rem", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "8px", color: "#fff", fontSize: "13px", fontFamily: "var(--sans)" }}
          />
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{ padding: ".7rem .85rem", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "8px", color: "#fff", fontSize: "13px", fontFamily: "var(--sans)" }}
          />
        </div>
        {error && (
          <div style={{ fontSize: "12px", color: "#ffb4b4", marginBottom: ".75rem" }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="btn-teal"
          style={{ width: "100%", justifyContent: "center", fontSize: "13px", opacity: submitting ? 0.7 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
        >
          {submitting ? "Unlocking..." : "Unlock & Listen"}
        </button>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,.4)", marginTop: ".75rem", lineHeight: 1.5 }}>
          We respect your privacy. No spam, ever. Read our <Link href="/privacy/" style={{ color: "rgba(255,255,255,.55)", textDecoration: "underline" }}>privacy policy</Link>.
        </p>
      </form>
    </div>
  );
}

export default function PodcastEpisodeClient({ slug, initialEpisode, initialEpisodes }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>(() => initialEpisodes.map(normalizeEpisode));
  const [episode, setEpisode] = useState<Episode>(() => normalizeEpisode(initialEpisode));
  const [transcript, setTranscript] = useState<PodcastTranscript | null>(null);
  const [transcriptLoading, setTranscriptLoading] = useState(false);
  const [transcriptError, setTranscriptError] = useState("");
  const [activeTab, setActiveTab] = useState<"notes" | "transcript">("notes");
  const targetEpisode = episodeNumber(slug) || episodeNumber(initialEpisode.episode);

  // Player-only gate — page content (title, notes, transcript) stays visible
  // to all crawlers and direct-link visitors. Only the audio element is gated.
  // This means: AI crawlers + Google get the FULL transcript text, but media
  // playback requires completing the lead form once.
  useEffect(() => {
    setUnlocked(!!localStorage.getItem(GATE_KEY));
  }, []);

  useEffect(() => {
    fetchSheetClient("podcasts")
      .then((rows) => {
        const parsed = rows
          .filter((row) => row.episode && row.title)
          .sort((a, b) => (parseInt(b.episode) || 0) - (parseInt(a.episode) || 0))
          .map((row) => normalizeEpisode(row as unknown as Episode));

        if (!parsed.length) return;
        setEpisodes(parsed);

        const latest = parsed.find((row) => episodeNumber(row.episode) === targetEpisode);
        if (latest) setEpisode(latest);
      })
      .catch(() => {});
  }, [targetEpisode]);

  useEffect(() => {
    const transcriptUrl = episode.transcript_url?.trim();
    if (!transcriptUrl) {
      setTranscript(null);
      setTranscriptError("");
      setTranscriptLoading(false);
      return;
    }

    let cancelled = false;
    setTranscript(null);
    setTranscriptError("");
    setTranscriptLoading(true);

    loadTranscript(transcriptUrl, episode.guest_name)
      .then((loaded) => {
        if (!cancelled) {
          setTranscript(loaded.transcript);
          setTranscriptError(loaded.error || "");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTranscript(null);
          setTranscriptError("The transcript could not be loaded.");
        }
      })
      .finally(() => {
        if (!cancelled) setTranscriptLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [episode.transcript_url, episode.guest_name]);

  const descriptionLines = useMemo(() => parseDescription(episode.description), [episode.description]);
  const currentIdx = episodes.findIndex((item) => episodeNumber(item.episode) === episodeNumber(episode.episode));
  const prevEp = currentIdx >= 0 && currentIdx < episodes.length - 1 ? episodes[currentIdx + 1] : null;
  const nextEp = currentIdx > 0 ? episodes[currentIdx - 1] : null;
  const hasTranscript = Boolean(episode.transcript_url?.trim());

  return (
    <>
      <div className="page-banner" style={{ paddingBottom: "2.5rem" }}>
        <div className="container page-banner-inner">
          <Link href="/podcast/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "rgba(168,196,228,.65)", fontSize: "12px", fontWeight: 500, textDecoration: "none", marginBottom: "1.25rem", fontFamily: "var(--mono)", letterSpacing: ".06em" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            All Episodes
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sky)", background: "rgba(168,196,228,.12)", padding: ".35rem .85rem", borderRadius: "20px", border: "1px solid rgba(168,196,228,.2)" }}>
              Episode {episode.episode}
            </span>
            {episode.category && (
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", background: "rgba(255,255,255,.06)", padding: ".3rem .7rem", borderRadius: "20px", border: "1px solid rgba(255,255,255,.1)" }}>
                {episode.category}
              </span>
            )}
            {formatEpisodeDate(episode.date_iso) && (
              <span style={{ fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 500, letterSpacing: ".08em", color: "rgba(255,255,255,.5)", display: "inline-flex", alignItems: "center", gap: ".35rem" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatEpisodeDate(episode.date_iso)}
              </span>
            )}
          </div>
          <h1 className="page-title" style={{ maxWidth: "720px" }}>{episode.title}</h1>
          {episode.guest_name && (
            <div style={{ display: "flex", alignItems: "center", gap: ".85rem", marginTop: "1rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, var(--steel), var(--navy-lt))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 900, color: "#fff", border: "2px solid rgba(168,196,228,.2)" }}>
                {episode.guest_name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>with {episode.guest_name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,.45)", fontFamily: "var(--mono)", letterSpacing: ".04em" }}>Guest</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="ep-detail-grid">
            <div>
              {/* Player-only gate: title, notes, transcript above/below stay
                  visible to crawlers + direct visitors. Only audio is gated. */}
              {episode.audio_source && (
                unlocked ? (
                  <div style={{ background: "var(--navy)", borderRadius: "var(--r-lg)", padding: "1.5rem 1.75rem", marginBottom: "2.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".65rem", marginBottom: ".85rem" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold-lt)"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--sky)", opacity: 0.65 }}>
                        Listen to Episode {episode.episode}
                      </span>
                    </div>
                    <audio controls preload="metadata" style={{ width: "100%", borderRadius: "6px" }}>
                      <source src={episode.audio_source} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ) : (
                  <PlayerGateForm episodeTitle={`Ep ${episode.episode}: ${episode.title}`} onUnlock={() => setUnlocked(true)} />
                )
              )}

              <div className="podcast-content-panel">
                <div className="podcast-content-tabs" role="tablist" aria-label="Episode content">
                  <button
                    type="button"
                    className={`podcast-content-tab${activeTab === "notes" ? " active" : ""}`}
                    onClick={() => setActiveTab("notes")}
                    role="tab"
                    aria-selected={activeTab === "notes"}
                  >
                    Key Notes
                  </button>
                  <button
                    type="button"
                    className={`podcast-content-tab${activeTab === "transcript" ? " active" : ""}`}
                    onClick={() => setActiveTab("transcript")}
                    role="tab"
                    aria-selected={activeTab === "transcript"}
                  >
                    Transcript
                  </button>
                </div>

                {activeTab === "notes" ? (
                  <div className="podcast-tab-panel" role="tabpanel">
                    <div className="podcast-panel-heading">
                      <div className="podcast-transcript-kicker">Episode Guide</div>
                      <h2>Key notes</h2>
                    </div>
                    {descriptionLines.length > 0 ? (
                      <div className="podcast-notes-body">
                        {descriptionLines.map((line, i) => (
                          <p key={i}>
                            {line.startsWith("* ") ? (
                              <span className="podcast-note-bullet">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                <span>
                                  <strong>{line.replace("* ", "").split(":")[0]}:</strong>
                                  {line.replace("* ", "").includes(":") ? line.replace("* ", "").slice(line.replace("* ", "").indexOf(":")) : ""}
                                </span>
                              </span>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div className="podcast-transcript-unavailable">
                        <p>Key notes are being prepared for this episode.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="podcast-tab-panel" role="tabpanel">
                    <div className="podcast-panel-heading">
                      <div>
                        <div className="podcast-transcript-kicker">Transcript</div>
                        <h2>Full transcript</h2>
                      </div>
                      <p>
                        {transcript ? (
                          <>
                            {transcript.wordCount.toLocaleString()} words &middot; {transcript.readMinutes} min read
                          </>
                        ) : transcriptLoading ? (
                          "Loading transcript..."
                        ) : hasTranscript ? (
                          "Transcript source is connected"
                        ) : (
                          "Transcript unavailable"
                        )}
                      </p>
                    </div>

                    {transcript ? (
                      <div className="podcast-transcript-body">
                        {transcript.entries.map((entry, index) => (
                          <article className={`podcast-transcript-entry podcast-transcript-entry-${entry.role}`} key={`${entry.time}-${entry.speaker}-${index}`}>
                            {(entry.speaker || entry.time) && (
                              <div className="podcast-transcript-meta-row">
                                {entry.speaker && <span className="podcast-transcript-speaker">{entry.speaker}</span>}
                                {entry.time && <span className="podcast-transcript-time">{entry.time}</span>}
                              </div>
                            )}
                            <p className="podcast-transcript-text">{entry.text}</p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="podcast-transcript-unavailable">
                        <p>
                          {transcriptLoading
                            ? "Loading the transcript..."
                            : hasTranscript
                              ? transcriptError || "The transcript is connected, but it could not be rendered inline yet."
                              : "Transcript is not available for this episode yet."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            <div style={{ position: "sticky", top: "100px" }}>
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "1.5rem", marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: ".85rem" }}>
                  Listen on
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  <a href="https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".65rem .85rem", background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", textDecoration: "none", transition: "border-color .18s" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--navy)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                    Apple Podcasts
                  </a>
                  <a href="https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".65rem .85rem", background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", textDecoration: "none", transition: "border-color .18s" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                    Spotify
                  </a>
                  <a href="https://www.youtube.com/playlist?list=PLYzuqhbyVkuApRBUvkXkr5Dalm_F6BYUf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".65rem .85rem", background: "#fff", border: "1px solid var(--paper-3)", borderRadius: "var(--r)", fontSize: "13px", fontWeight: 500, color: "var(--ink-2)", textDecoration: "none", transition: "border-color .18s" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                    YouTube
                  </a>
                </div>
              </div>

              <div style={{ background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", padding: "1.5rem", marginBottom: "1.25rem" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: ".85rem" }}>
                  Episode details
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".65rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>Episode</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{episode.episode}</span>
                  </div>
                  {formatEpisodeDate(episode.date_iso) && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>Published</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{formatEpisodeDate(episode.date_iso)}</span>
                    </div>
                  )}
                  {episode.category && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>Category</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--steel)" }}>{episode.category}</span>
                    </div>
                  )}
                  {episode.guest_name && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>Guest</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{episode.guest_name}</span>
                    </div>
                  )}
                  {hasTranscript && (
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                      <span style={{ fontSize: "13px", color: "var(--ink-4)" }}>Transcript</span>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--steel)" }}>Available</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background: "var(--navy)", borderRadius: "var(--r-lg)", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: ".5rem", lineHeight: 1.3 }}>
                  Need help with PPO strategy?
                </div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,.55)", marginBottom: "1rem", lineHeight: 1.55 }}>
                  Book a free consultation to discuss your practice&apos;s insurance situation.
                </p>
                <Link href="/contact/" className="btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: "13px" }}>
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", paddingTop: "2.5rem", marginTop: "2.5rem", borderTop: "1px solid var(--paper-3)" }}>
            {prevEp ? (
              <Link
                href={`/podcast/${episodeSlug(prevEp)}/`}
                style={{ textDecoration: "none", padding: "1.25rem", background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", transition: "border-color .18s" }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: ".4rem" }}>
                  &larr; Previous Episode
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-2)", lineHeight: 1.4 }}>Ep {prevEp.episode}: {prevEp.title}</div>
              </Link>
            ) : (
              <div />
            )}
            {nextEp ? (
              <Link
                href={`/podcast/${episodeSlug(nextEp)}/`}
                style={{ textDecoration: "none", textAlign: "right", padding: "1.25rem", background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)", transition: "border-color .18s" }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: ".4rem" }}>
                  Next Episode &rarr;
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-2)", lineHeight: 1.4 }}>Ep {nextEp.episode}: {nextEp.title}</div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
