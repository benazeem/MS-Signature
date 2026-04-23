# MS Signature Scents

A production-grade e-commerce storefront for fine attar fragrances, built with a modern full-stack architecture. The platform delivers a luxury shopping experience — from browsing hand-crafted perfume oils to a fully authenticated, payment-integrated checkout flow.

---

## Overview

MS Signature Scents is a dark-aesthetic, premium fragrance store specialising in alcohol-free attar oils rooted in Indian heritage. The storefront is engineered for performance, SEO, and an immersive user experience — combining server-rendered product pages, real-time cart state, and a glassmorphic UI design system.

---

## Technology Stack

### Framework — Next.js 16 (App Router)

The application is built on Next.js 16 with the App Router. Server Components handle data-fetching for product listings, categories, and order history, keeping the client bundle minimal. Client Components manage interactive state — cart, wishlist, authentication modals — using React 19. Route Handlers (`app/api/`) provide the full REST API surface.

### Authentication — Supabase Auth

### Authentication — Supabase Auth

User identity is managed by Supabase Auth using a **Magic Link** system. There are no passwords to remember — users simply enter their email and receive a secure sign-in link.

A secondary **guest checkout** flow is also available for frictionless shopping, where the system automatically generates a session to track order updates.

### Database — PostgreSQL via Prisma on Supabase

All persistent application data is stored in PostgreSQL, hosted on Supabase. Prisma ORM provides a type-safe database client and manages schema migrations.

**Models:**
| Model | Purpose |
|---|---|
| `Order` | Order records with Razorpay IDs, tracking, status |
| `Cart` | Persistent cart synced from localStorage on sign-in |
| `ShippingAddress` | Saved delivery addresses per user |
| `GuestOtp` | One-time passwords for guest checkout sessions |
| `Review` | Product ratings and customer photos |

### Content Management — Sanity CMS

Product catalogue, categories, and editorial content are managed in Sanity Studio (accessible at `/studio`). The storefront fetches from Sanity's CDN using GROQ queries via `next-sanity`, with ISR revalidation (60-second TTL for products, 5-minute for categories). The `SanityProduct` type is fully mapped to the internal `Product` type at the data-fetching layer, with local mock data as a fallback when the Sanity project is not configured.

### Payments — Razorpay

The checkout flow integrates Razorpay for Indian payment processing. Orders are created server-side via the Razorpay REST API, and payment verification uses HMAC-SHA256 signature validation before confirming an order in the database.

### Styling — Tailwind CSS v4 + Custom CSS

The design system is built with Tailwind CSS v4 (configured via `@theme` in `globals.css`) and custom vanilla CSS for glassmorphism, keyframe animations, and scrollbar styling. The colour palette — deep charcoal, gold (`#D4AF37`), and soft gold (`#F5D98A`) — is defined as CSS custom properties and consumed as Tailwind theme tokens.

Typography uses Google Fonts — **Playfair Display** for headings and **Inter** for body text — loaded via `next/font/google` for zero layout shift.

### Animation — Framer Motion (Motion for React)

UI animations are powered by the `motion` package (Framer Motion). Scroll-driven parallax effects use `useScroll` + `useTransform` on the Hero and the 5-chapter horizontal journey section. `AnimatePresence` manages exit animations for cart badges, mobile menus, and modals.

### Image Hosting — Cloudinary

Customer review images and any dynamically uploaded product assets are stored in Cloudinary. The Sanity CDN handles static product imagery; Cloudinary handles user-generated content.

### Email — Nodemailer

Transactional emails (magic links and order confirmations) are sent via Nodemailer. The transport is environment-aware: **Mailtrap** in development for safe inbox testing, **Brevo SMTP** in production.

---

## Key Features

- **Real-time pincode lookup** — Typing a 6-digit Indian pincode auto-fills city and state via the `postalpincode.in` API
- **Persistent cart** — Cart state is stored in `localStorage`, hydrated client-side to prevent SSR mismatch
- **Wishlist** — Per-user wishlist keyed to email in `localStorage`, synchronised across tabs via `useSyncExternalStore`
- **Custom cursor** — A gold-accented cursor with context labels on interactive elements (desktop only)
- **Horizontal scroll journey** — A 5-panel GSAP-inspired scroll section built with Framer Motion spring physics
- **Sanity Studio** — Embedded CMS at `/studio` for managing products without redeployment
- **Shipping address management** — Full CRUD (create, edit, set default, delete) with automatic promotion of the next address to default upon deletion

---

## Architecture

```
app/
├── api/
│   ├── auth/          # OTP send/verify, guest session
│   ├── orders/        # Order creation + retrieval
│   ├── payment/       # Razorpay order init + verification
│   ├── reviews/       # Product review CRUD
│   └── user/shipping/ # Address CRUD (GET/POST/PUT/DELETE)
├── (pages)/           # Shop, product, cart, checkout, account pages
└── studio/            # Embedded Sanity Studio

components/
├── home/              # Hero, Categories, FeaturedProducts, HorizontalScroll
├── layout/            # Navbar, Footer
├── product/           # ProductGallery, ProductInfo, Reviews
├── profile/           # ShippingAddresses
├── shop/              # ProductCard, ProductGrid, Filters
└── ui/                # Button, Badge, Toast, CustomCursor, Tilt3D

lib/
├── cart-context.tsx   # Global cart state (localStorage + React context)
├── wishlist-context.tsx
├── supabase-auth-context.tsx
├── guest-auth-context.tsx
├── mail/              # Code-split mailer (config, templates, index)
└── supabase.ts        # Singleton Supabase browser client

sanity/
├── lib/client.ts      # GROQ queries + typed fetch helpers
└── schemas/           # Product, Category schema definitions
```

---

## Environment Variables

See `.env.example` for the full list. The critical variables are:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Supabase PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Supabase direct connection for Prisma migrations |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API credentials |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier |
| `SANITY_API_TOKEN` | Sanity write token for studio mutations |
| `CLOUDINARY_*` | Cloudinary upload credentials |
| `NODEMAILER_HOST/PORT/USER/PASS` | SMTP transport for email |

---

*MS Signature Scents — Pure. Long-lasting. Timeless.*
