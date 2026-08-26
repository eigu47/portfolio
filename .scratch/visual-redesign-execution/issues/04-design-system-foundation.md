# 04 — Design-system foundation

**What to build:** The dark-premium design system is live and demoable on today's DOM chrome: token table in Tailwind (`bg-base #09090b`, `bg-grad-top`, `accent #34d399`, `accent-glow`, `text-hi #f1f5f9`, `text-lo #94a3b8`, new decorative-only `text-faint #64748b`, surface), layered background (dark gradient + top-centre emerald radial + cool counter-glow + fixed SVG film grain ~4% alpha), hairline borders + soft shadows, blur reserved for overlay chrome, 12–16px radii, airy spacing, tighter display tracking. Emerald focus ring + halo replaces default outlines; hover states lift surfaces and warm borders toward emerald. Navbar and social/email rails restyled as the canonical **Chrome** treatment.

**Blocked by:** 02 — Dependency upgrade, single transaction.

**Status:** ready-for-agent

- [ ] Token table lives in Tailwind config; ad-hoc hex literals in components migrated to tokens
- [ ] Background treatment applied site-wide per the design-system prototype (`.scratch/visual-redesign/prototype-design-system.html`)
- [ ] `text-faint` exists, used only for decorative/disabled/large text — never body copy
- [ ] Focus ring + halo visible on all interactive elements; hover lift/warm-border states work
- [ ] Navbar + rails demonstrate the Chrome treatment; visual inspection passes vs prototype
