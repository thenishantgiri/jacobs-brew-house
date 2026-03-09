# Full SEO Package — Design

**Date:** 2026-03-09
**Status:** Approved

## Goal

Complete SEO setup: OG images per page, per-page metadata, sitemap, robots.txt, structured data (LocalBusiness/Restaurant schema).

## Components

### 1. OG Images (1200x630px)
Dynamic generation via `opengraph-image.tsx` (Next.js convention, uses `ImageResponse` from `next/og`).
- Consistent brand styling: dark background (#0A0A0A), brand green accent, cream text
- Logo embedded as base64 in each OG image
- Per-page subtitle text

### 2. Per-Page Metadata
Each page exports its own `metadata` object with title, description, openGraph, and twitter card config.

### 3. Sitemap & Robots
- `src/app/sitemap.ts` — all pages, jacobbrewhouse.com base URL
- `src/app/robots.ts` — allow all, point to sitemap

### 4. Structured Data
JSON-LD LocalBusiness/Restaurant schema on home page for Google rich results.

### 5. Global Metadata
Update layout.tsx with base metadata: metadataBase, openGraph defaults, twitter card config.
