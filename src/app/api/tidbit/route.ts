import { getTidbitForDate, parseDate, todayDateKey } from "@/lib/tidbit";
import { NextRequest } from "next/server";

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
    dateKey = todayDateKey();
  }

  const tidbit = getTidbitForDate(dateKey);

  return Response.json({
    date: dateKey,
    text: tidbit.text,
    ...(tidbit.source && { source: tidbit.source }),
  });
}
