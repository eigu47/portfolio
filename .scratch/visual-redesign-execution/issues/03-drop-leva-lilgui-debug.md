# 03 — Drop leva; ?debug on lil-gui

**What to build:** leva is gone from the production bundle. The nine components that call `useControls({ debugOn })` purely as a hide-when-debugging feature flag use a plain zustand flag instead. The `?debug` panel is rebuilt on lil-gui behind a dynamic import, so normal visitors ship zero debug-tooling bytes.

**Blocked by:** 02 — Dependency upgrade, single transaction.

**Status:** resolved

- [x] leva removed from dependencies; not in the production bundle
- [x] Debug visibility driven by a plain zustand flag at every former `useControls` call site
- [x] `?debug` loads a lil-gui panel via dynamic import with equivalent controls (transform gizmo, object selection)
- [x] Tests still green; bundle shrinks accordingly (noted against baseline)

## Notes

- `lil-gui` is isolated in the `DebugPanel` dynamic chunk (`31.49 kB` raw / `8.32 kB` gzip); normal visitors do not request it.
- The production app chunk is now `1,363.34 kB` raw / `380.56 kB` gzip, down from ticket 02's `480.8 kB` gzip app chunk. `r3f-perf` is isolated in a separate `110.49 kB` raw / `38.25 kB` gzip debug chunk.
