# 06 — Static DOM fallback + resilience/a11y

**What to build:** One render branch rule works end-to-end: reduced-motion OR WebGL failure → a fully readable static DOM page carrying name, about, projects with links, contact links (built from ticket 05's content module). An ErrorBoundary around the Canvas recovers mid-session context loss into that fallback; route-level boundaries offer retry; the catch-all redirect stays. Landmarks (`header`/`main`/`footer`), sr-only section headings, and an sr-only mirror of all canvas text exist; keyboard paths reach meaning (carousel ←/→, focusable project links); decorative draggables are aria-hidden. A static branded `<noscript>` page ships in the entry HTML.

**Blocked by:** 04 — Design-system foundation; 05 — Content extraction prefactor.

**Status:** resolved

- [x] Seam test: WebGL unavailable → static DOM fallback renders with name/about/projects/contact
- [x] Seam test: reduced-motion → same static branch (no 3D animation, snap-scrolling, or reveals)
- [x] Mid-session GPU-context loss recovers into the fallback without a blank page
- [x] Route-level ErrorBoundary shows retry; retry works
- [x] Landmarks + sr-only headings + sr-only canvas-text mirror present; carousel operable via ←/→
- [x] `<noscript>` page shows monogram, name, intro, contact links

## Notes

- The root app now branches to a semantic static page when WebGL is unavailable or reduced motion is preferred.
- Renderer errors, WebGL context loss, and route-level failures recover through visible retry actions.
- The normal scene has a visually hidden DOM mirror with landmarks and project links; the entry HTML includes a styled noscript page.
