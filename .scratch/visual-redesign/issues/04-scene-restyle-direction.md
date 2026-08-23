# 3D scene restyle direction

Labels: wayfinder:grilling

Status: resolved
Blocked by: 01

## Question

How does the interactive scene (laptop, keyboard, atom, tech logos, cables) get restyled to dark premium without losing its playfulness? Decide lighting rig, material treatments (metalness/roughness/emissive), background/environment of the canvas (fog, stars, gradient floor?), colour grading/post-processing (currently has postprocessing lib), and whether any props get swapped or retextured. The goal: the scene stops reading as "toy demo" and reads as a designed centerpiece.

## Answer

Decided via grilling rounds + interactive 3D prototype (`prototype-scene.html` in this directory — real `keyboard.gltf` / `laptop.glb` loaded on a stage, looks switchable A–H; user picked the winning look live). **Final look = variant H.**

### Decisions

1. **Material treatment — muted original colours, no prop swaps.** Props keep their colour identity (the laptop's blue/red/orange lid stays, recognisably) but desaturated (~65%) and darkened (~55% lightness) into the dark palette; keycaps stay light slate; tech-logo balls stay light slate (decals must read); cable near-black with a faint emerald sheen.
2. **Accent rule — darker emerald.** In-scene accent moments use deep emerald (`#0a7a58`, not glowing brand mint `#34d399`) so accents read as tinted graphite under ACES/bloom instead of neon: atom nucleus/electrons/orbit lines, cable sheen. Brand emerald stays reserved for DOM chrome (buttons/links per ticket 01).
3. **Lighting — three-point studio rig + emerald rim.** Warm-neutral key top-front with soft shadows, cool fill behind-left, emerald rim spotlight from behind-right (low intensity ~0.5, kisses edges rather than flooding) + faint emerald under-glow for separation. Replaces today's ambient-0.2 + single-directional setup.
4. **Atmosphere — fog + starfield AND reflective glow floor combined** (user's pick over void-only or floor-only). FogExp2 matching bg-base; faint static particle field; dark reflective plane below props picking up the emerald glow (env from a custom dark PMREM scene). The DOM gradient+grain background from ticket 01 stays regardless.
5. **Post-processing — tuned bloom + vignette.** Bloom strength ~0.2, threshold ~0.7 (catches accent glow without halating lit whites), mipmapBlur; subtle CSS/DOM vignette to focus the centerpiece. No chromatic aberration in the final look (D's CA was not carried into H). Tier-gated as today (GPU tier > 2).
6. **Motion — keep energy, calibrate down ~30%.** All playful behaviour preserved (Float on atom/logos/keyboard, electron orbits, keyboard mouse-follow, draggables); rotation intensities and float speeds reduced roughly a third so it reads composed.

### Prototype

`.scratch/visual-redesign/prototype-scene.html` — variant **H** is the chosen direction; A–E were exploration rounds (graphite vs muted vs monochrome, floor vs stars), F/G/H are the final atmosphere comparison. Serve over HTTP from repo root so the Draco models load.
