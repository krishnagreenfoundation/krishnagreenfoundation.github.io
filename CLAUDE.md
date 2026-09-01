# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site overview

Static multi-page website for Krishna Green Foundation, a Section 8 non-profit and CSR implementation partner restoring forests across Andhra Pradesh. Hosted on GitHub Pages at `krishnagreenfoundation.com` (see `CNAME`).

To preview a single page, open its `index.html` directly in a browser — no build step, no package manager, no dependencies beyond Google Fonts. Assets (`styles.css`, `js/*.js`, `images/*`) use relative paths with an explicit filename (e.g. `../styles.css`) so a page's own assets always load under `file://`. Navigation links (nav, mobile menu, footer, all CTAs) are root-relative directory paths instead (`/work/`, `/contact/`, brand → `/`) so the deployed site never shows `index.html` in the address bar — GitHub Pages serves `work/index.html` for a request to `/work/`. This means clicking between pages only works when served from a real web root (GitHub Pages, or a local static server rooted at the repo) — under plain `file://` a nav click will fail, since `/work/` resolves to the filesystem root, not the repo folder. When testing multi-page navigation locally, run a static server (e.g. `npx serve` or `python -m http.server`) from the repo root instead of double-clicking files.

Right-click (`contextmenu`) is disabled site-wide via `js/common.js` — this is a basic deterrent only, not real content protection (view-source, dev tools, and keyboard shortcuts still work).

## File structure

One `index.html` per menu section, plus shared assets at the root:

- **`index.html`** (root) — Home: hero, impact stats, CSR proof, final CTA
- **`work/index.html`** — site register (all nine sites, filterable) + capabilities + case-study modal
- **`approach/index.html`** — the four-discipline "how we work" section
- **`gallery/index.html`** — the photo carousel
- **`about/index.html`** — About
- **`founders/index.html`** — Founders
- **`contact/index.html`** — contact form
- **`styles.css`** — all CSS, shared by every page (design tokens → global reset → one block per section)
- **`js/common.js`** — loaded on every page: right-click disable, `fmt()`/`esc()` helpers, mobile nav toggle, scroll-reveal, footer year
- **`js/work.js`** — loaded only on `work/index.html`: `SITES`/`CAT` data, register render + filters, case-study modal
- **`js/gallery.js`** — loaded only on `gallery/index.html`: `IMAGES` array, gallery render, carousel arrows
- **`js/contact.js`** — loaded only on `contact/index.html`: form validation + Web3Forms submit
- **`images/`** — site photos; `1.jpeg`–`62.jpeg` are the numbered field photos; `logo.jpeg` is the brand mark

Each page's `<head>` is duplicated (title/description/OG tags per page, same fonts/favicon/JSON-LD), and each page's nav/footer markup is duplicated with `aria-current="page"` hardcoded onto that page's own nav link — there's no templating layer, so a nav or footer change must be repeated across all seven `index.html` files.

## Architecture

Every page shares the same structure: skip-link → nav (+ mobile menu) → `<main id="main">` with that page's section(s) → footer → page-specific `<script>` tags (`js/common.js` always first).

- `js/work.js` — `SITES` array is the single source of truth for all nine plantation sites (`no`, `name`, `loc`, `cat`, `acres`, `plants`); `CAT` maps category keys (`reserve`, `park`, `urban`) to display strings; `drawRegister(filter)` renders register rows and recalculates the footer totals line; filter buttons update `aria-pressed` and call `drawRegister`; the case-study modal (`openCase(no)`, `closeCase()`) has a focus-trap and Escape handler, and its own `challengeText(cat)` copy generator
- `js/gallery.js` — `IMAGES` array (62 entries, `../images/1.jpeg` … `../images/62.jpeg`) injected into `#gallery-grid`; carousel arrows (`#galPrev`, `#galNext`) scroll the track by one viewport width, `syncArrows()` disables the relevant button at each end
- `js/contact.js` — `setErr(id, on)` validation helper, submit handler POSTs JSON to **Web3Forms** (`https://api.web3forms.com/submit`); the access key is embedded in this file
- `js/common.js` — `fmt(n)`/`esc(s)` (`en-IN` locale number formatter and HTML-escape helper, used by `work.js` and `gallery.js`), mobile nav toggle, scroll-reveal via `IntersectionObserver` (any element with class `reveal` fades/slides in when it enters the viewport; add `reveal` to new sections and they animate automatically, falling back to `is-visible` immediately when `prefers-reduced-motion` is set), footer year

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
- `--line-dark` — hairline on dark section backgrounds (`#2E4737`)

Fonts: Fraunces (serif display) · Instrument Sans (UI sans) · Space Mono (data/labels)

## Adding or editing sites

Edit the `SITES` array in `js/work.js`. Each entry:
```js
{no:"01", name:'…', loc:"…", cat:"reserve"|"park"|"urban", acres:27, plants:24150}
```
The register rows, filter footer totals, and modal detail all derive from this array automatically. Update the filter button counts in `work/index.html` manually if the category totals change.

## Adding gallery photos

Add entries to the `IMAGES` array in `js/gallery.js` and drop the file in `images/`:
```js
{src:"../images/filename.jpg", caption:"Site name — before/after"}
```
The gallery renders as a horizontal carousel (3 items visible on desktop, 2 at ≤900 px, 1 at ≤520 px). If `IMAGES` is empty the gallery shows "Photos coming soon."

## Founders section

`founders/index.html` contains two `.founder` cards for Krishna Kishore Kammila and Krishna Sahithi Sakamuri. The circular `.founder__avatar` elements currently show initials (KK / KS) as placeholders — replace with `<img>` tags once portrait photos are available.

## Placeholder content still needed

- `[SOCIAL_SHARE_IMAGE_URL]` — OG image in `<head>`
- `[MONITORING_METHOD]` — survival audit method in impact section note
- `[KEY_SPECIES]` — native species names in approach step and modal
- `[PLANTING_YEAR]` — per-site in modal detail
- `[MAINTENANCE_PERIOD]` — in modal approach list
- `[CSR-1 / 80G / 12A]` — compliance certificates in about section
- `[PARTNER LOGO 1–4]` — CSR partner logos in the proof section
- Social links (`[LINKEDIN]`, `[INSTAGRAM]`) — commented out in nav, mobile menu, and footer
- Gallery captions — all 62 images currently read "From the field"; update individual `caption` values in the `IMAGES` array once site attribution is known
- Founder portraits — `images/` currently has no portrait photos; swap initials for `<img>` in the founder cards when available
