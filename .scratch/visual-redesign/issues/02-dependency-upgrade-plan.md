# Dependency upgrade plan

Labels: wayfinder:research

Status: resolved
Blocked by: none

## Question

The stack is ~2 years stale (React 18, three 0.150, @react-three/fiber 8, drei 9, Vite 4, Tailwind 3, zustand 4, posthog-js old). Research the current stable versions and the migration path for each — especially the breaking changes that touch this codebase: React 19, r3f v9 + three current, drei v10, Vite 6/7, Tailwind 4. What breaks in this specific app (draggable r3f objects, leva, @react-pdf/renderer, posthog provider), what's the recommended upgrade order, and which versions should the spec pin? Output an ordered upgrade plan with per-step risk notes.

## Answer

Researched 2026-08 against official docs/releases (r3f v9 migration guide, react-pdf compatibility docs, GitHub releases).

### Version targets

| Dependency | Current | Target | Risk |
| --- | --- | --- | --- |
| react / react-dom | 18.2 | ^19.2 | Low-Med — StrictMode behaviour tightened |
| @react-three/fiber | 8.12 | ^9.7 | Med — TS JSX namespace rework; StrictMode breaking changes |
| @react-three/drei | 9.65 | ^10.7 | Low — peer-requires fiber v9 |
| three | 0.150 | current (~0.17x/0.18x) | Low — color-management already default |
| @react-three/postprocessing | 2.7 | current major | Low |
| vite + plugin-react-swc | 4.x | 6/7 | Low — config mostly compatible |
| tailwindcss | 3.3 | 4.x | Med — new engine, config migration (or stay on 3.x if redesign doesn't need it) |
| zustand | 4.3 | ^5 | Low — `create` API unchanged for this usage |
| react-router-dom | 6.16 | 7.x | Low-Med — or stay on latest 6.x; lazy routes API carried forward |
| @react-pdf/renderer | 3.1 | ^4.5 | **Med-High — see showstopper** |
| leva | 0.9 | none | **Drop from prod** — dormant upstream (React 18-era), no React 19 support; strip behind dev-only import |
| posthog-js | old | current | Trivial |

### Ordered upgrade plan

1. **Single transaction**: react 19 + fiber v9 + drei v10 + three current (+ postprocessing). drei v10 peer-requires fiber v9 which peer-requires React 19 — staging buys nothing; one lockfile bump. Run `npx types-react-codemod@latest preset-19 ./src` for `JSX.Element` → `React.JSX.Element`.
2. Vite 6/7 + plugin-react-swc + TS/eslint toolchain refresh.
3. zustand v5, react-router (decide 6-latest vs 7), posthog-js.
4. Tailwind 4 — only if the design system wants it; otherwise defer (independent).
5. @react-pdf/renderer 4.x — do together with the resume restyle so regressions are caught there.

### Showstoppers / risk notes

- **StrictMode**: app wraps everything in `React.StrictMode`; r3f v9 has explicit StrictMode breaking changes (double side-effect handling). Verify draggable objects + leva-less debug store mount cleanly, or drop StrictMode during migration.
- **@react-pdf/renderer + React 19**: supported since 4.1.0, but open issue #3223 reports a console `TypeError` from `PDFViewer` unmount on React 19.2 — functional, but noisy; test /resume early, consider BlobProvider instead of PDFViewer if it bites.
- **leva is effectively unmaintained** (last meaningful release pre-React-18-fix era) — reinforces the perf ticket's "strip leva from prod" decision; debug controls should move to a dev-only dynamic import or be dropped.
