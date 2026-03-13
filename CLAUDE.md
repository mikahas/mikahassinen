# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

This is a **Next.js App Router** portfolio site for Mika Hassinen. All routes live under `src/app/` using file-based routing.

**Route structure:**
- `/` — Home page (under construction placeholder)
- `/teapot` — HTTP 418 themed page with RFC 2324 explanation
- `/admin`, `/free-bitcoin` — Rickroll Easter eggs (client-side redirects)
- `/api/teapot` — JSON API returning 418 status
- `/robots.txt` — Dynamic robots.txt with witty commentary

**Styling:** SCSS with CSS custom properties. Global variables in [globals.scss](src/app/globals.scss). Component styles use SCSS modules (`.module.scss`). Dark theme with Geist font family.

**Path alias:** `@/*` maps to `./src/*`.

## Site Personality

The site has a consistent **Star Trek theme**: the 404 page uses stardates, pages use Trek quotes and references ("Back to the ship", "Set a course for home"). The developer is described as "Developer. Trekkie. Enthusiast of nebulae with coffee." Maintain this tone when adding content.
