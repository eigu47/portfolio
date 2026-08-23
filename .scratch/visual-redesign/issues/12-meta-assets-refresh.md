# Meta assets refresh (OG image + favicon)

Labels: wayfinder:prototype

Type: prototype
Status: resolved
Blocked by: none

## Question

Ticket 07 flagged the favicon set as broken, and the OG image predates the redesign. Decide the meta assets against the locked dark-premium system:

- **Favicon set**: candidate marks (the `e/p` monogram from the loading experience is an obvious seed — emerald slash on dark tile?), sizes/formats needed (ICO/PNG/SVG, apple-touch-icon), dark-mode-aware treatment.
- **OG image**: composition (monogram vs scene screenshot vs typographic card), dimensions (1200×630), background treatment matching gradient+grain, title/subtitle copy.

Build a small prototype showing candidates (favicon at real browser-tab scale, plus an OG mockup at 1200×630), so the winner can be picked visually — same pattern as the earlier prototypes in this effort.

## Answer

Decided against the live prototype (`../prototype-meta-assets.html`) after three feedback rounds.

**Favicon: F1 — monogram on dark tile.**
- Mark: `e/p` text monogram (Calibre 500, fallback system-ui), slash in emerald `#34d399`, letters `#f1f5f9`; font-size ≈ 0.52 × tile size, letter-spacing −0.04em.
- Tile: vertical gradient `#16161b → #0a0a0c`, corner radius 22% of size, hairline stroke `rgba(255,255,255,0.16)`.
- Glyph optically centred both axes: `text-anchor="middle"` + `dominant-baseline="central"` + `dy = −0.11em` (lowercase sits low in the em box — the explicit upward shift is required; plain central alignment reads too low).
- Export set: SVG (master), PNG 32, ICO 16+32 legacy fallback, apple-touch-icon 180. Tile carries its own dark surface, so no prefers-color-scheme variant needed.

**OG image: O2 typographic card, sub-variant E1 — "big name fills width · role left".**
- 1200×630; background per ticket 01 (radial emerald glow top, faint blue corner glow bottom-right, gradient `#0d0d11 → #09090b`, film grain ~5% opacity).
- Top row: microcap kicker "PORTFOLIO" left, `e/p` monogram right.
- Centre block: name as two staggered lines "Eiguchi" / "Pablo" at 12cqw, centred horizontally as a block, Pablo keeping its +7cqw left indent; role `/ full-stack developer` pinned **left** under it (slash emerald).
- Bottom row above the fold line: `eiguchipablo.dev` left, `Yokohama, JP` right (monospace, faint), separated by a hairline top border.
- Copy rule: Yokohama everywhere (per ticket 11); description meta stays out of the image.

Caveat from the human: E1 is the pick **for now** — composition may get tweaked during implementation, so treat exact spacings as soft, the layout skeleton as locked.
