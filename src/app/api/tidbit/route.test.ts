import { describe, it, expect, vi, afterEach } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

function makeRequest(url: string) {
  return new NextRequest(new URL(url, "http://localhost:3000"));
}

describe("GET /api/tidbit", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 200 with today's tidbit when no date param", async () => {
    const res = await GET(makeRequest("/api/tidbit"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("date");
    expect(body).toHaveProperty("text");
    expect(body.date).toMatch(/^\d{2}-\d{2}$/);
  });

  it("returns tidbit for a specific MM-DD date", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=03-14"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.date).toBe("03-14");
    expect(body.text).toContain("Pi Day");
  });

  it("accepts YYYY-MM-DD format", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=2026-03-14"));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.date).toBe("03-14");
  });

  it("includes source when the tidbit has one", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=03-14"));
    const body = await res.json();
    expect(body.source).toBeTruthy();
  });

  it("omits source when the tidbit has none", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=01-01"));
    const body = await res.json();
    expect(body).not.toHaveProperty("source");
  });

  it("returns 400 for invalid date format", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=not-a-date"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid date");
  });

  it("returns 400 for out-of-range MM-DD", async () => {
    const res = await GET(makeRequest("/api/tidbit?date=13-01"));
    expect(res.status).toBe(400);
  });

  it("returns the same tidbit for the same date", async () => {
    const res1 = await GET(makeRequest("/api/tidbit?date=07-04"));
    const res2 = await GET(makeRequest("/api/tidbit?date=07-04"));
    const body1 = await res1.json();
    const body2 = await res2.json();
    expect(body1.text).toBe(body2.text);
  });

  it("uses today's date when no param is given", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-20T12:00:00"));
    const res = await GET(makeRequest("/api/tidbit"));
    const body = await res.json();
    expect(body.date).toBe("07-20");
  });
});
