# Before-baseline — visual redesign execution

Captured **before** any dependency or visual change lands, so later perf claims
are demonstrably real. Per ticket 01.

- Date: 2026-08-26
- Commit: `2aee285` (docs-only history; no production code changed by ticket 01)
- Node v24.19.0, Vite 4.2, `npm run build` (tsc + vite build)

## Build output (raw / gzip)

| Asset | Raw | gzip |
| --- | --- | --- |
| `assets/App-*.js` (main scene chunk) | 1,855.0 kB | 592.7 kB |
| `assets/iconBase-*.js` (react-icons) | 1,469.4 kB | 467.4 kB |
| `assets/index-*.js` (entry/vendor) | 312.4 kB | 100.8 kB |
| `assets/Index-*.js` (resume route) | 16.1 kB | 4.0 kB |
| `assets/index-*.css` | 16.5 kB | 3.5 kB |
| `dist/` total | ~22.8 MB | — |

Heavy non-JS assets (not in the table above): three NotoSansJP TTFs at
~5,730 kB **each** (~17.2 MB total), Calibre TTFs ~62 kB each, `keyboard.gltf`
358 kB, `laptop.glb` 87 kB.

## Lighthouse 13.4.1 (performance only)

Run against `vite preview` of this build, default (emulated mobile) settings,
headless Chrome (`--headless=new --no-sandbox --disable-gpu`) — i.e. software
WebGL. Absolute numbers are environment-specific and pessimistic; the value is
the **before/after delta under identical flags**.

| Metric | Value |
| --- | --- |
| Performance score | **0.28** |
| First Contentful Paint | 4.4 s |
| Largest Contentful Paint | 14.0 s |
| Speed Index | 8.7 s |
| Total Blocking Time | 159,090 ms |
| Cumulative Layout Shift | 0 |
| Time to Interactive | 176.7 s |
| Total transfer weight | 2,205 kB |

Raw report: [`lighthouse-before.json`](./lighthouse-before.json)

## Reproduce

```sh
npm run build
npx vite preview --port 4174 &
npx lighthouse http://localhost:4174/ --quiet \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json --output-path=lighthouse-before.json \
  --only-categories=performance
```

## Obvious known costs (targets for later tickets, not decisions made here)

- 17.2 MB of NotoSansJP TTFs → subset to woff2 Regular (perf spec).
- `iconBase` chunk: react-icons pulls ~1.5 MB for a handful of icons.
- `leva` (0.9.34) ships in the prod bundle though dormant (perf spec: remove).
- Main scene chunk 1.9 MB raw / 593 kB gzip (three + fiber + drei + postprocessing).

## Post-upgrade note — ticket 02 (dependency upgrade)

Captured after the single-transaction bump (React 19, fiber v9, drei v10,
three 0.185, @react-pdf/renderer 4, react-router 7). Bundle **shape** is
unchanged (same chunk roles); sizes moved marginally:

| Asset | Before (raw / gzip) | After (raw / gzip) |
| --- | --- | --- |
| `App-*.js` | 1,855.0 kB / 592.7 kB | 1,636.7 kB / 480.8 kB |
| `iconBase-*.js` | 1,469.4 kB / 467.4 kB | 1,485.3 kB / 528.3 kB |
| `index-*.js` (entry/vendor) | 312.4 kB / 100.8 kB | 406.0 kB / 129.3 kB |
| `Index-*.js` (resume route) | 16.1 kB / 4.0 kB | 16.2 kB / 4.0 kB |
| `index-*.css` | 16.5 kB / 3.5 kB | 16.4 kB / 3.5 kB |
| `dist/` total | ~22.8 MB | ~22 MB |

No unexpected shape change, so no action item: the entry chunk grew ~29 kB
gzip (fiber v9 + router v7 vendor code), the main scene chunk shrank ~112 kB
gzip. Font weight (17.2 MB of NotoSansJP TTFs) is untouched — ticket 12's
target. A Lighthouse after-run was skipped: absolute numbers on this machine
are dominated by the font payload and software-WebGL TBT, which this ticket
did not change; ticket 12 will run the real before/after comparison.

## Post-debug note — ticket 03 (Leva removal)

Leva was removed from the dependency graph and the debug panel moved to a
dynamic `lil-gui` chunk. The production app chunk is now 1,473.81 kB raw /
418.84 kB gzip, compared with ticket 02's 1,636.7 kB / 480.8 kB. The debug
chunk is 31.25 kB raw / 8.24 kB gzip and is only requested for `?debug` visits.
