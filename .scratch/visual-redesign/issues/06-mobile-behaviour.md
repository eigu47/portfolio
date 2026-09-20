# Mobile-friendly behaviour requirements

Labels: wayfinder:grilling

Status: resolved
Blocked by: 04

## Question

Desktop-first but very mobile friendly: what exactly must change for phones? Decide per area — reduced geometry/quality settings on the 3D scene, touch interaction for the draggable objects (currently mouse-grab oriented), snap-scroll sections behaviour on small viewports, navbar/layout responsiveness, and how the resume route presents on mobile (PDF viewer is currently hidden under `sm:`). Produce concrete requirements the execution tickets can implement.

## Answer

Decided via grilling rounds (facts first gathered by a codebase audit — several ticket assumptions corrected: atom drag already works on touch via @use-gesture pointer events; scroll-snap is native CSS, not wheel-based; real pain points are drag-vs-scroll capture, stale section heights, vanished social/email rails, and `/resume` showing no preview below `sm:`).

### Requirements for execution tickets

1. **Scene quality — pure adaptive, no mobile-specific overrides.** dpr stays `[1,2]`, frameloop always, `PerformanceMonitor` drives adaptation; bloom stays GPU-tier gated (`tier > 2`) per ticket 04/08. Accepted trade-off (user's explicit pick over a conservative floor): reactive adaptation may stutter briefly on weak phones before stepping down. Requirement: the escalation ladder must include **dropping post-processing as an FPS-recovery step**, so weak devices can shed bloom without code changes.
2. **Touch interaction — direction lock.** Vertical swipes always scroll the page; horizontal drags rotate the carousel / move the atom via gesture direction-locking. `usePreventScroll` only engages after a gesture locks horizontal — never blocks a vertical swipe.
3. **Snap-scroll — dvh + proximity.** Section heights use dynamic viewport units with resize/`visualViewport` tracking (replaces the one-shot `documentElement.clientHeight` at App.tsx:16); `snap-mandatory` → `snap-proximity` on small screens; camera interpolation math keeps working off the corrected heights. Also replace deprecated `overflow: overlay`.
4. **Mobile chrome — menu holds links.** Hamburger stays; GitHub/LinkedIn/email links move into the opened mobile menu; closed navbar fully hides (kill the permanent 56px translate strip); pinch-zoom stays allowed (no `maximum-scale`).
5. **Resume route on mobile — native embed.** The static rebuilt PDF (per ticket 05) renders in an iframe/object embed below `sm:` too; prominent Download button above it; EN⇄JP toggle drives the embedded PDF exactly as on desktop.
6. **Keyboard tilt — gyro behind a keyboard tap.** A completed tap on the 3D keyboard in the hero requests iOS motion permission once and enables gyro tilt on supported touch devices. The activation event is consumed by the keyboard. Denied, skipped, unsupported, or failed activation is silent and leaves the keyboard in its idle behavior; later taps may retry after failure, while taps after success are ignored.

Note: the resume-route-on-mobile part of this question is already decided in [Resilience & accessibility requirements](09-resilience-and-accessibility.md) (PDFViewer at every breakpoint, downloads secondary) — only the scene/touch/snap/navbar parts remain open here.
