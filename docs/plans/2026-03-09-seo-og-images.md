# Full SEO Package — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add OG images, per-page metadata, sitemap, robots.txt, and structured data (LocalBusiness schema) for complete SEO.

**Architecture:** Use Next.js App Router conventions: `opengraph-image.tsx` for dynamic OG image generation, `metadata` exports for per-page SEO, `sitemap.ts` and `robots.ts` for crawlers, JSON-LD script tag for structured data.

**Tech Stack:** Next.js 16 App Router, `next/og` (ImageResponse), TypeScript

**Note:** Pages `/about`, `/gallery`, `/contact` are client components (`"use client"`) and cannot export metadata. Use per-route `layout.tsx` files for their metadata.

---

### Task 1: Update global metadata in root layout

**Files:**
- Modify: `src/app/layout.tsx:20-24`

Replace the existing `metadata` export with expanded version including metadataBase, title template, keywords, openGraph defaults, and twitter card config.

**Commit:** `feat(seo): add global metadata with OG and Twitter config`

---

### Task 2: Add home page metadata

**Files:**
- Modify: `src/app/page.tsx` (add metadata export)

Add Metadata import and export with page-specific title, description, canonical URL.

**Commit:** `feat(seo): add home page metadata`

---

### Task 3: Add per-page metadata for about, gallery, contact

**Files:**
- Create: `src/app/about/layout.tsx`
- Create: `src/app/gallery/layout.tsx`
- Create: `src/app/contact/layout.tsx`

Each layout exports metadata (title, description, canonical) and renders children passthrough.

**Commit:** `feat(seo): add per-page metadata for about, gallery, contact`

---

### Task 4: Create OG images

**Files:**
- Create: `src/app/_og-shared.tsx` (shared OG image generator)
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/about/opengraph-image.tsx`
- Create: `src/app/gallery/opengraph-image.tsx`
- Create: `src/app/contact/opengraph-image.tsx`

Shared helper reads logo as base64, renders branded 1200x630 card with title/subtitle. Per-page files call it with different text.

**Commit:** `feat(seo): add dynamic OG images for all pages`

---

### Task 5: Create sitemap and robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

Sitemap lists all 4 pages with priorities. Robots allows all crawlers, points to sitemap.

**Commit:** `feat(seo): add sitemap.xml and robots.txt`

---

### Task 6: Add structured data (JSON-LD)

**Files:**
- Modify: `src/app/layout.tsx`

Add Restaurant schema JSON-LD with name, address, phone, hours, cuisine, geo coordinates. Uses static hardcoded data only (safe for inline script).

**Commit:** `feat(seo): add Restaurant JSON-LD structured data`

---

### Task 7: Final verification and push

Full build, test OG images render, verify meta tags in HTML, push to origin.
