# 02 — Dependency upgrade, single transaction

**What to build:** One transaction bumps the stack to supported majors: React 19, @react-three/fiber v9, drei v10, current three (+ matching @types/three), @react-pdf/renderer 4.x (mind the PDFViewer API caveat), react-router and Tailwind majors as needed. All existing behaviour intact; the seam tests from 01 stay green.

**Blocked by:** 01 — Test harness + perf baseline.

**Status:** resolved

- [x] React 19 + fiber v9 + drei v10 + current three running; scene renders as before
- [x] @react-pdf/renderer on 4.x; resume viewer works at every breakpoint
- [x] Router/Tailwind majors applied as needed; no regressions in routing or styling
- [x] Full test suite green; site builds and manual smoke pass done
- [x] Post-redesign baseline note appended if bundle changed shape unexpectedly

## Notes

- Tailwind stayed on 3.4 (major not needed — no styling regressions; ticket 04
  will rework the token table). Router went 6 → 7 (drop-in for
  `createBrowserRouter`/`lazy`); explicit `HydrateFallback: () => null` keeps
  v7's initial-load rendering identical to v6 and silences its console warning.
- `@react-three/postprocessing` bumped to v3 (required for fiber v9) with a
  direct `postprocessing` dep; `r3f-perf` bumped to 7.2 (7.1 bundled a
  three-stdlib that no longer builds against three 0.185).
- @react-pdf/renderer v4 breaking changes handled: percentage `borderRadius`
  now throws (all resume radii converted to point values), and yoga 3 lays out
  the resume ~10pt taller, which pushed the document to 2 pages. Fixed by
  rendering the decorative QR at 165pt (was 180) and trimming the content
  row's bottom margin 30 → 26 — visually imperceptible; ticket 09 redesigns
  this document anyway.
- React 19 type migration: `useRef<T>(null)` now yields `RefObject<T | null>`
  (cable-ref prop types widened); `JSX.IntrinsicElements["group"]` →
  `ThreeElements["group"]` from fiber; global `THREE` namespace gone (explicit
  `import type * as THREE`); drei `useGLTF` casts go through `unknown`.
- Also bumped in the same transaction to keep peers compatible: zustand 5
  (React 19 support; API unchanged at our call sites), react-icons 5,
  leva 0.10 (official React 19 peers; dropped next ticket anyway),
  `postprocessing` as a direct dependency (runtime peer of
  @react-three/postprocessing v3).
- Manual smoke evidence: production build served via `vite preview`, driven in
  headless Chrome — root route renders navbar/rails/canvas with a clean
  console and the scene fully drawn (hero text, keyboard model, cable);
  `/resume` renders the action buttons and the PDFViewer iframe with the
  generated PDF blob at desktop width; zero console errors on fresh sessions.
