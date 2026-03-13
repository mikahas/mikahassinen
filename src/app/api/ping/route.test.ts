import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/ping", () => {
  it("returns 200 with pong message", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
  });

  it("returns JSON content-type", async () => {
    const res = await GET();
    expect(res.headers.get("Content-Type")).toBe("application/json");
  });

  it("returns pong in body", async () => {
    const res = await GET();
    const body = await res.json();
    expect(body).toEqual({ message: "pong" });
  });
});
