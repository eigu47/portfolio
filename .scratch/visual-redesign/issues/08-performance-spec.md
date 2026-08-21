# Performance spec

Labels: wayfinder:grilling

Status: open
Blocked by: none

## Question

What are the concrete performance decisions for this site? Known facts to decide against:

- 16.5 MB of Noto Sans JP TTFs in `src/assets/fonts/` (3 × 5.5 MB), used mainly by the resume PDF — subset? woff2? load on demand?
- leva + debug `useControls` ship unconditionally in the production bundle (Navbar, Camera, Carousel, Atom, Cable, TechLogos, Layout) though hidden — how to strip/lazy them?
- Canvas runs `frameloop="always"` and renders every frame even when idle — render-on-demand or pause-when-idle strategy? Interplay with draggable objects and snap-scroll camera.
- No `dpr` cap on the Canvas.
- Public PDFs (CS50x 404K etc.) and images loaded eagerly?

Decide techniques plus measurable budgets (bundle size, LCP/TTI targets) the execution must hit. Zoom the dependency-upgrade-plan ticket where version choices affect the answer.
