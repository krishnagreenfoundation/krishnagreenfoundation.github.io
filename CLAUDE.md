# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Static single-page website for Krishna Green Foundation, a Section 8 non-profit and CSR implementation partner restoring forests across Andhra Pradesh. Hosted on GitHub Pages at `krishnagreenfoundation.com` (see `CNAME`).

The entire site lives in one file: `index.html`. There is no build system, no package manager, and no dependencies beyond Google Fonts. To preview, open `index.html` directly in a browser.

## Architecture

`index.html` is structured in three blocks:

1. **`<style>` block** — all CSS, organised top-to-bottom:
   - Design tokens (CSS custom properties in `:root`) — colours, fonts, spacing
   - Global reset and shared layout utilities
   - One section per component (nav, hero, impact stats, register, approach, capabilities, CSR proof, contact form, footer, modal)

2. **HTML body** — semantic sections matching the CSS sections above, in page order

3. **`<script>` block** — all JavaScript, inline at the bottom:
   - `SITES` array — the single source of truth for all nine plantation sites (name, location, category, acres, sapling count)
   - `CAT` object — maps category keys (`reserve`, `park`, `urban`) to display strings
   - `drawRegister(filter)` — renders the site register rows from `SITES`
   - Filter buttons, case-study modal (open/close/focus-trap), mobile nav toggle, form validation, scroll-reveal via `IntersectionObserver`, footer year

## Design tokens

All colours and fonts are CSS custom properties on `:root`. The palette:
- `--forest` / `--forest-2` — deep pine (dark backgrounds, primary text)
- `--parch` / `--parch-2` — warm parchment (page base)
- `--marigold` — accent gold (Indian/optimistic — deliberately not terracotta)
- `--amber-ink` — accessible marigold text on light backgrounds
- `--moss` — muted sage (secondary)
- `--bone` — lightest surface / text on dark
- `--soil` — near-black body text

Fonts: Newsreader (serif display) · Instrument Sans (UI sans) · IBM Plex Mono (data/labels)

## Placeholder content

Several values are marked `[IN_BRACKETS]` and still need real data:
- `[SOCIAL_SHARE_IMAGE_URL]` — OG image in `<head>`
- `[CONTACT_EMAIL]`, `[CONTACT_PHONE]`, `[WEBSITE_URL]` — schema.org fields
- `[MONITORING_METHOD]` — survival audit method in impact section
- `[KEY_SPECIES]` — native species names in approach and modal
- `[PLANTING_YEAR]` — per site in modal detail
- `[MAINTENANCE_PERIOD]` — in modal
- `[CSR-1 / 80G / 12A]` — compliance certificates in about section
- `[PARTNER LOGO 1–4]` — CSR partner logos
- `[FORM_ENDPOINT]` + `[SPAM_PROTECTION]` — the contact form is a demo and must be wired to a real backend before going live

## Adding or editing sites

Edit the `SITES` array in the `<script>` block. Each entry:
```js
{no:"01", name:'…', loc:"…", cat:"reserve"|"park"|"urban", acres:27, plants:24150}
```
The register, filter footer totals, and modal detail all derive from this array automatically. Update the filter button counts in the HTML manually if the category totals change.
