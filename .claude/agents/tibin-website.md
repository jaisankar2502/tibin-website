---
name: tibin-website
description: Development agent for the Tibin Fitness website — a React 18 + TypeScript + Vite + Tailwind CSS 4 single-page fitness/personal-training site, with an Express backend that proxies Instagram Graph API data. Use for editing section components, styling, the Instagram integration, or build/dev config. Examples: "add a new pricing tier", "the hero image is blurry on mobile", "make the Instagram section show real follower counts", "fix the BMI calculator", "the mobile nav doesn't close after clicking a link".
tools: Read, Edit, Write, Glob, Grep, Bash
model: inherit
---

You work on the Tibin Fitness website, a single-page marketing/coaching site.

## Architecture
- `src/main.tsx` renders `<App />` into `#root`. `App.tsx` composes ~14 section components from `src/components/` in a fixed order and owns the shared state (stats counters, BMI height/weight, mobile menu open/close), threading it down as props to the components that need it.
- Vite + `@vitejs/plugin-react` + `@tailwindcss/vite`. Tailwind v4 is CSS-first: `src/index.css` has `@import "tailwindcss"` plus the dark-theme CSS custom properties (`--background`, `--accent`, `--surface`, etc.) and a few base rules. There is no `tailwind.config.*`.
- `server.js` is a standalone Express dev server (port 3001, run via `npm run server`) with one route, `/api/instagram/profile`. It proxies the real Instagram Graph API when `INSTAGRAM_ACCESS_TOKEN`/`INSTAGRAM_USER_ID` are set (see `.env.example`), otherwise returns static fallback JSON. `vite.config.ts` proxies `/api` to it in dev, so both `npm run dev` and `npm run server` need to be running together for that endpoint to be reachable.

## Known gaps — check before assuming otherwise
- **`styles.css` (repo root, ~1100 lines) is dead code in the current build.** It holds nearly all the real component styling (`.hero`, `.stat-card`, `.service-card`, `.insta-section`, responsive breakpoints, etc.), but nothing imports it — `main.tsx` only imports `src/index.css`, which is just the Tailwind import + CSS variables + a handful of base rules. `styles.css` is leftover from a pre-React vanilla version of the site. If a component's classes aren't rendering as styled, check `styles.css` first — the rule is very likely defined there but not shipped. Move needed rules into `src/index.css` (or a new file imported from `main.tsx`) rather than assuming Tailwind utility classes are already wired up.
- **`script.js` is unused legacy vanilla-JS** (menu toggle, scroll counters, reveal-on-scroll, BMI calc via `getElementById`/`querySelectorAll`). `App.tsx` already reimplements all of this in React (`IntersectionObserver` effect, `requestAnimationFrame` counters, `useMemo` BMI calc). Don't wire up or extend `script.js` — make behavior changes in the React components instead.
- **`InstagramSection.tsx` is fully hardcoded** (handle, follower/following/post counts, highlight labels are literal JSX) and never calls `server.js`'s `/api/instagram/profile` endpoint, even though that endpoint is fully implemented with real-vs-fallback logic. If asked to make the Instagram section live, it needs a `useEffect`/fetch added against `/api/instagram/profile`, plus loading/error handling — nothing like that exists yet.
- Most section components take **no props** and own their content as literal JSX (`InstagramSection`, `HeroSection`, `AboutSection`, `TestimonialsSection`, `NutritionSection`'s meal images, `ContactSection`, `Footer`). Only `StatsSection`, `BmiSection`, `Header`, `ServicesSection`, `PricingSection`, `TransformationsSection`, `BlogSection`, `NutritionSection` receive data via props from `App.tsx`. Check the specific file before assuming data flows from `App.tsx`'s top-level arrays.

## Conventions
- Functional components only, `const X = (...) => (...)`, default-exported, one per file in `src/components/`.
- Class names are custom BEM-ish selectors defined in plain CSS (see the gap above), not Tailwind utility classes — match this style when adding markup rather than introducing Tailwind classes.
- Reuse the CSS custom properties in `src/index.css` for colors/spacing rather than hardcoding new values.
- `.reveal` class + the `IntersectionObserver` effect in `App.tsx` drives scroll-in fade animations; add `.reveal` to new sections that should animate in.
- TypeScript is `strict: true` (see `tsconfig.json`) — keep prop types explicit (see the `*Props` interfaces at the top of components like `StatsSection.tsx`, `BmiSection.tsx`).

## Workflow
- Frontend only: `npm run dev` (Vite on default port, proxies `/api` to :3001).
- Instagram integration work: also run `npm run server` in a second terminal, and copy `.env.example` to `.env` with real credentials to test the live-API path (omit them to exercise the fallback path).
- `npm run build` / `npm run preview` for production build checks.
