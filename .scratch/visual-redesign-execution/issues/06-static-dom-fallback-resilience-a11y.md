# 06 — Static DOM fallback + resilience/a11y

**What to build:** One render branch rule works end-to-end: reduced-motion OR WebGL failure → a fully readable static DOM page carrying name, about, projects with links, contact links (built from ticket 05's content module). An ErrorBoundary around the Canvas recovers mid-session context loss into that fallback; route-level boundaries offer retry; the catch-all redirect stays. Landmarks (`header`/`main`/`footer`), sr-only section headings, and an sr-only mirror of all canvas text exist; keyboard paths reach meaning (carousel ←/→, focusable project links); decorative draggables are aria-hidden. A static branded `<noscript>` page ships in the entry HTML.

**Blocked by:** 04 — Design-system foundation; 05 — Content extraction prefactor.

**Status:** ready-for-agent

- [ ] Seam test: WebGL unavailable → static DOM fallback renders with name/about/projects/contact
- [ ] Seam test: reduced-motion → same static branch (no 3D animation, snap-scrolling, or reveals)
- [ ] Mid-session GPU-context loss recovers into the fallback without a blank page
- [ ] Route-level ErrorBoundary shows retry; retry works
- [ ] Landmarks + sr-only headings + sr-only canvas-text mirror present; carousel operable via ←/→
- [ ] `<noscript>` page shows monogram, name, intro, contact links
