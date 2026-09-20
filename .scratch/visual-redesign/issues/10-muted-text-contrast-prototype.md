# Muted-text contrast prototype

Labels: wayfinder:prototype

Status: resolved
Blocked by: none

## Question

The dark-premium design system locked emerald `#34d399` as the single accent, but secondary/muted text greys were never contrast-checked against the dark gradient + film-grain background — and grain plus glass blur add noise behind text. Build a small prototype page showing candidate muted-grey ramps and emerald usage (small text, large text, hairlines, focus outlines, text over blurred glass) with WCAG ratios annotated, so the muted-text tokens can be picked visually against the AA bar (4.5:1 body / 3:1 large+UI) agreed in [Resilience & accessibility requirements](09-resilience-and-accessibility.md).

## Answer

Decided via prototype (`prototype-muted-contrast.html` in this directory — six grey candidates rendered in real contexts over the locked background, with live WCAG ratios vs `base` #09090b and vs a worst-case composite of base + 4% grain + 3% glass fill).

### Tokens

| Token | Value | Rationale |
| --- | --- | --- |
| `text-lo` (body/secondary) | `#94a3b8` — **unchanged** | Darkest grey that still clears AA with real headroom against the worst-case background: 6.78:1 vs the 4.5 bar. Darker candidates (`#78869c` 4.71, `#64748b` 3.65) scrape by or fail; lighter ones buy unneeded AAA at the cost of muted hierarchy. |
| `text-faint` (new, decorative only) | `#64748b` | Fails the body bar (3.65 worst-case) but clears the 3:1 UI bar — legal for decorative micro-labels, disabled text, and ≥24px large text **only**. Added as an explicit token so it never drifts into body copy. |

### Emerald `#34d399` — confirmed everywhere

- Text over base and worst-case backgrounds: 9.04–10.35:1, including over blurred glass with the glow behind it.
- Dark-on-emerald button text `#06281c`: 8.23:1.
- Focus ring: emerald ring + soft emerald halo wins — the halo keeps the ring visible over the radial glow, where hairline rings vanish.

### Application rules

- Grain/glass lift effective background luminance ~7%; all future contrast checks in this effort use the worst-case composite, not flat `#09090b`.
- `text-faint` is banned from body copy, links, and any reading-critical text (per ticket 09's keyboard/sr-only rules, canvas-mirrored DOM copy uses `text-lo` or higher).
