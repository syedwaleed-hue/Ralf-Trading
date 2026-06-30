# RALF Trading

A premium institutional trading website for RALF Trading — a luxury hedge fund specializing in XAUUSD proprietary trading and capital management, founded in 2011 by Mr. Rahil Pasha.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- Frontend: `artifacts/ralf-trading/src/`
  - `components/ThreeBackground.tsx` — 3D Bitcoin coins + dollar bills (React Three Fiber); degrades to CSS fallback when WebGL unavailable
  - `components/LoadingScreen.tsx` — Cinematic GSAP intro with chart animation + gold particles
  - `components/Navbar.tsx` — Sticky glassmorphism navbar with music controls
  - `components/Footer.tsx` — Full footer with legal links + risk disclaimer
  - `context/MusicContext.tsx` — Music player state + `hasEntered` gate
  - `pages/` — Home, About, Solutions, FundedAccounts, Performance, Education, FAQ, Contact, Auth, RiskDisclosure, Privacy, Terms
- Brand assets: `attached_assets/Logo_1782644952934.png`, `attached_assets/20250210_232842.jpg_1782644556306.jpeg`
- Music: drop `public/music/soundtrack.mp3` into `artifacts/ralf-trading/public/music/` — player is wired up and waiting

## Architecture decisions

- Frontend-only — no backend routes or database needed; all data is mock/static
- WebGL detection: probe canvas with `WEBGL_debug_renderer_info` to detect software-only GPU (0xffff vendor) and use CSS fallback instead of crashing; real browsers get full Three.js 3D
- Music gated behind "Enter RALF Trading" click to respect browser autoplay policy; state persisted in localStorage
- All return figures presented as "targets" / "objectives" — never guaranteed (legal requirement)
- CSS fallback background uses radial gold/green gradients to match the Three.js aesthetic

## Product

- Cinematic entry experience with bullish chart animation, gold particles, logo reveal, and "Enter RALF Trading" CTA
- 3D background: glowing Bitcoin coins + floating dollar bills with glow, sparkles, blur, random sizes, and mouse parallax
- Full 12-page site: Home, About, Solutions, Funded Accounts, Performance, Education, FAQ, Contact, Auth, Risk Disclosure, Privacy, Terms
- Live mock trading tickers (BTC/USD, XAUUSD, EUR/USD, NASDAQ) with animated recharts
- Premium music player integrated into navbar (drop your own MP3 at `public/music/soundtrack.mp3`)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
