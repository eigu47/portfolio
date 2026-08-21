# Visual redesign of the 3D portfolio

Labels: wayfinder:map

## Destination

A complete visual-redesign spec for eiguchipablo.dev: dark-premium design system, restyled interactive 3D scene, branded loading experience, restyled /resume route (page + PDF), a full dependency upgrade plan (including React/r3f/Vite majors), and mobile-friendly behaviour — detailed enough to execute ticket-by-ticket with no further design decisions.

## Notes

- Aesthetic direction: **dark premium** (dark, moody, polished glassmorphism/gradients allowed).
- The interactive 3D scene **stays** and gets restyled (lighting, materials, colours) — not replaced.
- Desktop-first but must end up **very mobile friendly**.
- Dependencies get a **full upgrade** including majors; breakage fixes are part of this effort.
- Content/copy refresh is **last** on the route.
- Plan-don't-do default: tickets resolve decisions; execution happens after the map is done.
- Skills to consult per session: `/grilling` + `/domain-modeling` for grilling tickets, `/prototype` for prototype tickets.
- Stack facts: Vite 4 + React 18 + react-three-fiber 8 + three 0.150 + zustand 4 + Tailwind 3; fonts Calibre + Noto Sans JP; no dedicated loader today (Suspense fallback only); /resume embeds a live PDF via @react-pdf/renderer plus a `.xls` Japanese download.

## Decisions so far

<!-- one line per closed ticket: [ticket title](link) — gist -->

- [Site-wide improvement audit](issues/07-site-audit.md) — 20 prioritised findings; headline P1s: all content is canvas-only (invisible to crawlers/screen readers), no error boundaries/404, broken favicon set, invalid button-wraps-anchor on /resume, `.xls` JP download.
- [Dependency upgrade plan](issues/02-dependency-upgrade-plan.md) — single-transaction bump to React 19 + fiber v9 + drei v10 + three current; @react-pdf/renderer 4.x with PDFViewer caveat; leva is dormant → drop from prod.
- [Performance spec](issues/08-performance-spec.md) — subset Noto JP → woff2 (Regular only), leva fully removed & ?debug panel rebuilt on lil-gui behind dynamic import, frameloop always + adaptive perf, `dpr={[1,2]}`, no hard budgets — before/after baseline instead.
- [Dark premium design system](issues/01-dark-premium-design-system.md) — emerald `#34d399` single accent; dark gradient + film-grain background (won over flat via prototype); Calibre + Noto Sans JP stay; hairline borders + soft shadows, blur on overlays only; 12–16px radii, airy spacing. Full token table in the ticket.
- [Loading experience design](issues/03-loading-experience.md) — variant A won: `e/p` text monogram (emerald slash) + hairline progress bar + small mono %; 0.8s min display; fade+blur reveal into scene; stalled loads sit quietly. Wireframe-draw options rejected.

## Not yet specified

- Content/copy refresh **and EN/JP language toggle** — in scope by decision, deliberately last; not specifiable until the visual spec stabilises.
- Meta assets refresh (OG image, favicon) against the new look.

## Out of scope

<!-- work ruled beyond the destination: gist + why, linking the closed ticket -->
