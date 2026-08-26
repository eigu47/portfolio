# 07 — Loading experience

**What to build:** Real visits see the branded loader: a DOM overlay outside the Canvas with the centred `e/p` monogram (emerald slash), 220px hairline progress track with glowing emerald fill, and a small mono percentage — driven by real asset progress with an ease-out curve. Loader never flashes (0.8s minimum display); on completion it holds ~250ms then fades+blurs out ~700ms while the scene fades/scales in from 1.04. Stalled loads sit quietly: no retry hint, no timeout messaging. New copy uses the confident-minimal tone.

**Blocked by:** 04 — Design-system foundation; 05 — Content extraction prefactor.

**Status:** ready-for-agent

- [ ] Loader overlay renders outside the Canvas and tracks real asset progress
- [ ] Minimum 0.8s display; fast connections see no jarring flicker
- [ ] Reveal matches prototype (`.scratch/visual-redesign/prototype-loading-experience.html`): hold → fade+blur out, scene scales in from 1.04
- [ ] Stalled load shows quiet honest progress indefinitely
- [ ] Seam test observes loader-appears-then-yields-to-content
