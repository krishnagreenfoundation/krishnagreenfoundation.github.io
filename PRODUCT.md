# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences:
- **CSR programmes and forest agencies** — the primary existing audience. Companies and government bodies funding afforestation who need to evaluate Krishna Green Foundation as an implementation partner (site register, survival data, compliance/registration proof) before committing project funding.
- **Individual and CSR donors** (new, via the donations page) — both retail/individual givers and corporates, making a monetary gift rather than commissioning a full CSR project. Confirmed: the donations page serves both audiences on one page, likely with different tiers/CTAs.

## Product Purpose

Krishna Green Foundation is a Section 8 non-profit and CSR implementation partner that plants and — critically — keeps alive native forest cover across Andhra Pradesh (reserve forests, eco-tourism parks, urban forests/Nagaravanam). Success is measured on survival of what's planted, not volume planted or launched.

## Positioning

Distinguishes itself from typical plantation-drive NGOs by publishing a verifiable, per-site register (area, sapling count, recorded survival) rather than aggregate claims — "a funder can point to a specific compartment and see exactly what was planted there and how much of it lived." Currently reports 100% survival across 9 sites, 297 acres, 2,14,667 native saplings.

## Operating Context

- Founded 2026 (very young org); incorporated by the Ministry of Corporate Affairs (Central Registration Centre, Manesar); Section 8 Licence No. 191456 under the Companies Act, 2013.
- CIN U94990AP2026NPL128077, PAN AANCK2145G. Registered address: Vijayawada, Andhra Pradesh.
- **80G / 12A income-tax exemption certificates are still pending** — not yet issued. This means donations currently cannot be pitched as tax-deductible, and no tax receipt can be promised at time of giving.
- No backend/server — static site on GitHub Pages, no build step, no package manager. Existing form-driven flows (contact form) submit client-side to the third-party Web3Forms API with an embedded access key; there is no payment gateway account set up.
- Site organized as four core disciplines: assess, prepare, plant, nurture (see `approach/index.html`).
- News ticker on the homepage pulls live headlines from Google News RSS via a public API, with a hardcoded fallback list.

## Capabilities and Constraints

- Confirmed: the new donations page collects intent via a **lead-capture form** (same pattern as the existing contact form — Web3Forms POST, no payment gateway), not a payment gateway checkout and not displayed bank/UPI details. A visitor submits their donation interest/amount and the team follows up to complete the gift.
- This choice is explicitly tied to 80G/12A being pending — do not write donation copy that promises an instant tax receipt or claims tax-deductibility until those certificates are confirmed issued.
- Open/undecided: exact donation tiers or "sponsor a tree / fund an acre"-style framing amounts were not specified by the user — reasonable placeholder tiers may be proposed but should be flagged as illustrative, not confirmed pricing.
- Existing pages (home, work register, approach, gallery, about, founders, contact) must all be redesigned; there is no templating layer, so shared chrome (nav/footer) changes must be repeated by hand across every `index.html`, including the new donations page.

## Brand Commitments

- Name: Krishna Green Foundation. Founders: Krishna Kishore Kammila and Krishna Sahithi Sakamuri (co-founders), portraits not yet available (initials placeholders).
- Existing design tokens (palette: forest/parchment/marigold/moss/bone/soil, fonts: Playfair Display, Instrument Sans, Space Mono) are the incumbent visual system — see DESIGN.md decision in new-work for whether this redesign preserves or replaces it.
- Contact: krishnagreenfoundation@gmail.com, +91-9966008787. Right-click disabled site-wide (deterrent only).

## Evidence on Hand

- Real data: 9 plantation sites, 297 acres, 2,14,667 native saplings, 100% survival recorded, across reserve forests / eco-tourism parks / urban forests categories (`js/work.js` `SITES` array is source of truth).
- Real registration/compliance facts as listed above (CIN, PAN, Section 8 licence).
- No testimonials, press mentions, or CSR partner names on hand yet — partner logos are still placeholders (`[PARTNER LOGO 1–4]`).
- No portrait photos for founders yet. Gallery has 62 real field photos but generic "From the field" captions (not yet attributed per site).
- No donation amounts, tiers, or past-donor evidence exist yet — this is a new offering with no track record to show.

## Product Principles

1. Verifiability over volume: every claim (survival, area, sapling count) must trace to the site register; never inflate or invent numbers.
2. Same rigor applies to donations: no tax-deduction promises while 80G/12A is pending; be transparent that gifts fund the same measured, survival-audited plantation work.
3. Serve two donor motions on one page (individual small gifts and CSR-scale giving) without diluting the CSR-partner positioning used elsewhere on the site.
4. No backend — every new interactive flow must work as static HTML/CSS/JS with, at most, a third-party form-submission API, consistent with the rest of the site.
5. Consistency across pages matters more than novelty per-page: chrome, tone, and data must match everywhere since nothing is templated.

## Accessibility & Inclusion

No product-specific accessibility requirement was stated beyond what the incumbent site already does (skip link, `aria-current`, focus-trap modal, reduced-motion fallback for scroll-reveal). Preserve these standards in the redesign.
