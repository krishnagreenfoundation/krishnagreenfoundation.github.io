---
name: Krishna Green Foundation
description: A forester's working-plan register on a white ground with an ambient falling-leaf animation — india-ink linework and cross-hatched compartment maps still carry every claim.
colors:
  paper: "#FFFFFF"
  paper-2: "#F5F5F0"
  paper-3: "#EAEAE2"
  leaf-1: "#4C7A4A"
  leaf-2: "#7C8C3E"
  leaf-3: "#A66A2E"
  leaf-4: "#8A5A2E"
  leaf-5: "#5E8A52"
  ink: "#1B1712"
  ink-soft: "#4A4128"
  ink-faint: "#6B5E3F"
  compartment: "#2B4A34"
  compartment-2: "#3E6B47"
  compartment-3: "#6E8F63"
  cat-urban: "#3C5A72"
  stamp: "#8A2E22"
  stamp-2: "#A83A2A"
  night: "#17130E"
  night-2: "#241E14"
  night-line: "#4A3F27"
  bone: "#F4EEDA"
  bone-soft: "#CBC3A2"
  bone-faint: "#B9AD86"
  gold: "#B8862E"
  gold-ink: "#6B4A12"
  line: "#B7A467"
typography:
  display:
    fontFamily: "Old Standard TT, Iowan Old Style, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.375rem, 3.6vw, 3.625rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Public Sans, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Courier Prime, Courier New, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.05em"
  meta:
    fontSize: "13px"
  small:
    fontSize: "14.5px"
  body-s:
    fontSize: "15px"
  lead:
    fontSize: "18px"
  title:
    fontSize: "20px"
  lede:
    fontSize: "clamp(16px,1.8vw,19px)"
  h3:
    fontSize: "clamp(18px,2vw,23px)"
  h2-sm:
    fontSize: "clamp(22px,3.2vw,36px)"
  h2:
    fontSize: "clamp(26px,3.6vw,42px)"
  statement:
    fontSize: "clamp(28px,4.4vw,52px)"
  display-xl:
    fontSize: "clamp(32px,4.8vw,58px)"
  figure:
    fontSize: "clamp(30px,3.8vw,50px)"
  figure-xl:
    fontSize: "clamp(50px,7vw,86px)"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  section: "clamp(64px, 9vw, 120px)"
  maxw: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.hairline}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-stamp:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.bone}"
    rounded: "{rounded.hairline}"
    padding: "14px 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "14px 24px"
---

# Design System: Krishna Green Foundation

> **Amendment (2026-09-17):** by explicit direction, the page ground was changed from manila paper to white and a continuous ambient falling-leaf animation was added site-wide (`js/common.js` injects it, styled in `styles.css` under "AMBIENT FALLING LEAVES"). This overrides the "no rounded leaf iconography" rule below for that one decorative layer only. Everything else in this document, ink colors, compartment/category colors, the registrar stamp, typography, layout, elevation, shapes, and component rules, is unchanged and still normative. Treat "paper" throughout this document as the current white/off-white values in the frontmatter above, not the historical manila-tan hex codes still quoted in the prose below.

## Overview

**Creative North Star: "The Working-Plan Register"**

The site is built to read as a forester's working-plan register, not a marketing page: hand-ruled ledger paper, india-ink linework, cross-hatched compartment maps, and rubber-stamped survey seals carry every claim the organisation makes. Nothing floats free of a rule, a box, or a ledger row — the design's authority comes from looking like a document a CSR auditor would already trust, not from persuasion copy. This directly rejects the generic plantation-NGO default (a leafy green gradient hero over a stock sapling photo, rounded pill buttons, emoji icons) in favor of flat ink-on-paper: rectangular controls, hairline rules, monospace ledger numerals, and a single registrar's-red stamp reserved for verified facts.

The system was chosen over five alternatives — including its own assigned "Canopy-Density Atlas" data-cartography direction — on a decision page, locked by the user as the strongest fit for a Section 8 non-profit whose entire pitch is "we publish a register, not a press release." It carries four raises donated from declined challenger directions during that round: a dated-maturation-ledger rhythm for tracking sites over time, monumental single-typeface treatment for headline statistics, live-preview-before-commit behavior on interactive filters, and one persistent, unmistakable next-step wayfinding cue.

**Key Characteristics:**
- Flat ink-on-white — no gradients, no soft drop shadows. One deliberate exception: a continuous ambient falling-leaf animation drifts over every page, ordinary UI icons are still never leaf-shaped (see Amendment above)
- Every category (reserve forest / eco-tourism park / urban forest) reads as a compartment on a cross-hatched survey map, never a colored icon tile
- Rectangular, ruled controls throughout; radius is functionally zero
- One accent reserved for meaning: registrar red (`--stamp`) appears only on verified/certified facts and the primary donation action, never as decoration
- Real photography is desaturated toward sepia in list contexts (exhibit-plate treatment) and returns to full color on hover/focus, so the paper world and the real field photos share one temperature

