# 01 — Test harness + perf baseline

**What to build:** The repo can verify behaviour automatically for the first time: Vitest + Testing Library installed, the one high seam working — rendering the root app in a jsdom-like environment with WebGL stubbed or unavailable — with a first behavioural smoke test green (app renders its chrome; loader/fallback behaviour observable). Before any dependency or visual change lands, a before-baseline of performance and bundle size is captured so later claims are demonstrably real.

**Blocked by:** None — can start immediately.

**Status:** resolved

- [x] `vitest` + Testing Library installed and runnable via a `test` script
- [x] Root-app seam renders in jsdom with WebGL stubbed; a behavioural smoke test passes (what renders / what the user can do)
- [x] A WebGL-unavailable variant of the seam exists (drives ticket 06)
- [x] Before-baseline captured: build output sizes and a Lighthouse/perf snapshot committed under `.scratch/visual-redesign-execution/baseline.md`
- [x] No production code changed by this ticket beyond what the harness requires
