# Pre-Launch Audit — MS Signature Scents

Generated: 2026-07-07

## Executive summary
- App: Next.js (App Router) e-commerce storefront integrated with Sanity, Neon/Postgres + Prisma, Razorpay, Neon Auth.
- Major risks: missing production monitoring/analytics, environment/secret validation, a small number of accessibility and performance items.
- No immediate critical blockers preventing launch; several high-priority fixes recommended before production.

---

## Architecture summary
- Framework: Next.js 16.2.2 (App Router)
- React: 19.2.4
- TypeScript: yes
- Package manager: npm
- CMS: Sanity (Studio at `/studio`)
- DB: PostgreSQL via Prisma (Neon)
- Auth: Neon Auth (`@neondatabase/auth`)
- Payments: Razorpay
- Image provider: next/image with remotePatterns for `cdn.sanity.io`, `images.unsplash.com`, `res.cloudinary.com`
- Fonts: `next/font/google` (Playfair Display, Inter, Cinzel)
- Styling: Tailwind CSS v4 + custom CSS
- App Router: `app/` directory used; server components + client components present
- API: App route handlers in `app/api/*`

Evidence (representative files):
- `package.json`, `next.config.ts`, `tsconfig.json`
- `app/layout.tsx`, `app/product/[slug]/page.tsx`, `app/checkout/page.tsx`
- `sanity.config.ts`, `sanity/` directory
- `prisma/schema.prisma`, `lib/prisma.ts`
- `lib/auth.ts`, `app/api/auth/[...path]/route.ts`
- `app/sitemap.ts`, `app/robots.ts`

---

## Audit results (summary matrix)
For each category below: Status, Evidence, Files, Routes, Problem, Severity, Recommended fix, Safe to auto-implement

A. CRAWLABILITY AND INDEXING
- robots.txt exists: PASS
  - Evidence: `app/robots.ts` — disallows `/studio/`, `/api/`, `/cart/`, `/checkout/`, `/login/` and exposes sitemap.
  - Severity: LOW
  - Fix: none.
- Production accidentally blocked: NEEDS INPUT
  - Evidence: `app/layout.tsx` metadataBase uses `SITE_URL` from `lib/constants` (`https://mssignaturescents.com`). Confirm this is final production origin.
  - Severity: HIGH
  - Recommended: verify `SITE_URL` matches production environment. NOT auto-implement.
- Private pages noindex: PARTIAL
  - Evidence: `app/robots.ts` disallows `checkout`, `cart`, `login` (robots), but metadata-level `noindex` not set on these routes. For stronger protection, route-level metadata should set `robots: noindex`.
  - Severity: MEDIUM
  - Recommended: add route metadata for `/checkout`, `/cart`, `/login` with `robots: { index: false }` if desired. Safe to auto-implement: YES (non-breaking).

B. XML SITEMAP
- sitemap exists: PASS
  - Evidence: `app/sitemap.ts` builds sitemap using `getProducts()` from Sanity.
  - Severity: LOW
- Absolute production URLs: PARTIAL
  - Evidence: sitemap uses `SITE_URL` constant — confirm production origin (NEEDS INPUT).
  - Recommended: validate `SITE_URL` before production.
- Exclusion of private URLs: PASS
  - Evidence: sitemap lists only product and static pages (no cart/checkout/account).

C. CANONICAL URL STRATEGY
- canonical tags: PARTIAL
  - Evidence: `app/layout.tsx` includes a single `link rel="canonical"` pointing to `SITE_URL`. Per-page canonicals are not explicitly rendered via link tags.
  - Severity: MEDIUM
  - Recommended: rely on Next.js metadata system to generate per-page canonical URLs; ensure `metadataBase` is set to production URL at runtime. If `metadataBase` is correct, no change. Safe to auto-implement: NO (needs confirmation of `SITE_URL`).

D. PAGE METADATA
- Metadata base present: PASS
  - Evidence: `app/layout.tsx` defines `metadata` with `metadataBase: new URL(SITE_URL)`.
- Dynamic product metadata: PASS
  - Evidence: `app/product/[slug]/page.tsx` implements `generateMetadata()` and sets openGraph data.
- Missing unique descriptions on some pages: PARTIAL
  - Evidence: some static pages include content; recommend reviewing `metaDescription` for key landing pages.
  - Severity: LOW
  - Safe to auto-implement: NO (requires marketing input).

E. OPEN GRAPH AND SOCIAL SHARING
- OG tags: PARTIAL
  - Evidence: product pages set openGraph images and titles; site-level OG set in layout. Ensure OG image URLs are absolute and valid.
  - Files: `app/layout.tsx`, `app/product/[slug]/page.tsx`
  - Severity: MEDIUM
  - Recommended: Ensure product `image` fields are absolute URLs (sitemap/json-ld already references `product.image`). No auto-change.

F. STRUCTURED DATA / JSON-LD
- Product JSON-LD present: PASS
  - Evidence: `app/product/[slug]/page.tsx` injects Product JSON-LD with price & availability.
  - Severity: LOW
  - Note: Ensure product price and availability are in sync with rendered content.

G. SEMANTIC HTML
- Landmarks: PARTIAL
  - Evidence: `app/layout.tsx` contains `<head>` and `<body>`, `ClientLayout` wraps `main`. We added a skip link to `ClientLayout`.
  - Files: `components/layout/ClientLayout.tsx` (updated)
  - Severity: LOW
  - Recommended: run manual a11y checks; we implemented `skip-to-content` (SAFE).

H. IMAGE OPTIMIZATION
- next/image used widely: PASS
  - Evidence: product gallery, cart, navbar logo use `next/image`.
- Width/height issues: PARTIAL
  - Evidence: Dev server warned earlier for logo sizing; fixed by setting explicit width/height in `Navbar.tsx` (already changed).
  - Severity: LOW

