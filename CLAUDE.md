# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Static single-page website for Krishna Green Foundation, a Section 8 non-profit and CSR implementation partner restoring forests across Andhra Pradesh. Hosted on GitHub Pages at `krishnagreenfoundation.com` (see `CNAME`).

To preview, open `index.html` directly in a browser — no build step, no package manager, no dependencies beyond Google Fonts.

## File structure

Three files hold the entire site:

- **`index.html`** — markup only; links `styles.css` and `script.js`
- **`styles.css`** — all CSS (design tokens → global reset → one block per section)
- **`script.js`** — all JavaScript (data arrays, register render, modal, gallery carousel, nav, form, scroll-reveal)
- **`images/`** — site photos; `1.jpeg`–`62.jpeg` are the numbered field photos; `logo.jpeg` is the brand mark

## Architecture

`index.html` body sections (in page order): nav · hero · impact stats · site register · approach · capabilities · about · **founders** · gallery · CSR proof · final CTA · contact form · footer · case-study modal.

`script.js` is structured in labelled blocks, top to bottom:
- `SITES` array — single source of truth for all nine plantation sites (`no`, `name`, `loc`, `cat`, `acres`, `plants`)
- `CAT` object — maps category keys (`reserve`, `park`, `urban`) to display strings
- `drawRegister(filter)` — renders site register rows from `SITES`; also recalculates the footer totals line
- Filter buttons — update `aria-pressed` and call `drawRegister`
- Case-study modal — `openCase(no)`, `closeCase()`, focus-trap, Escape key handler
- Mobile nav toggle
- Form validation — `setErr(id, on)` helper, submit handler (demo only — no real POST)
- `IMAGES` array + gallery render — 62 entries (`images/1.jpeg` … `images/62.jpeg`); injected into `#gallery-grid`
- Gallery carousel — arrow buttons (`#galPrev`, `#galNext`) scroll the `#gallery-grid` track by one full viewport width; `syncArrows()` disables the relevant button at each end
- Scroll-reveal via `IntersectionObserver`
- Footer year

## Design tokens

All colours and fonts are CSS custom properties on `:root` in `styles.css`. The palette:
- `--forest` / `--forest-2` — deep pine (dark section backgrounds, primary text)
- `--parch` / `--parch-2` — light green page base / inset panels (`#EDF6E8` / `#E0EDDA`)
- `--marigold` — accent gold (deliberately not terracotta)
- `--amber-ink` — accessible marigold text on light backgrounds
- `--moss` — muted sage (secondary / supporting)
- `--bone` — near-white green lightest surface, also text on dark sections (`#F4FAF1`)
- `--soil` — near-black warm ink, body text
- `--line` — greenish hairline on light surfaces (`#C5D8BE`)

Fonts: Newsreader (serif display) · Instrument Sans (UI sans) · IBM Plex Mono (data/labels)

## Adding or editing sites

Edit the `SITES` array in `script.js`. Each entry:
```js
{no:"01", name:'…', loc:"…", cat:"reserve"|"park"|"urban", acres:27, plants:24150}
```
The register rows, filter footer totals, and modal detail all derive from this array automatically. Update the filter button counts in `index.html` manually if the category totals change.

## Adding gallery photos

Add entries to the `IMAGES` array in `script.js` and drop the file in `images/`:
```js
{src:"images/filename.jpg", caption:"Site name — before/after"}
```
The gallery renders as a horizontal carousel (3 items visible on desktop, 2 at ≤900 px, 1 at ≤520 px). If `IMAGES` is empty the gallery shows "Photos coming soon."

## Founders section

The `#founders` section (between About and Gallery) contains two `.founder` cards for Krishna Kishore Kammila and Krishna Sahithi Sakamuri. The circular `.founder__avatar` elements currently show initials (KK / KS) as placeholders — replace with `<img>` tags once portrait photos are available.

## Placeholder content still needed

- `[SOCIAL_SHARE_IMAGE_URL]` — OG image in `<head>`
- `[MONITORING_METHOD]` — survival audit method in impact section note
- `[KEY_SPECIES]` — native species names in approach step and modal
- `[PLANTING_YEAR]` — per-site in modal detail
- `[MAINTENANCE_PERIOD]` — in modal approach list
- `[CSR-1 / 80G / 12A]` — compliance certificates in about section
- `[PARTNER LOGO 1–4]` — CSR partner logos in the proof section
- `[FORM_ENDPOINT]` + `[SPAM_PROTECTION]` — contact form is a demo; wire to a real backend before going live
- Social links (`[LINKEDIN]`, `[INSTAGRAM]`) — commented out in nav, mobile menu, and footer
- Gallery captions — all 62 images currently read "From the field"; update individual `caption` values in the `IMAGES` array once site attribution is known
- Founder portraits — `images/` currently has no portrait photos; swap initials for `<img>` in the founder cards when available
