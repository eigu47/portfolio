# 11 — Mobile behaviour

**What to build:** The site behaves properly on phones. Scene quality is purely adaptive — no mobile-specific overrides; an escalation ladder may drop post-processing as perf demands. Touch is direction-locked: vertical gestures always scroll the page, never get trapped by the scene. Small screens use dynamic-viewport units with live viewport tracking and mandatory snap scrolling (snap-proximity camera framing simplified out during execution). The mobile menu holds social/email links and fully hides when closed (never obstructs content). Phones get a native iframe embed of the rebuilt static PDF. Gyro tilt is opt-in via a completed tap on the 3D keyboard in the hero; failed or unsupported activation is silent.

**Blocked by:** 08 — Scene restyle; 10 — JP PDF + locale toggle.

**Status:** resolved

- [x] Vertical swipes always scroll regardless of touch target; horizontal scene gestures unaffected
- [x] Adaptive quality ladder works; post-processing droppable under load
- [x] dvh + live viewport tracking: no layout jump/clip when browser chrome shows/hides; mandatory snap scrolling on small screens
- [x] Mobile menu contains social/email links and is fully removed from the page when closed
- [x] Phones render the resume PDF inline in a native iframe
- [x] Tapping the 3D keyboard opts into gyro parallax; failures are silent and the gesture is non-invasive

## Comments

- Post-review decision change (ticket 15): the "native iframe embed of the
  rebuilt static PDF" line above is superseded. PDFViewer is itself a native
  iframe, but fed by the runtime-generated `MyDocument`, so phones always see
  the latest resume instead of a hand-made static file that drifts stale. The
  checkbox above is retained as the historical acceptance of the original
  approach; `/resume` now renders PDFViewer for both locales.
