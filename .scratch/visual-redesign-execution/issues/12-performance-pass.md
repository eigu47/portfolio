# 12 — Performance pass

**What to build:** Font weight drops massively and the canvas runs efficiently: Noto Sans JP subset to woff2, Regular only — delivered to visitors who need no more; canvas `frameloop="always"` with adaptive performance scaling; device pixel ratio capped at `[1, 2]`. After-baseline captured and compared against ticket 01's before-baseline so improvements are demonstrably real (no hard budgets).

**Blocked by:** 08 — Scene restyle.

**Status:** resolved

- [x] Noto Sans JP served as subsetted WOFF2 for the web and subsetted TTF for PDF rendering; Regular only
- [x] `dpr={[1, 2]}` cap in place; frameloop stays `always` with adaptive scaling active
- [x] After-baseline captured and appended next to ticket 01's baseline with a comparison summary
- [x] Build-time check confirms emitted font assets match expectations

## Notes

- The web UI uses the subsetted JP WOFF2, while the Japanese PDF uses a
  PDF-compatible subsetted TTF because @react-pdf/renderer emits blank glyph
  outlines when given WOFF2 in Chrome.
- `npm run build` fails if the emitted JP font asset is missing, duplicated, or
  not the expected regular WOFF2 and PDF-compatible TTF pair.
