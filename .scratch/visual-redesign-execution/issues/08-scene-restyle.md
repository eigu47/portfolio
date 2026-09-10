# 08 — Scene restyle

**What to build:** The interactive 3D scene matches locked prototype variant H (`.scratch/visual-redesign/prototype-scene.html`): original prop palette muted but identity-preserving (laptop keeps blue/red/orange, desaturated + darkened), deep-emerald in-scene accents (`#0a7a58`), three-point rig plus emerald rim spotlight, fog + starfield combined with a reflective glow floor, tuned bloom + vignette, existing motion kept at roughly −30%.

**Blocked by:** 03 — Drop leva; ?debug on lil-gui; 05 — Content extraction prefactor.

**Status:** resolved

- [x] Prop colours muted per variant H; laptop identity still recognisable
- [x] Lighting rig + emerald rim spotlight in place; fog + starfield combined; floor removed per follow-up preference
- [x] Bloom + vignette tuned; post-processing still GPU-tier-gated as today
- [x] Motion reduced ~30% vs current; visual inspection passes vs prototype

## Answer

Variant H is implemented across the scene. The atmosphere now includes a dark reflective glow floor, the existing three-point rig uses the approved emerald rim, and cast/receive shadows are enabled for the major props. Emerald replaces the baseline cyan/magenta atom treatment and laptop screen glow, while the existing laptop and keyboard palette remains muted and identity-preserving. Float and electron motion is tuned to 70% of the previous speed/intensity; bloom remains GPU-tier-gated and the vignette remains a CSS overlay.

## Follow-up

The reflective floor and its environment lighting were removed after visual review. Fog, stars, emerald lighting, and the muted prop treatment remain in place.
