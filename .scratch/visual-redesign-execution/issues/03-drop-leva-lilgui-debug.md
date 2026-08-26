# 03 — Drop leva; ?debug on lil-gui

**What to build:** leva is gone from the production bundle. The nine components that call `useControls({ debugOn })` purely as a hide-when-debugging feature flag use a plain zustand flag instead. The `?debug` panel is rebuilt on lil-gui behind a dynamic import, so normal visitors ship zero debug-tooling bytes.

**Blocked by:** 02 — Dependency upgrade, single transaction.

**Status:** ready-for-agent

- [ ] leva removed from dependencies; not in the production bundle
- [ ] Debug visibility driven by a plain zustand flag at every former `useControls` call site
- [ ] `?debug` loads a lil-gui panel via dynamic import with equivalent controls (transform gizmo, object selection)
- [ ] Tests still green; bundle shrinks accordingly (noted against baseline)
