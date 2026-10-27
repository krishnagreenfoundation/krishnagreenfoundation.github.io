---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["work/index.html","approach/index.html","gallery/index.html","about/index.html","founders/index.html","contact/index.html","donate/index.html"]
---

## Direction contract

Scope: site-wide redesign (all seven existing pages) plus a new donations page. Visitor mode: Persuade (visitor decides to fund/partner/donate), with the register and approach pages leaning Read/Operate inside the same world. Audience: CSR sustainability evaluators and forest agencies (existing) plus individual and CSR donors (new, via /donate/). Job: convince a skeptical, evidence-driven visitor that this org's forest-restoration claims are verifiable, then move them to act (start a project, give). Proof/content: the real SITES register (9 sites, 297 acres, 2,14,667 saplings, 100% survival), registration/compliance facts (CIN, PAN, Section 8 licence), 62 real field photos, founders. Constraints: static HTML/CSS/JS, no backend, no payment gateway — donations collected via a Web3Forms lead-capture form like the existing contact form; no tax-deduction claims while 80G/12A is pending.

THESIS: The site becomes a forester's working-plan register — hand-drawn compartment maps, cross-hatched terrain, stamped survey notes carrying every claim — refusing the generic-NGO default of a leafy gradient hero over a stock sapling photo.

OWN-WORLD: Manila/buff ledger-paper ground, india-ink black linework, deep forest-green compartment fills, one red registrar's-stamp accent reserved for "verified" marks. Materials: cross-hatch terrain shading (SVG pattern fills), rubber-stamped circular seals, hand-ruled ledger tables, deckle paper-grain texture. Type: a sober engraved-map serif for headlines, a technical mono for ledger numbers/coordinates/data (Space Mono survives from the incumbent system). Flat ink-on-paper throughout — no gradients, no soft drop shadows, no rounded leaf iconography.

STORY: A CSR evaluator or donor lands and reads the site as an actual working forest register, not marketing collateral. They scan a literal compartment map of the 9 sites, open any compartment to its ledger entry (area, sapling count, survival %, dated audit), and every headline claim carries the visual authority of a stamped, ruled government record. The donation ask reads as a ledger "subscription" entry — pledge support to a named compartment — never a payment-gateway checkout, since 80G/12A is still pending and the ask must not promise a tax receipt.

FIRST VIEWPORT: Full-bleed manila-paper ground. A hand-ruled title cartouche top-left carries the org name, mission line, and a rubber-stamped "SURVIVAL VERIFIED — 100%" seal. Center-right, a cross-hatched compartment map of Andhra Pradesh renders the 9 sites as numbered parcels tinted by category (reserve/park/urban), with a shared legend beneath. A ledger strip along the bottom runs the headline stats (297 acres · 2,14,667 saplings · 100% survival) in monumental mono-numeral type, each stamped "as of" a date. The primary CTA sits as a boxed, ruled ledger row ("Start a project" / "Give to a compartment"), inviting a literal form-field click rather than a rounded pill button.

FORM: Working-Plan Compartment Register, IMPECCABLE'S PICK card (candidate #1 of the grounded, resonance-ranked list), locked by the user over the assigned Canopy-Density Atlas and four other alternates on the decision page; seed key 53c2f17b. Raises carried over from the declined challengers on that round: a dated maturation-ledger rhythm per site, monumental single-typeface stat callouts, live-preview-before-commit on every filter/toggle, and one persistent unmistakable next-step wayfinding marker.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Amendment (2026-09-17)

By explicit user direction, after this build shipped: the page ground was changed from manila paper (`--paper` #EFE6C9) to white (`--paper` #FFFFFF, with `--paper-2`/`--paper-3` moved to near-white neutrals), and a continuous ambient falling-leaf animation was added site-wide (injected by `js/common.js`, styled in `styles.css`). This is a deliberate, acknowledged departure from the FORM/OWN-WORLD sections above, which explicitly rejected "rounded leaf iconography" and a generic plantation-NGO look. The rest of the locked system, ink colors, compartment/category colors, the registrar stamp, typography, layout, and every component pattern, was not touched and remains as specified above. See `DESIGN.md`'s matching amendment note for the full rationale and token values.
