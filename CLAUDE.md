# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development commands

No build step or package manager. To test multi-page navigation locally, serve from the repo root:

```bash
npx serve .          # or: python -m http.server 8000
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (python). Root-relative nav links (`/work/`, `/contact/`) only resolve correctly under a real web root — not `file://`.

## Site overview

Static multi-page website for Krishna Green Foundation, a Section 8 non-profit and CSR implementation partner restoring forests across Andhra Pradesh. Hosted on GitHub Pages at `krishnagreenfoundation.com` (see `CNAME`).

To preview a single page, open its `index.html` directly in a browser — no build step, no package manager, no dependencies beyond Google Fonts. Assets (`styles.css`, `js/*.js`, `images/*`) use relative paths with an explicit filename (e.g. `../styles.css`) so a page's own assets always load under `file://`. Navigation links (nav, mobile menu, footer, all CTAs) are root-relative directory paths instead (`/work/`, `/contact/`, brand → `/`) so the deployed site never shows `index.html` in the address bar — GitHub Pages serves `work/index.html` for a request to `/work/`. This means clicking between pages only works when served from a real web root (GitHub Pages, or a local static server rooted at the repo) — under plain `file://` a nav click will fail, since `/work/` resolves to the filesystem root, not the repo folder. When testing multi-page navigation locally, run a static server (e.g. `npx serve` or `python -m http.server`) from the repo root instead of double-clicking files.

Right-click (`contextmenu`) is disabled site-wide via `js/common.js` — this is a basic deterrent only, not real content protection (view-source, dev tools, and keyboard shortcuts still work).

This repo also carries `PRODUCT.md` (durable product/audience/constraint facts) and `DESIGN.md` + `.impeccable/design.json` (the visual design system — tokens, components, named rules). Read `DESIGN.md` before any visual change; it is normative for colors, type, spacing, and component patterns. `.impeccable/surfaces/index-html.md` holds the locked direction contract this redesign was built against.

## File structure

One `index.html` per menu section, plus shared assets at the root:

- **`index.html`** (root) — Home: full-photo hero, overlapping impact-stat card, programme cards, mission band, four steps, values, CSR band, CTA tiles
- **`work/index.html`** — site register (all nine sites, filterable) + compartment map + capabilities + case-file modal
- **`approach/index.html`** — the four-discipline "how we work" section
- **`gallery/index.html`** — the photo carousel ("exhibit plates")
- **`about/index.html`** — About + registration ledger
- **`founders/index.html`** — Founders
- **`donate/index.html`** — donation pledge page: honest 80G/12A-pending notice, illustrative pledge tiers, lead-capture form (no payment gateway)
- **`contact/index.html`** — contact form
- **`styles.css`** — all CSS, shared by every page (design tokens → global reset → one block per section — see `DESIGN.md` for the documented token/component system)
- **`js/common.js`** — loaded on every page: right-click disable, `fmt()`/`esc()` helpers, mobile nav toggle, header scroll state, scroll-reveal, impact-figure count-up, footer year, news ticker
- **`js/work.js`** — loaded only on `work/index.html`: `SITES`/`CAT` data, register render + filters, case-file modal
- **`js/gallery.js`** — loaded only on `gallery/index.html`: `IMAGES` array, gallery render, carousel arrows
- **`js/contact.js`** — loaded only on `contact/index.html`: form validation + Web3Forms submit
- **`js/donate.js`** — loaded only on `donate/index.html`: pledge-tier buttons, form validation + Web3Forms submit (same access key/pattern as `contact.js`, distinct subject line)
- **`images/`** — site photos; `1.jpeg`–`62.jpeg` are the numbered field photos; `logo.jpeg` is the brand mark (256 px); `og-cover.jpg` is the 1200×630 social share image (built from field photo 16)
- **`images/w800/`** — 800 px WebP copies of every field photo; cards, the mission band and the gallery use these (keep the full-size `.jpeg` originals). Make one for any new photo.
- **`privacy/index.html`** — privacy statement (DPDP Act 2023). The single source of the text: every footer "Privacy" link points to `/privacy/`, and `js/common.js` intercepts the click, fetches that page and shows its `.privacy` article in a native `<dialog>` (falls back to normal navigation without JS or if the fetch fails). Edit the statement only here; update its effective date when you do.
- **`404.html`** — branded not-found page (root-relative asset paths, `noindex`)

