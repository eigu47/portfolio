# 05 — Content extraction prefactor

**What to build:** "Make the change easy, then make the easy change." All copy and data baked into canvas components moves to a content module: Hero/About text out of their 3D JSX, `PROJECTS` out of Carousel, resume data consolidated (summary currently split between config and a component). The data shape is locale-aware from day one so the JP resume (ticket 10) and sr-only mirror (ticket 06) don't need reshaping later. No visual change — pure refactor, tests green throughout.

**Blocked by:** 02 — Dependency upgrade, single transaction.

**Status:** resolved

- [x] Hero, About, and Carousel render from the content module; no copy inline in scene JSX
- [x] Resume content has one home with a locale-aware shape (EN populated, JP placeholder-ready)
- [x] Scene looks pixel-identical before/after; tests green

## Notes

- Content now lives in `src/content/index.ts`; the resume data is plain and locale-shaped so the Japanese document can be added without reshaping consumers.
- PDF components own presentation only; the summary copy and its Japanese glyph are data rather than a React node stored in configuration.

## Answer

Content extraction is complete in `src/content/index.ts`. Scene copy and projects now use the shared module, and resume data has an English locale plus a Japanese placeholder shape.
