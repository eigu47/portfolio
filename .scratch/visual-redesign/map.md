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
- Execution published: implementation tracer-bullet tickets live in [`../visual-redesign-execution/issues/`](../visual-redesign-execution/) (01–14), broken from this spec.

## Decisions so far

<!-- one line per closed ticket: [ticket title](link) — gist -->

- [Design-system foundation](../visual-redesign-execution/issues/04-design-system-foundation.md) — Tailwind v4 theme tokens, gradient/grain background, retained Calibre/Noto typography, and shared Chrome/focus/hover treatments are live.

- [Content extraction prefactor](../visual-redesign-execution/issues/05-content-extraction-prefactor.md) — scene and resume content now live in one locale-aware content module; PDF components retain presentation concerns.

- [Site-wide improvement audit](issues/07-site-audit.md) — 20 prioritised findings; headline P1s: all content is canvas-only (invisible to crawlers/screen readers), no error boundaries/404, broken favicon set, invalid button-wraps-anchor on /resume, `.xls` JP download.
- [Dependency upgrade plan](issues/02-dependency-upgrade-plan.md) — single-transaction bump to React 19 + fiber v9 + drei v10 + three current; @react-pdf/renderer 4.x with PDFViewer caveat; leva is dormant → drop from prod.
- [Performance spec](issues/08-performance-spec.md) — subset Noto JP → woff2 (Regular only), leva fully removed & ?debug panel rebuilt on lil-gui behind dynamic import, frameloop always + adaptive perf, `dpr={[1,2]}`, no hard budgets — before/after baseline instead.
- [Dark premium design system](issues/01-dark-premium-design-system.md) — emerald `#34d399` single accent; dark gradient + film-grain background (won over flat via prototype); Calibre + Noto Sans JP stay; hairline borders + soft shadows, blur on overlays only; 12–16px radii, airy spacing. Full token table in the ticket.
- [3D scene restyle direction](issues/04-scene-restyle-direction.md) — muted original prop colours (laptop keeps its blue/red/orange identity, desaturated + darkened); deep-emerald in-scene accents (`#0a7a58`); three-point rig + emerald rim spotlight; fog + starfield AND reflective glow floor combined; tuned bloom + vignette; motion kept but −30%. Decided via interactive prototype (`prototype-scene.html`, variant H).
- [Loading experience design](issues/03-loading-experience.md) — variant A won: `e/p` text monogram (emerald slash) + hairline progress bar + small mono %; 0.8s min display; fade+blur reveal into scene; stalled loads sit quietly. Wireframe-draw options rejected.
- [Resume route restyle spec](issues/05-resume-route-restyle.md) — top action bar in the site navbar's glass treatment; EN⇄日本語 toggle drives displayed PDF *and* download (JP MyDocument to be built); light+emerald PDF with typographic header, small-caps/emerald-hairline sections, skill pills, avatar kept; `.xls` demoted to tertiary link but kept; static PDF rebuilt post-redesign. Prototype: `prototype-resume-restyle.html`.
- [Mobile-friendly behaviour requirements](issues/06-mobile-behaviour.md) — pure adaptive scene quality (no mobile overrides; escalation ladder includes dropping post-processing); direction-locked touch (vertical always scrolls); dvh + snap-proximity on small screens with live viewport tracking; mobile menu holds social/email links and fully hides when closed; `/resume` native iframe embed of the static PDF on phones; gyro tilt behind a non-invasive "tilt" chip.
- [Resilience & accessibility requirements](issues/09-resilience-and-accessibility.md) — WebGL failure → DOM content fallback page (doubles as canvas-only-content fix); reduced-motion shares that same branch (one rule: reduced-motion OR WebGL failure → static DOM version); keyboard paths for meaning (carousel ←/→, focusable links), decorative draggables aria-hidden; header/main/footer landmarks + sr-only mirror of all canvas text; PDFViewer at every breakpoint; ErrorBoundaries on Canvas + routes with retry, catch-all redirect stays; static branded `<noscript>` in index.html; browser-default focus outlines minimally restyled. Contrast tokens deliberately spun out to [Muted-text contrast prototype](issues/10-muted-text-contrast-prototype.md).
- [Muted-text contrast prototype](issues/10-muted-text-contrast-prototype.md) — `text-lo` stays `#94a3b8` (darkest AA-safe grey vs worst-case grain+glass background, 6.78:1); new `text-faint #64748b` token for decorative/disabled/large-only use, banned from body copy; emerald confirmed everywhere incl. over glass; emerald ring + halo wins for focus; future contrast checks use the worst-case composite, not flat base.
- [Site-wide content/copy refresh + EN⇄日本語 toggle](issues/11-content-refresh-and-locale-toggle.md) — no site-wide i18n after all: toggle stays resume-scoped per ticket 05, canvas EN permanently, no persistence; `/resume?lang=ja` sets initial PDF language for that visit only; copy refresh = confident-minimal tone for new copy only (loader/fallback), lowercase nav + all-caps PDF section titles, Yokohama everywhere (resume contact row + meta corrected), backend stack added to resume skills.
- [Meta assets refresh (OG image + favicon)](issues/12-meta-assets-refresh.md) — favicon F1: `e/p` monogram on dark gradient tile, emerald slash, optically centred (−0.11em shift), export SVG/PNG32/ICO/apple-touch-180, no dark-mode variant needed; OG = O2 typographic card variant E1: staggered centred name at 12cqw, role pinned left, Yokohama bottom-right; exact spacing tweakable in implementation.

## Not yet specified

<!-- empty — both former fog patches graduated when the visual spec stabilised (all decision tickets resolved) -->

## Out of scope

<!-- work ruled beyond the destination: gist + why, linking the closed ticket -->
