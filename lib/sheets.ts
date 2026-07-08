/**
 * Google Sheets Data Fetcher (Server-Side)
 * Fetches data at build time from published Google Sheets via gviz endpoint.
 * Pattern ported from RIDA website (data/sheets.js).
 */

const SHEET_ID = '167uuWRXLROf2MC91By9ofA-G6RTvePN0yEwItJdmQAU';

interface GvizCell {
  v: string | number | boolean | null;
  f?: string;
}

function cellValue(cell: GvizCell | null): string {
  if (!cell) return '';
  // When Google Sheets treats a cell as a date, gviz returns two representations:
  //   v = "Date(YYYY,M,D)"    ← month is 0-indexed, locale-INDEPENDENT
  //   f = "1/13/2026"          ← human-readable, varies with Sheet locale
  //
  // Preferring `f` breaks downstream date parsing because locale-dependent
  // formats are ambiguous (1/13 could be Jan 13 or 1st Mar). We prefer `v`
  // when it looks like a Date() and normalize to dd-mm-yyyy so the rest of
  // the app has a single, unambiguous format to parse.
  if (typeof cell.v === 'string') {
    const dateFn = cell.v.match(/^Date\((\d+),(\d+),(\d+)/);
    if (dateFn) {
      const y = dateFn[1];
      const mo = String(parseInt(dateFn[2], 10) + 1).padStart(2, '0');
      const d = dateFn[3].padStart(2, '0');
      // yyyy-mm-dd is ISO-native, sortable via string comparison, and
      // parseable by `new Date()`. All downstream code either works with
      // this directly (events, webinars) or is already tolerant to it
      // (podcast formatters).
      return `${y}-${mo}-${d}`;
    }
  }
  if (cell.f !== undefined && cell.f !== null && cell.f !== '') {
    return String(cell.f).trim();
  }
  if (cell.v === null || cell.v === undefined) return '';
  return String(cell.v).trim();
}

interface GvizRow {
  c: (GvizCell | null)[];
}

interface GvizTable {
  cols: { label: string }[];
  rows: GvizRow[];
}

interface GvizResponse {
  table: GvizTable;
}

export async function fetchSheet(sheetName: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url, { cache: "force-cache" });
  const text = await res.text();

  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) throw new Error(`Failed to parse gviz response for sheet: ${sheetName}`);

  const json: GvizResponse = JSON.parse(match[1]);
  const cols = json.table.cols.map((c) => c.label.trim());

  return json.table.rows
    .filter((row) => row.c && row.c.some((cell) => cell && (cell.v !== null || (cell.f !== undefined && cell.f !== ''))))
    .map((row) => {
      const obj: Record<string, string> = {};
      row.c.forEach((cell, i) => {
        if (cols[i]) {
          obj[cols[i]] = cellValue(cell);
        }
      });
      return obj;
    });
}

// ── Typed fetchers ────────────────────────────────────────────────────────────

export interface Podcast {
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
  date_iso: string;     // format: dd-mm-yyyy (e.g. "22-04-2026")
  duration: string;     // format: MM:SS or H:MM:SS (e.g. "45:23" or "1:20:40")
}

export interface Event {
  date_iso: string;
  day: string;
  month_year: string;
  time: string;
  title: string;
  description: string;
  register_url: string;
  Panelists: string;
  webinarID: string;
  image_urls: string;
  zoom_account: string;
  banner_url: string;
}

export interface Webinar {
  date_iso: string;
  day: string;
  month_year: string;
  title: string;
  'description - Key notes': string;
  webinar_url: string;
  image_url: string;
}

export interface Review {
  reviewer_name: string;
  firm_name: string;
  rating: string;
  review_text: string;
  platform: string;
  photo_url: string;
  date: string;
}

export async function getPodcasts(): Promise<Podcast[]> {
  const rows = await fetchSheet('podcasts');
  return rows
    .filter((r) => r.episode && r.title)
    .sort((a, b) => {
      const epA = parseInt(a.episode) || 0;
      const epB = parseInt(b.episode) || 0;
      return epB - epA; // Newest first
    }) as unknown as Podcast[];
}

export async function getEvents(): Promise<Event[]> {
  const rows = await fetchSheet('events');
  // Filter out EXAMPLE rows and past events
  return rows.filter((r) => {
    if (!r.title || !r.date_iso) return false;
    const firstCol = Object.values(r)[0];
    if (firstCol === 'EXAMPLE') return false;
    return true;
  }) as unknown as Event[];
}

