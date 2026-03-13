"use client";

import { useEffect } from "react";

export default function ConsoleGreeting() {
  useEffect(() => {
    const nav = navigator;
    const perf = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming | undefined;

    const loadTime = perf
      ? Math.round(perf.loadEventEnd - perf.startTime)
      : "N/A";
    const dnsTime = perf
      ? Math.round(perf.domainLookupEnd - perf.domainLookupStart)
      : "N/A";
    const domElements = document.querySelectorAll("*").length;
    const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } })
      .memory;
    const heapMB = memory
      ? (memory.usedJSHeapSize / 1024 / 1024).toFixed(1)
      : "N/A";
    const connection = (nav as unknown as { connection?: { effectiveType?: string } })
      .connection;
    const connType = connection?.effectiveType ?? "unknown";
    const cores = nav.hardwareConcurrency ?? "unknown";
    const viewport = `${window.innerWidth}×${window.innerHeight}`;
    const pixelRatio = window.devicePixelRatio;
    const lang = nav.language;
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const hash = (process.env.NEXT_PUBLIC_COMMIT_HASH ?? "dev").slice(0, 7);
    console.log(
      [
        "%c",
        "  ╔════════════════════════════════════════════╗",
        `  ║  mikahassinen.net @ ${hash}                ║`,
        "  ║                                            ║",
        "  ║  Oh hey, a fellow console dweller!         ║",
        "  ║  Since you're here, have some stats:       ║",
        "  ╚════════════════════════════════════════════╝",
        "",
      ].join("\n"),
      "color: #00ff88; font-family: monospace; font-size: 12px;"
    );

    console.log(
      `%c  📊 Page stats
  ─────────────────────────────────
  Page load        ${loadTime}${typeof loadTime === "number" ? "ms" : ""}
  DNS lookup       ${dnsTime}${typeof dnsTime === "number" ? "ms" : ""}
  DOM elements     ${domElements}
  JS heap          ${heapMB}${heapMB !== "N/A" ? " MB" : ""}

  🖥️  Your setup
  ─────────────────────────────────
  Viewport         ${viewport} @${pixelRatio}x
  CPU cores        ${cores}
  Connection       ${connType}
  Language         ${lang}
  Dark mode        ${darkMode ? "yes (good taste)" : "no (bold choice)"}

  💡 Tip: this site has a /teapot
`,
      "color: #aaa; font-family: monospace; font-size: 11px;"
    );
  }, []);

  return null;
}
