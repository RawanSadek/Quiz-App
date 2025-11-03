// src/utils/formatDate.ts
export function formatDate(
  value?: string | number | Date | null,
  opts: Intl.DateTimeFormatOptions = {}
): string {
  if (value == null) return "—";

  const toDate = (v: string | number | Date) => {
    if (typeof v === "number") {
      const ms = v < 1e12 ? v * 1000 : v;
      return new Date(ms);
    }
    if (typeof v === "string") {
      if (/^-?\d+(\.\d+)?$/.test(v)) {
        const n = Number(v);
        const ms = n < 1e12 ? n * 1000 : n;
        return new Date(ms);
      }
      return new Date(v);
    }
    return v instanceof Date ? v : new Date(v);
  };

  const d = toDate(value);
  if (isNaN(d.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    dateStyle: "medium",
    timeStyle: "short",
    hour12: false,
    ...opts,
  }).format(d);
}