export async function getUpcomingEvents(): Promise<Event[]> {
  // Return all valid events; the client component sorts upcoming first, past after.
  const events = await getEvents();
  const today = new Date().toISOString().split('T')[0];
  const upcoming = events
    .filter((e) => e.date_iso >= today)
    .sort((a, b) => a.date_iso.localeCompare(b.date_iso));
  const past = events
    .filter((e) => e.date_iso < today)
    .sort((a, b) => b.date_iso.localeCompare(a.date_iso));
  return [...upcoming, ...past];
}

export async function getWebinars(): Promise<Webinar[]> {
  const rows = await fetchSheet('Webinars');
  return rows.filter((r) => r.title && r.webinar_url) as unknown as Webinar[];
}

export async function getReviews(): Promise<Review[]> {
  const rows = await fetchSheet('reviews');
  return rows.filter((r) => r.reviewer_name && r.review_text) as unknown as Review[];
}

export interface Partner {
  name: string;
  title: string;
  bio: string;
  image_url: string;
  more_info: string;
}

export async function getPartners(): Promise<Partner[]> {
  const rows = await fetchSheet('Partners');
  return rows.filter((r) => r.name && r.name.trim()) as unknown as Partner[];
}

export function partnerSlug(partner: Pick<Partner, 'name'>): string {
  return partner.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image_url: string;
  published: string;
}

export async function getBlogs(): Promise<BlogPost[]> {
  const rows = await fetchSheet('blogs');
  return rows
    .filter((r) => r.title && r.slug && r.published?.toLowerCase() === 'true')
    .sort((a, b) => {
      // Newest first by date
      if (a.date && b.date) return b.date.localeCompare(a.date);
      return 0;
    }) as unknown as BlogPost[];
}

// ── Utility: Generate slug from episode ──────────────────────────────────────

export function podcastSlug(episode: Podcast): string {
  const ep = episode.episode.replace(/\D/g, '');
  const titleSlug = episode.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return `${ep}-${titleSlug}`;
}

export function webinarSlug(webinar: Webinar): string {
  const titleSlug = webinar.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  // Prefix with date to guarantee uniqueness — two webinars with similar titles
  // would otherwise collide and 404. Falls back to title-only if date missing.
  const date = (webinar.date_iso || '').trim();
  return date ? `${date}-${titleSlug}` : titleSlug;
}

// ── Utility: Convert Google Drive share URLs to direct image CDN URLs ────────
// Drive sharing URLs like https://drive.google.com/file/d/{FILE_ID}/view?...
// serve an HTML page, not the image. To embed in <img src>, we extract the
// file ID and rewrite to https://lh3.googleusercontent.com/d/{FILE_ID}, which
// is the actual Google image CDN (fast, supports sizing).
//
// Pass-through behavior: any non-Drive URL is returned unchanged.
//
// Recognised Drive URL patterns:
//   https://drive.google.com/file/d/{ID}/view
//   https://drive.google.com/file/d/{ID}/view?usp=sharing
//   https://drive.google.com/open?id={ID}
//   https://drive.google.com/uc?id={ID}
//   https://drive.google.com/uc?export=view&id={ID}
//   https://drive.google.com/thumbnail?id={ID}
export function driveImageUrl(url: string, sizePx: number = 1200): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Already a googleusercontent CDN URL — pass through
  if (trimmed.includes('googleusercontent.com')) return trimmed;

  // Not a Drive URL — return unchanged
  if (!trimmed.includes('drive.google.com')) return trimmed;

  // Extract file ID from any of the recognised patterns
  const patterns = [
    /\/file\/d\/([\w-]{20,})/,        // /file/d/ID/view
    /[?&]id=([\w-]{20,})/,             // ?id=ID or &id=ID
    /\/d\/([\w-]{20,})/,               // generic /d/ID
  ];
  let id = '';
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) { id = m[1]; break; }
  }
  if (!id) return trimmed; // unknown Drive URL — leave as-is rather than break

  // Use lh3.googleusercontent.com — direct CDN, supports =wN-hN sizing params
  return `https://lh3.googleusercontent.com/d/${id}=w${sizePx}`;
}
