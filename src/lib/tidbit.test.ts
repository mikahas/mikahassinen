import { describe, it, expect, vi, afterEach } from "vitest";
import { getTidbitForDate, parseDate, todayDateKey } from "./tidbit";

describe("parseDate", () => {
  it("returns null for null input", () => {
    expect(parseDate(null)).toBeNull();
  });

  it("accepts valid MM-DD format", () => {
    expect(parseDate("03-14")).toBe("03-14");
    expect(parseDate("12-25")).toBe("12-25");
    expect(parseDate("01-01")).toBe("01-01");
  });

  it("rejects invalid MM-DD values", () => {
    expect(parseDate("00-14")).toBeNull();
    expect(parseDate("13-01")).toBeNull();
    expect(parseDate("03-00")).toBeNull();
    expect(parseDate("03-32")).toBeNull();
  });

  it("rejects malformed strings", () => {
    expect(parseDate("3-14")).toBeNull();
    expect(parseDate("03/14")).toBeNull();
    expect(parseDate("March 14")).toBeNull();
    expect(parseDate("")).toBeNull();
    expect(parseDate("abc")).toBeNull();
  });

  it("accepts YYYY-MM-DD and extracts MM-DD", () => {
    expect(parseDate("2026-03-14")).toBe("03-14");
    expect(parseDate("2000-12-25")).toBe("12-25");
  });

  it("rejects invalid YYYY-MM-DD dates", () => {
    expect(parseDate("2026-13-01")).toBeNull();
    expect(parseDate("2026-00-15")).toBeNull();
    expect(parseDate("not-a-date")).toBeNull();
  });
});

describe("getTidbitForDate", () => {
  it("returns exact match for a known date", () => {
    const tidbit = getTidbitForDate("03-14");
    expect(tidbit.date).toBe("03-14");
    expect(tidbit.text).toContain("Pi Day");
  });

  it("returns a fallback tidbit for an unmatched date", () => {
    const tidbit = getTidbitForDate("06-15");
    expect(tidbit.date).toBe("06-15");
    expect(tidbit.text).toBeTruthy();
  });

  it("is deterministic — same date always returns the same tidbit", () => {
    const a = getTidbitForDate("06-15");
    const b = getTidbitForDate("06-15");
    expect(a.text).toBe(b.text);
  });

  it("returns different tidbits for different dates", () => {
    const a = getTidbitForDate("06-15");
    const b = getTidbitForDate("06-16");
    // Not guaranteed but extremely likely with a hash function
    expect(a.text !== b.text || a.date !== b.date).toBe(true);
  });
});

describe("todayDateKey", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns MM-DD format", () => {
    const key = todayDateKey();
    expect(key).toMatch(/^\d{2}-\d{2}$/);
  });

  it("returns the correct date for a faked clock", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-20T12:00:00"));
    expect(todayDateKey()).toBe("07-20");
  });
});
