# Dark premium design system

Labels: wayfinder:grilling

Status: resolved
Blocked by: none

## Question

What is the dark-premium design system this portfolio converges on — colour palette (background layers, surfaces, one accent), shadow/elevation language, background treatment (gradient/grain/glassmorphism?), typography direction (keep Calibre + Noto Sans JP or move to a new pairing), and spacing/radius conventions — expressed concretely enough that every later visual ticket applies it without re-deciding?

This is the foundation ticket: the scene restyle, loading experience, resume restyle, and mobile behaviour tickets are all blocked on its answer.

## Answer

Decided via grilling round + UI prototype (`prototype-design-system.html` in this directory — variant C won; background axis compared flat vs gradient+grain, type axis compared Calibre / Inter / Instrument Serif).

### Palette tokens

| Token | Value | Use |
| --- | --- | --- |
| `bg-base` | `#09090b` | page base, deepest layer |
| `bg-grad-top` | `#0d0d11` | gradient start (top) |
| `accent` | `#34d399` (emerald-400) | single accent: links, highlights, primary buttons, scene accents |
| `accent-glow` | `rgba(52, 211, 153, 0.25–0.35)` | button shadows, hover halos, gradient glow |
| `text-hi` | `#f1f5f9` (slate-100) | headings, primary copy |
| `text-lo` | `#94a3b8` | body copy, secondary text |
| `surface` | `rgba(255, 255, 255, 0.03)` | card/nav fills over the base |

### Background treatment — dark gradient + grain (won over flat)

Layered background behind and around the 3D canvas:

1. Base linear gradient `#0d0d11 → #09090b`, top to bottom.
2. Radial emerald glow top-centre: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(52,211,153,0.10), transparent 60%)`.
3. Faint cool counter-glow bottom-right: `rgba(56,89,244,0.08)`.
4. Fixed SVG film-grain overlay at ~4% alpha (`feTurbulence`), `pointer-events: none`.

### Typography — keep Calibre + Noto Sans JP

Pairing stays (licensing already held, JP coverage required). Polish only: tighter display tracking (-0.02em), clear size hierarchy (hero clamp ~40→72px, body 15–19px), weights Light/Regular/Medium as today. No new font files.

### Surfaces & elevation

- Hairline borders: `1px solid rgba(255, 255, 255, 0.08)` on cards, nav, buttons.
- Soft large shadows for depth: `0 8px 30px rgba(0,0,0,0.35)` (nav), `0 12px 40px rgba(0,0,0,0.3)` (cards).
- Backdrop-blur reserved for overlay chrome only (sticky nav, modals): `blur(12px)` on translucent fill.
- Hover: lift `translateY(-2..3px)` + border warms to `rgba(52,211,153,0.35)`.

### Geometry

- Radii: cards/nav/buttons 12–16px (`--radius: 14px` baseline in prototype).
- Spacing: generous/airy — Tailwind default 4px scale, large section padding (≥120px vertical on desktop hero).

### Application rules

- Emerald is used sparingly: one accent per view region; never two competing accent moments.
- Scene restyle (ticket 04) should echo these tokens: emerald as emissive/accent material, slate-dark materials, no new hues beyond the faint blue counter-glow.
- Loader (03), resume chrome (05), and mobile surfaces (06) inherit surface/hairline/shadow/radius rules verbatim.
