---
name: Krishna Green Foundation
description: "Living Canopy" — a photo-led, professional conservation site. Deep forest greens, terracotta for action, sand-toned sections, Fraunces headlines over Manrope text, calm purposeful motion.
colors:
  paper: "#FFFFFF"
  paper-2: "#F6F3EC"
  paper-3: "#ECE7DB"
  ink: "#13241A"
  ink-soft: "#3E4E44"
  ink-faint: "#5F6E64"
  compartment: "#1E5034"
  compartment-2: "#2E7A4D"
  compartment-3: "#6E9F57"
  cat-urban: "#36708F"
  leaf-wash: "#E7F0E8"
  stamp: "#B8532B"
  stamp-2: "#9C4422"
  night: "#0F2117"
  night-2: "#17301F"
  night-line: "#2D4A38"
  bone: "#F4F6F0"
  bone-soft: "#CAD7CD"
  bone-faint: "#A3B7A9"
  gold: "#E3A94B"
  gold-ink: "#8A5A12"
  line: "#E1E5DE"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(40px,6.4vw,82px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope"
    fontSize: "12px"
    fontWeight: 800
    letterSpacing: "0.08em"
  meta: { fontSize: "13px" }
  small: { fontSize: "14.5px" }
  body-s: { fontSize: "15px" }
  lead: { fontSize: "18px" }
  title: { fontSize: "20px" }
  lede: { fontSize: "clamp(16px,1.6vw,19px)" }
  h3: { fontSize: "clamp(19px,1.9vw,23px)" }
  h2-sm: { fontSize: "clamp(26px,3.2vw,38px)" }
  h2: { fontSize: "clamp(30px,4vw,48px)" }
  statement: { fontSize: "clamp(32px,4.6vw,56px)" }
  figure: { fontSize: "clamp(32px,4vw,52px)" }
  figure-xl: { fontSize: "clamp(52px,7vw,88px)" }
rounded:
  sm: "10px"
  md: "14px"
  card: "20px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(72px, 9vw, 128px)"
  maxw: "1240px"
---

# Design System: Krishna Green Foundation — "Living Canopy"

Replaced the earlier "Working-Plan Register" ledger look on 2026-10-28, at the owner's request, after reviewing greenfoundation.in, greenfoundation.org.in and socialgreenfoundation.com as references. The common thread taken from them: a light header with a clear Donate path, a full-bleed nature photograph behind the headline, friendly type, and image-led cards. Nothing is copied from their branding.

## Principles
- **Photo-led, truth-first.** Hero and banner photographs set the mood; the foundation's own field photos carry every claim. Stock imagery (CC0, see `images/stock/CREDITS.md`) appears only as decorative hero/banner/background, never on site cards, the register, the gallery or anything captioned as a planting site.
- **Calm and professional.** Generous white and sand space, rounded cards, one strong accent per screen.
- **Numbers stay verifiable.** Every figure still traces to `SITES` in `js/work.js`.

## Colour
- **Forest** `--compartment` #1E5034 is the brand: primary buttons, headings accents, icons. **Leaf** `--compartment-2` for hover/emphasis; `--leaf-wash` for soft icon tiles and tints.
- **Terracotta** `--stamp` #B8532B is the action colour: Donate, form submit, the donation tile, required markers and errors. One terracotta action per screen.
- **Sun gold** `--gold` highlights on dark or photo grounds only (hero emphasis word, footer labels, badge dots).
- **Sand** `--paper-2` alternates with white to separate sections; **night** greens hold the footer and CSR band.
- Site categories: reserve `--compartment`, eco-tourism park `--compartment-3`, urban `--cat-urban`.

## Type
Fraunces (display, optical sizing, italics for the one emphasised phrase per headline) over Manrope (all UI, body, labels, data with tabular numerals). Every size is a `--fs-*` token; one role, one token.

## Shape & depth
Cards 20px radius, inputs/panels 10–14px, buttons and chips are pills. Elevation is soft and layered (`--shadow-1` resting cards on hover, `--shadow-2` lifted cards, the stat card, the drawer). No hard offset shadows, no gradients on controls; gradients appear only as photo scrims.

## Components
- **Header:** white, translucent, sticky; gains a hairline and shadow once scrolled. Donate link in terracotta, "Start a project" pill.
- **Home hero:** full-bleed photo with a left-weighted forest scrim, Fraunces headline with a gold italic phrase, white + outline pills, glass trust badges. Impact stats sit in a white card overlapping the hero's lower edge.
- **Page banners:** each inner page sets `style="--banner:url(...)"` on `.page-banner`; a forest scrim keeps text AA. Gallery uses a real field photo.
- **Cards:** programme cards (real photos, category pill), step cards with numbered icon tiles, value cards on sand, CTA tiles (donation tile in terracotta).
- **Register:** rounded row cards with a numbered disc, category dot, survival pill; compartment map parcels are rounded blocks keyed to category.
- **Forms:** white card on sand, 1.5px fields with a soft green focus ring, terracotta errors.

## Motion
One easing for arrivals, `--ease-out` (`cubic-bezier(.16,1,.3,1)`).
- **Hero:** photo settles from 112% scale over 16s; headline, lede, actions and badges rise in sequence.
- **Banners:** same slow settle, content rises in.
- **Impact figures** count up (1.6s, ease-out quart) when scrolled into view.
- **Sections** reveal by fading up; cards in a grid arrive as a short left-to-right sequence.
- **Hover:** cards lift with a soft shadow, card photos zoom slowly, button arrows nudge.
- **Work page:** filters preview on the compartment map, the hovered row lights its parcel, filtered rows wipe in; the case-file drawer slides in over a blurred scrim.
- **Ambient leaves** (owner request) drift at 30% opacity, hidden under reduced motion.
- **Reduced motion:** no keyframes, no movement; fades and colour changes remain.

## Don'ts
- Don't place stock photos where a visitor could read them as one of the nine sites.
- Don't add a second terracotta action to a screen.
- Don't invent figures, partner logos or tax claims (80G/12A still pending).
