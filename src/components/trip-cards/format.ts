const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function parseISO(iso?: string | null) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  return { y, m: m - 1, d, t: Date.UTC(y, m - 1, d) };
}

// "11–13 Apr 2025", or null if either date is missing or not a real date.
export function dateRange(checkIn?: string | null, checkOut?: string | null): string | null {
  const a = parseISO(checkIn);
  const b = parseISO(checkOut);
  if (!a || !b) return null;
  const start = a.m === b.m ? `${a.d}` : `${a.d} ${MONTHS[a.m]}`;
  return `${start}–${b.d} ${MONTHS[b.m]} ${b.y}`;
}

// ["Sat", "12"] for "2025-04-12", or null.
export function weekdayAndDay(iso?: string | null): [string, string] | null {
  const p = parseISO(iso);
  if (!p) return null;
  return [DAYS[new Date(p.t).getUTCDay()], String(p.d)];
}

// 2 -> "2 hours", 1 -> "1 hour", 2.5 -> "2.5 hours", missing -> null
export function hoursLabel(h?: number | null): string | null {
  if (typeof h !== "number" || Number.isNaN(h)) return null;
  return `${h} ${h === 1 ? "hour" : "hours"}`;
}

export function hasNumber(n?: number | null): n is number {
  return typeof n === "number" && !Number.isNaN(n);
}

export function money(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