## Colors

Warm manila-paper neutrals carry the page; deep compartment greens and a surveyor's-pencil blue distinguish site categories; one registrar red is spent only on verified claims and the primary donation call to action.

### Primary
- **Registrar Red** (`--stamp`, #8A2E22): the one accent with meaning — verified/certified seals, the donate CTA, error states. Never decorative; its rarity is what makes a stamp read as official.

### Secondary
- **Compartment Green** (`--compartment`, #2B4A34): reserve-forest category fill, primary dark-panel headline accents (paired with the display face).
- **Park Green** (`--compartment-3`, #6E8F63): eco-tourism park category fill — a paler compartment tone for the second site category.
- **Surveyor's Blue** (`--cat-urban`, #3C5A72): urban / Nagaravanam category fill — a blue survey-pencil tone that keeps the third category legible against the two greens.

### Tertiary
- **Brass Seal Gold** (`--gold`, #B8862E) / **Gold Ink** (`--gold-ink`, #6B4A12 for AA text on paper): stamp-seal borders, dark-panel footer/nav labels, and the one italic emphasis word per headline.

### Neutral
- **Paper** (`--paper`, #FFFFFF): page ground (amended from manila paper #EFE6C9 to white).
- **Paper 2** (`--paper-2`, #F5F5F0) / **Paper 3** (`--paper-3`, #EAEAE2): inset panels, hover/pressed states.

### Ambient (falling leaves only)
- **Leaf 1-5** (`--leaf-1` #4C7A4A, `--leaf-2` #7C8C3E, `--leaf-3` #A66A2E, `--leaf-4` #8A5A2E, `--leaf-5` #5E8A52): a small rotating palette used only by the falling-leaf animation layer. Not used anywhere else in the UI, never as a functional icon or accent color.
- **India Ink** (`--ink`, #1B1712): primary text, rules, linework, default button fill.
- **Soft Ink** (`--ink-soft`, #4A4128): body copy on paper.
- **Faint Ink** (`--ink-faint`, #6B5E3F): captions, placeholders — darkened from the working draft specifically to clear 4.5:1 on `--paper`.
- **Ledger Hairline** (`--line`, #B7A467): rules on paper.
- **Ledger Cover** (`--night`, #17130E) / **Raised Panel** (`--night-2`, #241E14) / **Night Hairline** (`--night-line`, #4A3F27): dark sections (page-banner cartouches, footer, CSR audit panel).
- **Bone** (`--bone`, #F4EEDA): text and icon color on dark grounds.
- **Bone Soft** (`--bone-soft`, #CBC3A2) / **Bone Faint** (`--bone-faint`, #B9AD86): secondary text on dark grounds: ledes, nav links and stat labels use soft; footer links and captions use faint. Never hard-code another muted bone hex.

### Named Rules
**The One Stamp Rule.** Registrar red is spent on verified facts and the single primary donation action only. A screen with two red elements has diluted the seal's meaning.

**The Flat Ground Rule.** No gradients anywhere, including button and card backgrounds. Depth comes from rules, borders, and (on interactive elements only) a soft ambient shadow — never a color blend.

## Typography

**Display Font:** Old Standard TT (with Iowan Old Style, Georgia, Times New Roman fallback)
**Body Font:** Public Sans (with system sans fallback)
**Label/Mono Font:** Courier Prime (with system mono fallback)

**Character:** Old Standard TT is a 19th-century gazetteer/survey-report book face — it gives headlines an official, engraved-document character rather than a contemporary editorial one. Public Sans (built for government publishing systems) carries body copy with a civic, no-nonsense register. Courier Prime, modeled on real typewriter ledger stamps, is reserved entirely for data: ledger numerals, coordinates, tags, and micro-labels.

### Hierarchy
- **Display** (400, `clamp(1.375rem, 3.6vw, 3.625rem)`, line-height 1.08): page and section headlines, always in Old Standard TT. One italic word per headline may carry the registrar-red or gold accent color for emphasis — never more than one.
- **Body** (400, `clamp(1rem, 1.8vw, 1.1875rem)` for lede / 16px base for paragraph, line-height 1.6–1.65): all prose, Public Sans, max ~58ch measure.
- **Label** (400–700, 12px floor, letter-spacing 0.03–0.12em, uppercase): every ledger tag, nav item, table header, stat caption, form label — always Courier Prime.
- **Ledger numerals** (700, tabular-nums): all statistics and data figures use `font-variant-numeric: tabular-nums` so columns of numbers align like a real ledger.

### Type Ramp (tokens in `styles.css` `:root`)
Every font-size uses a `--fs-*` token: `label` 12 · `meta` 13 · `small` 14.5 · `body-s` 15 · `body` 16 · `lead` 18 · `title` 20, then the fluid steps `lede`, `h3`, `h2-sm`, `h2`, `statement`, `display`, `figure`, `figure-xl`. One role, one token: two section headlines never get different clamps. The only literal sizes left are decorative glyphs (the 10px seal lettering, 24px founder initials, 26px step stamp numerals), which are `aria-hidden` or ornamental, not reading text.

### Named Rules
**The 12px Floor Rule.** No functional or label text ever ships below 12px, even inside dense ledger chips — legibility outranks density in this system.

**The Mono-Is-Data Rule.** Courier Prime only ever sets numbers, codes, or short uppercase labels. It never sets a sentence of prose; that would read as a costume rather than as data.

## Layout

A single `--maxw: 1240px` container (`--gutter: clamp(20px, 5vw, 72px)` inline padding) holds every page. Section rhythm is one `padding-block: clamp(64px, 9vw, 120px)` value site-wide, so vertical density never varies arbitrarily between sections. Grids are ruled tables, not card grids: a component like the program dockets, capability appendix, or founder ledger draws one outer `1.5px solid` ink box, then divides its children with a single `1px` internal rule per edge — the same convention as a printed ledger's row/column rules, never a "card with its own shadow" treatment. Below 900px, multi-column ruled grids collapse to a single column and horizontal dividers replace vertical ones. Below 640px, the compartment-map SVG and page-banner stat rows stack to a single column.

## Elevation & Depth

The system is flat at rest — no ambient shadows on static paper surfaces. Depth appears only as a response to interaction: buttons and the case-file modal lift with a soft, blurred ambient shadow on hover, never a hard offset block shadow (that technique belongs to neobrutalism, which this world is not). Structural depth otherwise comes from ink rules and box borders, not shadow.

### Shadow Vocabulary
- **Button hover (paper)** (`box-shadow: 0 6px 14px rgba(27,23,18,.22)`): default and ghost buttons on light grounds.
- **Button hover (stamp)** (`box-shadow: 0 6px 14px rgba(138,46,34,.35)`): the donate/submit call-to-action.
- **Button hover (dark)** (`box-shadow: 0 6px 14px rgba(0,0,0,.35)`): buttons on night sections.
- **Modal panel** (`box-shadow: -24px 0 60px rgba(23,19,14,.28)`): the case-file drawer sliding in from the right.

### Named Rules
**The Soft-Lift Rule.** Any hover shadow blurs and lifts; it never offsets with a hard, zero-blur edge. A hard block shadow is this system's single most obvious tell of the wrong world.

## Shapes

Radius is functionally zero (`--radius: 2px`) everywhere — buttons, inputs, panels, and cards are rectangular, ruled forms, never pills or soft cards. The one deliberate curve in the system is the circle: the registrar's stamp seal (`.seal`) and the founder-portrait placeholders are perfect circles, rotated slightly off-axis (`rotate(-7deg)`) to read as a hand-stamped mark rather than a UI avatar. Borders are hairline (1px) between ruled siblings and 1.5px around an outer container box; nothing thicker except the page-banner and footer's 6px double rule, which marks a whole-page section transition the way a printed ledger closes a page, not a card accent.

## Components

### Buttons
- **Shape:** rectangular, 2px radius, 1.5px ink border.
- **Primary:** ink fill (`--ink`) / paper text, 14px 24px padding, 600-weight Public Sans, 15px.
- **Stamp:** registrar-red fill — reserved for the donate and form-submit actions only.
- **Ghost:** transparent fill, ink border and text; hover fills with `--paper-2`.
- **On dark:** bone fill / night text, for use on `--night` sections.
- **Hover / Focus:** every variant lifts 2px on translateY and gains a soft ambient shadow (see Elevation); focus-visible adds a 3px registrar-red outline, offset 3px.

### Chips / Tags
- **Site category tag:** an 11px square ink-bordered swatch (fill = category color) beside an uppercase Courier Prime label — never a colored pill.
- **Trust badge:** a row of ink-ruled cells (not individual pill chips) sharing one border, each holding one uppercase mono fact.

### Cards / Containers (Ledger Rows)
- **Corner Style:** none (0–2px).
- **Background:** paper or paper-2, night or night-2 on dark sections.
- **Shadow Strategy:** none at rest; see Elevation for interactive states only.
- **Border:** 1px hairline between siblings, 1.5px box border around the outer group.
- **Internal Padding:** 20–36px depending on density; register rows use 22px block / 10px inline, growing to 18px inline on hover via a translateX(8px) shift (not a padding animation, for performance).

### Inputs / Fields
- **Style:** 1px `--ink-faint` border, 2px radius, paper background, 13px 14px padding.
- **Focus:** border darkens to `--ink` and thickens to 1.5px — no glow, consistent with the flat-ground rule.
- **Error:** border and message switch to `--stamp` red.

### Navigation
- **Style (amended 2026-09-17):** a solid `--night` (deep near-black) sticky bar, not the paper ground, so it stays legible and distinct now that the page ground is white. Each link is a Courier Prime uppercase label in its own night-ruled cell (`border-left` hairline in `--night-line`, shared bottom rule), text in `--bone-soft` that brightens to full `--bone` on hover/active. The underline accent is registrar red (`--stamp`) on hover, brass gold (`--gold`) on the active page, so the two states stay distinguishable on a dark ground. The nav's CTA button uses the `.btn--onDark` variant (bone fill / night text) instead of the default ink-fill button, which would have near-zero contrast on this background. Mobile collapses to a full-width `--night` dropdown panel with Old Standard TT link labels in bone.

### The Compartment Map (signature component)
A hand-authored SVG diagram of the nine registered sites as numbered rectangular parcels, each parcel's width proportional to its real recorded acreage and its fill a cross-hatch pattern keyed to category (diagonal hatch = reserve forest, dot pattern = eco-tourism park, vertical hatch = urban forest). **Amended 2026-09-17:** it now appears only atop the site register (`/work/`), paired with its swatch legend, having been replaced in the home hero by the seed-to-tree scene below. It is explicitly labeled as a schematic, not a geographic survey, so it never overstates its own precision.

### The Seed-to-Tree Scene (home hero visual, added 2026-09-17)
A hand-authored SVG animation in the home hero's right column: a line-art child (matching the site's 1.5-2px-stroke `currentColor` icon style) plants a seed, a trunk draws itself upward (`stroke-dashoffset`), two branches follow, and a five-circle canopy in the compartment-green palette (`--compartment`, `--compartment-2`, `--compartment-3`, `--leaf-2`, `--leaf-5`) pops in. Once grown, small O2 particles (`--leaf-1`) drift up and out while muted CO2 particles (`--bone-faint`) drift in toward the canopy and fade, an infinite idle loop illustrating gas exchange. Plays once via `IntersectionObserver` when scrolled into view (`js/common.js`, `#seedScene`), then settles into the particle loop; under `prefers-reduced-motion` it renders the fully-grown tree immediately with no motion and no particles. This is one of the few hand-rolled decorative SVGs in the system, justified because the brief explicitly called for this narrative (child plants seed, tree grows, tree exchanges O2/CO2), the same bar that allows the falling-leaf layer.

## Motion

One motion language: `--ease-out` (`cubic-bezier(.16,1,.3,1)`) for arrivals, exits faster than entrances, nothing bounces.
- **Register ↔ map (signature, `/work/`):** hovering or focusing a filter previews its result on the compartment map before it is committed; parcels outside the active filter recede to 16% opacity; the register row under the pointer or keyboard focus inks its parcel (4.5px stroke) while the rest drop to half. Committing a filter rules the new rows in left to right (`clip-path` wipe, 40ms stagger).
- **Seal stamp:** a `.seal` inside a revealed notice lands once (scale 1.7 → 1, rotating into its -7° hand-stamped angle). Never loops.
- **Case-file drawer:** slides 56px in from the right over a fading scrim (keyframes, because the modal toggles `display`).
- **Reduced motion:** all keyframes stop and nothing moves, but opacity, colour and stroke transitions stay so filter state and focus still read.

## Do's and Don'ts

### Do:
- **Do** keep every category distinction (reserve / park / urban) legible through the cross-hatch pattern + swatch, not color alone.
- **Do** reserve registrar red for verified facts and the one primary donation action per screen.
- **Do** set every number — statistics, ledger data, acreage — in tabular-nums so columns align.
- **Do** label illustrative or placeholder data honestly in the copy itself (e.g. donation tiers marked "illustrative starting points only").
- **Do** keep hover depth soft and blurred; keep structural depth in ink rules and borders.
- **Do** keep the falling-leaf animation purely decorative: `aria-hidden`, `pointer-events:none`, disabled under `prefers-reduced-motion`, and never carrying a functional label or click target.

### Don't:
- **Don't** add a kicker or eyebrow caption above any heading — fold a sequence number or reference code into the heading itself, a ledger table column, or a corner-mounted file-reference stamp instead.
- **Don't** use emoji as icons anywhere; every functional icon is an authored line-stroke SVG in the shared 1.5px-stroke, `currentColor` style. (The ambient falling-leaf shapes are the one exception, decorative background only, never a functional icon.)
- **Don't** round a button, input, or card corner beyond the 2px hairline radius — pills and soft cards belong to a different world.
- **Don't** use a hard-offset, zero-blur box-shadow; that technique is reserved for neobrutalist systems this project is not.
- **Don't** invent a donation amount-to-impact conversion (e.g. "₹X funds Y saplings") without real per-rupee cost data on file.
