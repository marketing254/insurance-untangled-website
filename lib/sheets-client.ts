/**
 * Client-side Google Sheets fetcher (same pattern as RIDA data/sheets.js)
 * Used in listing pages for instant reflection of sheet changes.
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

export async function fetchSheetClient(sheetName: string): Promise<Record<string, string>[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  const text = await res.text();

  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/);
  if (!match) return [];

  const json = JSON.parse(match[1]);
  const cols: string[] = json.table.cols.map((c: { label: string }) => c.label.trim());

  return json.table.rows
    .filter((row: { c: (GvizCell | null)[] }) =>
      row.c && row.c.some((cell) => cell && (cell.v !== null || (cell.f !== undefined && cell.f !== '')))
    )
    .map((row: { c: (GvizCell | null)[] }) => {
      const obj: Record<string, string> = {};
      row.c.forEach((cell, i: number) => {
        if (cols[i]) {
          obj[cols[i]] = cellValue(cell);
        }
      });
      return obj;
    });
}
