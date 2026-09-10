# 11 — Mobile behaviour

**What to build:** The site behaves properly on phones. Scene quality is purely adaptive — no mobile-specific overrides; an escalation ladder may drop post-processing as perf demands. Touch is direction-locked: vertical gestures always scroll the page, never get trapped by the scene. Small screens use dynamic-viewport units with live viewport tracking and snap-proximity camera framing. The mobile menu holds social/email links and fully hides when closed (never obstructs content). Phones get a native iframe embed of the rebuilt static PDF. Gyro tilt is opt-in via a non-invasive "tilt" chip.

**Blocked by:** 08 — Scene restyle; 10 — JP PDF + locale toggle.

**Status:** resolved

- [x] Vertical swipes always scroll regardless of touch target; horizontal scene gestures unaffected
- [x] Adaptive quality ladder works; post-processing droppable under load
- [x] dvh + live viewport tracking: no layout jump/clip when browser chrome shows/hides; snap-proximity on small screens
- [x] Mobile menu contains social/email links and is fully removed from the page when closed
- [x] Phones render the resume PDF inline in a native iframe
- [x] Tilt chip opt-in enables gyro parallax; dismissible and non-invasive