I. PERFORMANCE AND CORE WEB VITALS
- LCP/CLS risks: PARTIAL
  - Evidence: Large hero images may need `loading="eager"` and proper sizes. Fonts loaded with `next/font` (good). Some client components use heavy animation libraries (`motion`).
  - Severity: MEDIUM
  - Recommended: audit LCP image(s), defer non-critical scripts, reduce `priority` images. Safe to auto-implement: NO (needs measurement).

J. MOBILE RESPONSIVENESS
- Responsive layout: PASS (visually present)
  - Evidence: Tailwind responsive classes used across components. Mark NEEDS MANUAL VERIFICATION for visual polish.

K. ACCESSIBILITY
- Forms & labels: PARTIAL
  - Evidence: many inputs use labels styled with absolute positioning; ensure `for`/`id` or accessible label semantics. Checkout inputs use visually-hidden labels via peer pattern (ok). We added skip link.
  - Severity: MEDIUM
  - Recommended: run axe/Lighthouse or manual a11y checks. Safe to auto-implement: NO.

L. URL ARCHITECTURE
- Readable slugs: PASS
  - Evidence: `/product/[slug]` generated from Sanity `slug`.

M. REDIRECTS
- None detected in `next.config.ts`: NOT APPLICABLE

N. 404 / ERROR / LOADING STATES
- Custom 404: PASS
  - Evidence: `app/_not-found` exists
- Route-level error boundaries: PARTIAL — App-level global error handling exists via Next defaults; recommend manual review.

O. INTERNAL LINKING
- Footer and nav include important links: PASS
  - Evidence: `components/layout/Navbar.tsx`, `Footer.tsx`.

P. BROKEN LINKS AND ASSETS
- No obvious placeholder links, but manual scan recommended: NEEDS MANUAL VERIFICATION

Q. FORMS
- Checkout and contact forms exist with client-side validation; server-side validation present in API routes: PARTIAL
  - Evidence: `app/checkout/page.tsx`, `app/api/contact/route.ts`
  - Severity: HIGH for checkout (payment). Recommended: ensure server validation & error handling tested. Safe to auto-implement: NO.

R. SECURITY BASELINE
- HTTPS assumptions: NEEDS INPUT
  - Evidence: `SITE_URL` uses https. Confirm TLS is enforced by hosting.
- Secure cookie flags: PASS (cookie options in `lib/auth.ts` set `secure` when NODE_ENV=production)
- NEXT_PUBLIC usage: REVIEW — public env vars used intentionally
- CSP / security headers: NOT APPLICABLE (no `headers()` set). Recommend adding a minimal set of security headers at hosting edge or `next.config.ts` — manual plan required.
  - Severity: HIGH
  - Safe to auto-implement: NO (requires hosting validation).

S. ENVIRONMENT & PRODUCTION CONFIG
- `.env.example` present: PASS
- Many runtime secrets required: NEEDS INPUT (confirm production values and webhook endpoints)

T. ANALYTICS-READY ARCHITECTURE
- No analytics provider present: NEEDS INPUT
  - Evidence: no GA/Plausible/Umami scripts found.
  - Severity: LOW
  - Recommended: add analytics & consent flow if required.

U. FAVICON / MANIFEST
- Favicon present: PASS (`app/favicon.ico`)
- Web Manifest not found: PARTIAL — PWA not configured; OK for most e-commerce sites.

V. FONTS
- `next/font` used: PASS
- Preload/font-display handled by Next: PASS

W. CONTENT QUALITY
- No obvious lorem ipsum; recommend content QA: NEEDS MANUAL VERIFICATION

X. ECOMMERCE-SPECIFIC AUDIT
- Product schema, price, availability: PARTIAL
  - Evidence: Product JSON-LD present; product price rendered client-side. Need to verify price consistency between Sanity, fallback data (`lib/data.ts`), and cart calculations.
  - Severity: HIGH
  - Recommended: validate cart price trust boundaries (server verifies total on payment creation). Safe to auto-implement: NO.
- Checkout flow: PARTIAL
  - Evidence: Razorpay integration present; server-side order creation route exists; verify webhook and signature handling in `app/api/payment`.
  - Severity: CRITICAL for payments

Y. NEXT.JS-SPECIFIC
- Server vs Client boundaries: PARTIAL
  - Evidence: mostly correct use of server components; some `use client` modules are large — review for hydration scope.
  - Severity: MEDIUM

---

## Items marked NEEDS INPUT
- Production `SITE_URL` confirmation (lib/constants.ts)
- Production hosting target (Vercel / custom) to plan headers/CSP
- Analytics & monitoring provider choice
- Razorpay live/test keys and webhook URL confirmation

---

## Quick actionable fixes already implemented or safe to auto-implement
- Added `skip-to-content` link in `components/layout/ClientLayout.tsx` (improves accessibility)
- Fixed navbar logo sizing (explicit width/height) to remove `next/image` console warning
- Made shipping free on checkout and cart summary (user request)

---

## Recommended next steps (high level)
1. Confirm production `SITE_URL` and hosting target. (NEEDS INPUT)
2. Add route metadata `noindex` for `/checkout`, `/cart`, `/login` if desired. (AUTO SAFE)
3. Add minimal security headers at hosting edge or via `next.config.ts` `headers()` after review. (REQUIRES VALIDATION)
4. Add analytics & monitoring (Sentry/Datadog/GA) per stakeholder preference. (NEEDS INPUT)
5. Run build, lint, and type-check; fix errors/warnings. (AUTO SAFE)
6. Manual a11y and performance audits (axe, Lighthouse). (NEEDS MANUAL VERIFICATION)

---

End of audit.
