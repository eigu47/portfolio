# Performance spec

Labels: wayfinder:grilling

Status: resolved
Blocked by: none

## Question

What are the concrete performance decisions for this site? Known facts to decide against:

- 16.5 MB of Noto Sans JP TTFs in `src/assets/fonts/` (3 × 5.5 MB), used mainly by the resume PDF — subset? woff2? load on demand?
- leva + debug `useControls` ship unconditionally in the production bundle (Navbar, Camera, Carousel, Atom, Cable, TechLogos, Layout) though hidden — how to strip/lazy them?
- Canvas runs `frameloop="always"` and renders every frame even when idle — render-on-demand or pause-when-idle strategy? Interplay with draggable objects and snap-scroll camera.
- No `dpr` cap on the Canvas.
- Public PDFs (CS50x 404K etc.) and images loaded eagerly?

Decide techniques plus measurable budgets (bundle size, LCP/TTI targets) the execution must hit. Zoom the dependency-upgrade-plan ticket where version choices affect the answer.

## Answer

Resolved by grilling session, 2026-08-22. Decisions:

1. **Fonts** — Subset Noto Sans JP to actually-used glyphs (pyftsubset) and convert to woff2 (~100–300 KB expected). Keep only registered weights: `NotoSansJP-Regular`; delete the never-used `NotoSansJP-Light`/`NotoSansJP-Medium` TTFs. All three Calibre weights stay. Fonts remain inside the lazy-loaded `/resume` chunk.
2. **Leva removal** — Delete all 7 dead `{debugOn:false}` stubs (Camera, Carousel, Atom, TechLogos, Cable, Navbar, Layout) and the always-mounted hidden `<Leva>` in Scene. Rebuild the `?debug` panel on **lil-gui** (three.js official, ~8 KB gzip) behind a ~40-line `useControls`-shaped hook; dynamically import so neither leva nor lil-gui enters the prod bundle without `?debug`. Drop leva from dependencies entirely.
3. **Frameloop** — Keep `frameloop="always"`; add r3f adaptive performance (`performance={{ min: 0.5 }}`). Rely on rAF's natural pause when the tab is hidden. No demand-mode/invalidate refactor — draggables and per-frame lerps keep working unchanged.
4. **Resolution cap** — `<Canvas dpr={[1, 2]}>`.
5. **Public assets** — Nothing deleted: CS50x.pdf, ScrumAlliance CSM certificate PDF, bash.sh, curl.txt are intentionally public files.
6. **Budgets** — No hard numeric caps (3D-heavy page). Instead: capture a **baseline before execution starts** (Lighthouse run + bundle-size report via rollup-plugin-visualizer); execution tickets must show before/after improvement against it rather than hit fixed numbers.
7. **Checklist items folded into the spec** — lazy-load `EiguchiPablo.jpg` in the laptop-screen Html; move `@types/three` to devDependencies and align its version with three during the dependency upgrade (see [Dependency upgrade plan](02-dependency-upgrade-plan.md)).

Facts this was decided against (from codebase audit): only `notosans400` is ever registered in the PDF (Light/Medium dead imports via `src/assets/fonts/index.ts`); web UI uses Calibre only, via drei `Text`; Canvas had no frameloop/dpr props; Bloom gated on GPU tier > 2; `/resume` already route-lazy so Noto files ride that chunk today.
