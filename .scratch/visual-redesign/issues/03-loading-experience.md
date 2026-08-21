# Loading experience design

Labels: wayfinder:prototype

Status: resolved
Blocked by: 01

## Question

What should visitors see while the 3D assets load? Direction already chosen: a full-screen dark branded loader with real asset progress (r3f `useProgress`) and a smooth reveal into the scene. Prototype the loader — visual treatment (logo/monogram, progress bar vs percentage, animation), timing/thresholds (when to reveal, minimum display time), and its behaviour on slow connections. React to the prototype and lock the design.

## Answer

Decided via UI prototype (`prototype-loading-experience.html` in this directory — 4 variants compared: monogram+bar, counter hero, laptop wireframe draw, wireframe monogram). **Variant A won**; a combined A+C was tried and rejected as crowded.

### Locked design — "monogram + hairline bar"

- Full-screen overlay on the design-system background (gradient + grain, ticket 01 tokens).
- Centered text monogram `e/p`, ~64px Calibre Medium, tracking -0.02em; the `/` in accent emerald `#34d399`.
- Below it a 220px hairline track (`rgba(255,255,255,0.08)`, 2px) with an emerald fill bar (subtle glow via `rgba(52,211,153,0.3)` shadow).
- Small mono percentage under the bar (~13px, letter-spacing 0.15em, slate `#94a3b8`, tabular numerals), format `loading N%`.
- Progress driven by real asset loading (`useProgress`); ease-out curve so % climbs fast then settles, like real loads.
- Wireframe-draw treatments rejected: laptop trace read as unrelated to brand; traced-letterform monogram read worse than plain type. Numbers stay visible.

### Timing & thresholds

- Minimum display time: **0.8s** — fast connections must not flash the loader.
- Reveal at 100%: brief hold (~250ms), then loader fades out over ~700ms with slight blur while the scene fades/scales in from 1.04 over ~1s. Loader unmounts after exit.
- Slow/stalled connection: loader sits quietly at current % — no retry hint, no timeout messaging (deliberate: portfolio audience, page still loads eventually). Revisit only if real-world data shows long stalls.

Execution notes: implement as a DOM overlay outside `<Canvas>` (not Suspense fallback inside it), gated on both `useProgress` completion and min-display timer; respect `prefers-reduced-motion` per ticket 09 when that resolves.