All absolute URLs (canonical, og:url, sitemap, robots, JSON-LD) use the apex host `https://krishnagreenfoundation.com` — `www.` 301-redirects to it. The `#register` rows in `work/index.html` are a static copy for non-JS crawlers; if you edit `SITES`, regenerate them (or they'll be replaced on load anyway, but crawlers see the stale copy).

Each page's `<head>` is duplicated (title/description/OG tags per page, same fonts/favicon/JSON-LD), and each page's nav/footer markup is duplicated with `aria-current="page"` hardcoded onto that page's own nav link — there's no templating layer, so a nav or footer change must be repeated across all nine `index.html` files plus `404.html`.

## Architecture

Every page shares the same structure: skip-link → nav (+ mobile menu) → `<main id="main">` with that page's section(s) → footer → page-specific `<script>` tags (`js/common.js` always first).

- `js/work.js` — `SITES` array is the single source of truth for all nine plantation sites (`no`, `name`, `loc`, `cat`, `acres`, `plants`); `CAT` maps category keys (`reserve`, `park`, `urban`) to display strings; `drawRegister(filter)` renders register rows and recalculates the footer totals line; filter buttons update `aria-pressed` and call `drawRegister`; the case-study modal (`openCase(no)`, `closeCase()`) has a focus-trap and Escape handler, and its own `challengeText(cat)` copy generator
- `js/gallery.js` — `IMAGES` array (62 entries, `../images/w800/1.webp` … `../images/w800/62.webp`) injected into `#gallery-grid`; carousel arrows (`#galPrev`, `#galNext`) scroll the track by one viewport width, `syncArrows()` disables the relevant button at each end
- `js/contact.js` — `setErr(id, on)` validation helper, submit handler POSTs JSON to **Web3Forms** (`https://api.web3forms.com/submit`); the access key is embedded in this file
- `js/common.js` — `fmt(n)`/`esc(s)` (`en-IN` locale number formatter and HTML-escape helper, used by `work.js` and `gallery.js`), mobile nav toggle, scroll-reveal via `IntersectionObserver` (any element with class `reveal` fades/slides in when it enters the viewport; add `reveal` to new sections and they animate automatically, falling back to `is-visible` immediately when `prefers-reduced-motion` is set), footer year, and the **news ticker** (see below)

## Design tokens

All colours and fonts are CSS custom properties on `:root` in `styles.css`. Direction: **"Living Canopy"**, a photo-led professional conservation look (replaced the earlier ledger/register look on 2026-10-28). Token names were kept from the old system so inline page styles still resolve; values changed. Full system in `DESIGN.md`; summary:
- `--compartment` / `--compartment-2` / `--compartment-3` / `--cat-urban` — forest brand green, leaf hover, eco-park green, urban blue (also the three site categories)
- `--stamp` — terracotta action colour: Donate, submit, errors (one per screen)
- `--paper` / `--paper-2` — white / sand section grounds; `--night*` — footer and dark bands; `--gold` — highlights on dark/photo
- `--fs-*` — the type ramp; every font-size uses one

Fonts: Fraunces (display) · Manrope (everything else; `--mono` now aliases it). Cards are 20px-rounded, buttons are pills.

Photos: `images/1.jpeg`–`62.jpeg` are the foundation's real field photos and are the only images used for sites, cards and the gallery. `images/stock/` holds CC0 decorative hero/banner photos (sources in `images/stock/CREDITS.md`); each inner page picks its banner via `style="--banner:url(...)"` on `.page-banner`.

## Adding or editing sites

Edit the `SITES` array in `js/work.js`. Each entry:
```js
{no:"01", name:'…', loc:"…", cat:"reserve"|"park"|"urban", acres:27, plants:24150}
```
The register rows, filter footer totals, and modal detail all derive from this array automatically. Update the filter button counts in `work/index.html` manually if the category totals change.

## Adding gallery photos

Add entries to the `IMAGES` array in `js/gallery.js` and drop the file in `images/`:
```js
{src:"../images/w800/filename.webp", caption:"Site name — before/after"}
```
The gallery renders as a horizontal carousel (3 items visible on desktop, 2 at ≤900 px, 1 at ≤520 px). If `IMAGES` is empty the gallery shows "Photos coming soon."

## News ticker

The scrolling ticker on the home page (`#tickerTrack` in `index.html`) is powered by `common.js`. It renders the 8 curated headlines in the `fallback` array of the ticker IIFE in `common.js` (the earlier rss2json live feed was removed: that API rejects this origin via CORS). To change headlines, edit that array; live news would need a server-side proxy. The animation duration scales automatically to content width (`track.scrollWidth / 80`). The ticker only renders on pages that contain `#tickerTrack` — currently only `index.html`.

## Donations

`donate/index.html` collects donation intent from both individual and CSR donors via `js/donate.js` — a lead-capture form in the same Web3Forms pattern as `contact.js` (no payment gateway; the access key is embedded client-side, matching the rest of the site). This is deliberate: 80G/12A certificates are still pending (see `about/index.html`'s registration grid), so the page explicitly does not promise a tax receipt, and copy must not claim tax-deductibility until those certificates are confirmed. The `.tiers` buttons (`₹1,000` / `₹5,000` / `₹25,000` / `CSR`) are labeled illustrative starting points, not fixed pricing or an amount-to-impact conversion — there is no verified per-rupee cost data to back a claim like "₹X funds Y saplings," so don't add one without real figures on file. Update the tier amounts and the 80G/12A notice directly in `donate/index.html` once certification status changes.

## Founders section

`founders/index.html` contains two `.founder` cards for Krishna Kishore Kammila and Krishna Sahithi Sakamuri. The circular `.founder__avatar` elements currently show initials (KK / KS) as placeholders — replace with `<img>` tags once portrait photos are available.

## Placeholder content still needed

- `[MONITORING_METHOD]` — survival audit method in impact section note
- `[KEY_SPECIES]` — native species names in approach step (omitted from the modal until known)
- `[PLANTING_YEAR]` — per-site; the modal omits the row until real years are on file
- `[MAINTENANCE_PERIOD]` — omitted from the modal approach list until known; site photos and site-specific context are likewise left out of the modal rather than shown as placeholders
- `[80G / 12A]` — income-tax exemption certificates (still pending; CIN U94990AP2026NPL128077 and Section 8 Licence 191456 are already reflected in `about/index.html`)
- `[PARTNER LOGO 1–4]` — CSR partner logos; the block is commented out in `index.html`'s CSR proof section until real logos are approved
- Social links (`[LINKEDIN]`, `[INSTAGRAM]`) — commented out in nav, mobile menu, and footer
- Gallery captions — all 62 images currently read "From the field"; update individual `caption` values in the `IMAGES` array once site attribution is known
- Founder portraits — `images/` currently has no portrait photos; swap initials for `<img>` in the founder cards when available
