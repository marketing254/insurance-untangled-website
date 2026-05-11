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
  // Prefer the formatted value (cell.f) for dates and numbers — gviz returns
  // dates as `Date(YYYY,M,D)` in `v` and the human-readable form in `f`.
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
  return titleSlug;
}
