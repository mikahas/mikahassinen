# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
npm test             # Run tests (Vitest)
npm run test:w       # Run tests in watch mode
```

## Architecture

This is a **Next.js App Router** portfolio site for Mika Hassinen. All routes live under `src/app/` using file-based routing.

**Route structure:**
- `/` — Home page (under construction placeholder)
- `/teapot` — HTTP 418 themed page with RFC 2324 explanation
- `/admin` — Rickroll Easter egg (client-side redirect)
- `/api/teapot` — JSON API returning 418 status
- `/robots.txt` — Dynamic robots.txt with witty commentary

**Styling:** SCSS with CSS custom properties. Global variables in [globals.scss](src/app/globals.scss). Component styles use SCSS modules (`.module.scss`). Dark theme with Geist font family.

**Path alias:** `@/*` maps to `./src/*`.

## Testing Policy

Every new feature or route **must** include tests. Place test files next to the source file using the `.test.ts` / `.test.tsx` naming convention.

A **pre-commit hook** runs both ESLint and the full test suite (`vitest run`) automatically. Commits will be blocked if any test fails, so make sure tests pass locally before committing.

## Site Personality

The site draws from a mix of **sci-fi and nerd culture** references. Existing content leans Star Trek (stardates on the 404 page, "Back to the ship", "Set a course for home"), but new content should rotate through these universes to keep things fresh:

- **Star Trek** — stardates, ship/crew metaphors, Trek quotes
- **The Expanse** — Belter Creole slang, protomolecule references, "doors and corners" wisdom
- **The Hitchhiker's Guide to the Galaxy** — "Don't Panic", 42, improbability, towels, Vogon poetry
- **WALL-E** — gentle robot optimism, directive references, "plant in a boot" vibes

The developer is described as "Developer. Trekkie. Enthusiast of nebulae with coffee." Maintain a playful, nerdy tone when adding content — just vary the source material.
