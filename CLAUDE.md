# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

Frontend client (Next.js 16 App Router) for **AI Study Mentor**, an AI-driven study planning platform. This repo is the client only — it talks to a separate backend at `NEXT_PUBLIC_BASE_URL` (default `http://localhost:5000`) for all business data (goals, chat, roadmaps, analytics, study plan generation). Auth session storage (MongoDB via Better-Auth) is the one piece of backend state this app owns directly.

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

No test runner is configured in this repo.

## Next.js 16 — read this before touching routing/auth

This project is on **Next.js 16.2.10** and **React 19.2.4**, ahead of most training data. Per `AGENTS.md`, consult `node_modules/next/dist/docs/` before writing code that touches routing, proxy, or server APIs — conventions have changed from earlier Next.js versions. Key ones already in play here:

- **`middleware.ts` is renamed to `proxy.ts`** (Next 16.0+). This repo uses `src/proxy.ts`, exporting a `proxy` function (not `middleware`). Don't reintroduce a `middleware.ts` file or `export function middleware`.
- Proxy's `matcher` only guards page rendering, not Server Functions on the same route reliably — the docs warn a matcher change can silently drop coverage of Server Actions. Auth checks belong in both `proxy.ts` and inside server actions/route handlers, not proxy alone (this codebase already does the latter via `serverMutation`/`protectedFetch`, which redirect on 401/403 from the backend).
- Proxy defaults to the Node.js runtime here; don't add a `runtime` export to `proxy.ts` — it will throw.

## Architecture

### Route groups (`src/app`)

- `(auth)` — `/login`, `/register`, no shared chrome.
- `(withCommonLayout)` — public marketing/info pages (`/`, `/about`, `/blog`, `/contact`, `/explore-roadmaps`), wrapped with the shared `Navbar`/`Footer`.
- `(withDashboardLayout)` — authenticated app (`/dashboard`, `/dashboard/goals`, `/dashboard/chat`, `/dashboard/analytics`, `/dashboard/settings`, `/dashboard/profile`), wrapped with `DashboardSidebar`/`DashboardNavbar`.
- `api/auth/[...all]` — Better-Auth's catch-all handler (`toNextJsHandler(auth)`); do not add manual auth routes alongside it.
- `api/contact` — the only other real route handler; owns its own IP rate limiting, honeypot field, and minimum-submit-time bot check before validating with Zod and sending mail via Nodemailer.

`src/proxy.ts` protects `/dashboard/:path*` — no token from `getTokenServer()` → redirect to `/unauthorized?callbackUrl=<path>`.

### Auth (Better-Auth + MongoDB)

- `src/lib/auth.ts` — server-side Better-Auth instance: MongoDB adapter, email/password + Google OAuth, `jwt()` plugin. Throws at import time if `MONGODB_URI` is unset.
- `src/lib/auth-client.ts` — browser client (`authClient`, `signIn`/`signUp`/`signOut`/`useSession`) via `better-auth/react`.
- `src/lib/core/BetterAuthToken.ts` — `getTokenServer()` pulls the JWT via `auth.api.getToken({ headers })`. Server-only (uses `next/headers`); never import into client components.
- `src/lib/core/server.ts` — the data-fetching layer talking to the external backend, all server-only (no `"use server"` — plain server utils, not Server Actions):
  - `serverFetch` — public GET, no auth header.
  - `protectedFetch` — GET with `Authorization: Bearer <token>` attached.
  - `serverMutation` — POST/PUT/PATCH/DELETE with the auth header.
  - All three funnel through `handleStatus`, which redirects to `/login` on 401 and `/404` on 403, and throws on other non-OK responses using the backend's `message`/`msg` field.

### Data flow pattern

`src/lib/actions/*.ts` are Server Actions (`"use server"`) that wrap `serverMutation` calls and normalize results to `{ success: true, data } | { success: false, error }` — components branch on `.success` rather than try/catch. `src/lib/api/*.ts` are plain server-side read functions (no `"use server"`) built on `serverFetch`/`protectedFetch`, called directly from Server Components. Follow this action-vs-api split for new backend calls rather than calling `fetch` directly from components.

### Goal-centric domain model

Everything in the dashboard hangs off a `Goal` (`src/lib/actions/goals.ts`): a goal has a `GeneratedStudyPlan` (daily routine, weekly roadmap, milestones, resources, practice/revision schedules, tips) and a `completedTaskKeys` list driving `progress`/`status` (`on-track` | `at-risk` | `completed`). The AI chat (`src/lib/actions/chat.ts`) is goal-scoped — `sendChatMessageAction(goalId, message)` — the backend assembles context (goal, roadmap, weak topics, history) server-side from the goal id; the client never assembles chat context itself.

### Styling

Tailwind CSS v4, imported directly in `src/app/globals.css` (no `tailwind.config.js` — v4 uses CSS-based config/tokens). `next-themes` (`src/components/providers/ThemeProvider.tsx`) drives light/dark; new UI should support both via Tailwind dark-mode classes, matching existing components (`ThemeToggle.tsx`).

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).
