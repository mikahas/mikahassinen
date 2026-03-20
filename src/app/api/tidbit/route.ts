import { tidbits } from "@/data/tidbits";
import { NextRequest } from "next/server";

/**
 * Deterministically pick a tidbit for days that have no dedicated entry.
 * Uses a simple hash of the MM-DD string to index into the pool.
 */
function hashDate(date: string): number {
  let h = 0;
  for (let i = 0; i < date.length; i++) {
    h = (h * 31 + date.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getTidbitForDate(dateStr: string) {
  // Try exact match first
  const exact = tidbits.find((t) => t.date === dateStr);
  if (exact) return exact;

  // Deterministic fallback from the pool
  const index = hashDate(dateStr) % tidbits.length;
  return { ...tidbits[index], date: dateStr };
}

function parseDate(param: string | null): string | null {
  if (!param) return null;

  // Accept MM-DD directly
  if (/^\d{2}-\d{2}$/.test(param)) {
    const [m, d] = param.split("-").map(Number);
    if (m >= 1 && m <= 12 && d >= 1 && d <= 31) return param;
  }

  // Accept YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(param)) {
    const parsed = new Date(param + "T00:00:00");
    if (!isNaN(parsed.getTime())) {
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      return `${mm}-${dd}`;
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const dateParam = searchParams.get("date");

  let dateKey: string;

  if (dateParam) {
    const parsed = parseDate(dateParam);
    if (!parsed) {
      return Response.json(
        { error: "Invalid date. Use MM-DD or YYYY-MM-DD format." },
        { status: 400 }
      );
    }
    dateKey = parsed;
  } else {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    dateKey = `${mm}-${dd}`;
  }

  const tidbit = getTidbitForDate(dateKey);

  return Response.json({
    date: dateKey,
    text: tidbit.text,
    ...(tidbit.source && { source: tidbit.source }),
  });
}
