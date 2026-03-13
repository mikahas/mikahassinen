"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";

export default function ApiDocsPage() {
  return (
    <ApiReferenceReact
      configuration={{
        url: "/openapi.yaml",
        darkMode: true,
        theme: "saturn",
        metaData: {
          title: "API Docs | mikahassinen.dev",
        },
        customCss: `
          :root {
            --scalar-color-accent: #7eb8f7;
            --scalar-background-1: #0a0a0a;
            --scalar-background-2: #111111;
            --scalar-background-3: #1a1a1a;
            --scalar-color-1: #e8e8e8;
            --scalar-color-2: #888888;
            --scalar-font: var(--font-geist-sans), system-ui, sans-serif;
            --scalar-font-code: var(--font-geist-mono), 'Courier New', monospace;
          }
        `,
      }}
    />
  );
}
