# 05 — Content extraction prefactor

**What to build:** "Make the change easy, then make the easy change." All copy and data baked into canvas components moves to a content module: Hero/About text out of their 3D JSX, `PROJECTS` out of Carousel, resume data consolidated (summary currently split between config and a component). The data shape is locale-aware from day one so the JP resume (ticket 10) and sr-only mirror (ticket 06) don't need reshaping later. No visual change — pure refactor, tests green throughout.

**Blocked by:** 02 — Dependency upgrade, single transaction.

**Status:** ready-for-agent

- [ ] Hero, About, and Carousel render from the content module; no copy inline in scene JSX
- [ ] Resume content has one home with a locale-aware shape (EN populated, JP placeholder-ready)
- [ ] Scene looks pixel-identical before/after; tests green
