# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Static single-page website for Krishna Green Foundation, a Section 8 non-profit and CSR implementation partner restoring forests across Andhra Pradesh. Hosted on GitHub Pages at `krishnagreenfoundation.com` (see `CNAME`).

To preview, open `index.html` directly in a browser — no build step, no package manager, no dependencies beyond Google Fonts.

## File structure

Three files hold the entire site:

- **`index.html`** — markup only; links `styles.css` and `script.js`
- **`styles.css`** — all CSS (design tokens → global reset → one block per section)
- **`script.js`** — all JavaScript (data arrays, register render, modal, gallery, nav, form, scroll-reveal)
- **`images/`** — site photos referenced by the `IMAGES` array in `script.js`

## Architecture

`index.html` body sections (in page order): nav · hero · impact stats · site register · approach · capabilities · about · gallery · CSR proof · final CTA · contact form · footer · case-study modal.

`script.js` is structured in labelled blocks, top to bottom:
- `SITES` array — single source of truth for all nine plantation sites (`no`, `name`, `loc`, `cat`, `acres`, `plants`)
- `CAT` object — maps category keys (`reserve`, `park`, `urban`) to display strings
- `drawRegister(filter)` — renders site register rows from `SITES`; also recalculates the footer totals line
- Filter buttons — update `aria-pressed` and call `drawRegister`
- Case-study modal — `openCase(no)`, `closeCase()`, focus-trap, Escape key handler
- Mobile nav toggle
- Form validation — `setErr(id, on)` helper, submit handler (demo only — no real POST)
- `IMAGES` array + gallery render — add entries here to populate the Gallery section
- Scroll-reveal via `IntersectionObserver`
- Footer year

## Design tokens

All colours and fonts are CSS custom properties on `:root` in `styles.css`. The palette:
- `--forest` / `--forest-2` — deep pine (dark backgrounds, primary text)
- `--parch` / `--parch-2` — warm parchment (page base)
- `--marigold` — accent gold (Indian/optimistic — deliberately not terracotta)
- `--amber-ink` — accessible marigold text on light backgrounds
- `--moss` — muted sage (secondary)
- `--bone` — lightest surface / text on dark
- `--soil` — near-black body text

Fonts: Newsreader (serif display) · Instrument Sans (UI sans) · IBM Plex Mono (data/labels)

## Adding or editing sites

Edit the `SITES` array in `script.js`. Each entry:
```js
{no:"01", name:'…', loc:"…", cat:"reserve"|"park"|"urban", acres:27, plants:24150}
```
The register rows, filter footer totals, and modal detail all derive from this array automatically. Update the filter button counts in `index.html` manually if the category totals change.

## Adding gallery photos

Add entries to the `IMAGES` array in `script.js`:
```js
{src:"images/filename.jpg", caption:"Site name — before/after"}
```
Drop the image file in `images/`. If `IMAGES` is empty the gallery shows "Photos coming soon."

## Placeholder content still needed

- `[SOCIAL_SHARE_IMAGE_URL]` — OG image in `<head>`
- `[MONITORING_METHOD]` — survival audit method in impact section note
- `[KEY_SPECIES]` — native species names in approach step and modal
- `[PLANTING_YEAR]` — per-site in modal detail
- `[MAINTENANCE_PERIOD]` — in modal approach list
- `[CSR-1 / 80G / 12A]` — compliance certificates in about section
- `[PARTNER LOGO 1–4]` — CSR partner logos in the proof section
- `[FORM_ENDPOINT]` + `[SPAM_PROTECTION]` — the contact form is a demo; wire to a real backend before going live
- Social links (`[LINKEDIN]`, `[INSTAGRAM]`) — commented out in nav, mobile menu, and footer
