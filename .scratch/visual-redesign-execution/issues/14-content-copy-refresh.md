# 14 — Content/copy refresh (last)

**What to build:** Final polish pass over copy, applied last on the route per the map. Confident-minimal tone checked across new copy (loader, fallback). Nav labels lowercase. Yokohama stated correctly everywhere — resume contact row and metadata included. Backend stack added to resume skills. Existing copy otherwise untouched (refresh applies to new copy only).

**Blocked by:** 07 — Loading experience; 10 — JP PDF + locale toggle; 11 — Mobile behaviour.

**Status:** resolved

- [x] Loader + fallback copy reads confident-minimal
- [x] Nav labels lowercase everywhere
- [x] Yokohama correct in resume contact row and all metadata
- [x] Backend stack present in resume skills (both locales)
- [x] No existing copy rewritten beyond the above; tests green; build clean

## Notes

- Loader and static fallback labels now use concise lowercase copy, with a direct
  fallback message for reduced-motion and WebGL-unavailable visits.
- Navigation no longer applies title casing; the closed mobile menu removes its
  contact links from the DOM.
- Resume and social metadata now use Yokohama, and the English backend skills
  are inherited by the Japanese locale alongside Node.js.
