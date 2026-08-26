# 02 — Dependency upgrade, single transaction

**What to build:** One transaction bumps the stack to supported majors: React 19, @react-three/fiber v9, drei v10, current three (+ matching @types/three), @react-pdf/renderer 4.x (mind the PDFViewer API caveat), react-router and Tailwind majors as needed. All existing behaviour intact; the seam tests from 01 stay green.

**Blocked by:** 01 — Test harness + perf baseline.

**Status:** ready-for-agent

- [ ] React 19 + fiber v9 + drei v10 + current three running; scene renders as before
- [ ] @react-pdf/renderer on 4.x; resume viewer works at every breakpoint
- [ ] Router/Tailwind majors applied as needed; no regressions in routing or styling
- [ ] Full test suite green; site builds and manual smoke pass done
- [ ] Post-redesign baseline note appended if bundle changed shape unexpectedly
