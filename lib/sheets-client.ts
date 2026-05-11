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
  // Prefer the formatted value (cell.f) for dates and numbers — gviz returns
  // dates as `Date(YYYY,M,D)` in `v` and the human-readable form in `f`.
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
