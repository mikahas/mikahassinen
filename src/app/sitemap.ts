import { readdirSync, statSync } from "fs";
import { join } from "path";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikahassinen.net";

/** Routes to exclude from the sitemap (easter eggs, redirects, etc.) */
const EXCLUDED_ROUTES = new Set(["/admin"]);

function getAppRoutes(dir: string, prefix = ""): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (!statSync(fullPath).isDirectory()) continue;

    // Skip Next.js internals and API/resource routes
    if (entry.startsWith("_") || entry === "api" || entry.endsWith(".txt")) {
      continue;
    }

    const routePath = `${prefix}/${entry}`;

    // Check if this directory has a page file
    const hasPage = readdirSync(fullPath).some((f) =>
      /^page\.(tsx?|jsx?)$/.test(f)
    );

    if (hasPage && !EXCLUDED_ROUTES.has(routePath)) {
      routes.push(routePath);
    }

    // Recurse into subdirectories
    routes.push(...getAppRoutes(fullPath, routePath));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), "src", "app");
  const dynamicRoutes = getAppRoutes(appDir);

  // Always include the root route
  const routes = ["/", ...dynamicRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
