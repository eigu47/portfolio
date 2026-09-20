# 12 — Performance pass

**What to build:** Font weight drops massively and the canvas runs efficiently: Noto Sans JP subset to woff2, Regular only — delivered to visitors who need no more; canvas `frameloop="always"` with adaptive performance scaling; device pixel ratio capped at `[1, 2]`. After-baseline captured and compared against ticket 01's before-baseline so improvements are demonstrably real (no hard budgets).

**Blocked by:** 08 — Scene restyle.

**Status:** resolved

- [x] Noto Sans JP served as woff2 Regular only (subset); PDF's JP usage still works after ticket 10
- [x] `dpr={[1, 2]}` cap in place; frameloop stays `always` with adaptive scaling active
- [x] After-baseline captured and appended next to ticket 01's baseline with a comparison summary
- [x] Build-time check confirms emitted font assets match expectations

## Notes

- The browser only requests the subsetted JP WOFF2 when the Japanese resume
  locale is selected; the normal site no longer loads Noto Sans JP weights.
- `npm run build` fails if the emitted JP font asset is missing, duplicated, or
  not the expected regular WOFF2.
