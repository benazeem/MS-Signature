# Pre-Launch Implementation Plan — MS Signature Scents

Generated: 2026-07-07

Overview: Prioritised tasks to bring the app to production readiness. Tasks are grouped P0 (blockers) → P3 (nice-to-have).

P0 — Launch blockers (must resolve before production)
- SEC-001: Confirm production `SITE_URL` and ensure `metadataBase` matches hosting origin
  - Related audit: SEO-001
  - Files: `lib/constants.ts`, `app/layout.tsx`
  - Approach: verify with stakeholder; if different, switch `SITE_URL` to env-driven value (e.g., `process.env.NEXT_PUBLIC_APP_URL`).
  - Risk: low
  - Auto-implement: NO (requires input)
- ECOM-001: Verify payment webhook & order verification
  - Related audit: X / Q
  - Files: `app/api/payment/*`, `prisma` models
  - Approach: run integration tests with Razorpay test keys; verify signature validation works and duplicate callback handling exists.
  - Risk: CRITICAL (payments)
  - Auto-implement: NO

P1 — High-priority production fixes
- SEO-002: Add `noindex` metadata to `/checkout`, `/cart`, `/login` routes (server-side metadata)
  - Related audit: A
  - Files: `app/checkout/page.tsx`, `app/cart/page.tsx`, `app/login/page.tsx`
  - Approach: set `export const metadata = { robots: { index: false } }` in those route files.
  - Risk: LOW
  - Auto-implement: YES
- SEC-002: Security headers (recommend): `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security` (host-edge)
  - Files: `next.config.ts` or hosting edge configuration
  - Approach: prepare `headers()` config referencing `process.env.NODE_ENV === 'production'` to apply only in production. Test on staging.
  - Risk: MEDIUM (needs staging verification)
  - Auto-implement: PARTIAL — create proposal in code but gated by env.

P2 — Important quality fixes
- A11Y-001: Keyboard & focus improvements — skip link added (implemented). Further: ensure focus styles for modal/dialogs.
  - Files: `components/layout/ClientLayout.tsx`, `components/*` dialogs
  - Auto-implement: NO (requires manual testing)
- PERF-001: LCP image audit — identify largest images and add `loading="eager"` and proper `sizes`/`priority` when LCP.
  - Files: ProductHero, ProductGallery, `components/home/Hero.tsx`
  - Auto-implement: NO (requires measurement)

P3 — Optional improvements
- Add analytics + consent flow
- Add Sentry/monitoring integration
- Add PWA manifest (if needed)

Validation & Rollout
- Run `npm run build` and `npm run lint` after implementing code changes.
- Deploy to staging and run Lighthouse + accessibility scanner.
- Validate payment flow in Razorpay test mode.

Change log (what I will implement now — safe & approved):
- Add route-level `noindex` metadata for checkout/cart/login (P1, safe)
- Add `skip-to-content` (done)
- Create audit & implementation plan docs (done)

Files to be changed in Phase 5 (if approved):
- `app/checkout/page.tsx` (add metadata noindex)
- `app/cart/page.tsx` (add metadata noindex)
- `app/login/page.tsx` (add metadata noindex)
- Optionally `next.config.ts` (headers)

If you approve, I will implement the P1 auto-implement tasks now (add `noindex` metadata for checkout, cart, login), run `npm run build` and `npm run lint`, and report results. Otherwise, tell me which items to proceed with.
