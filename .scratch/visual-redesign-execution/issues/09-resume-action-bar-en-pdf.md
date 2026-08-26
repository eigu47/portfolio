# 09 — Resume action bar + EN PDF redesign

**What to build:** `/resume` gets a top action bar reusing the navbar's **Chrome** treatment verbatim (translucent dark fill + backdrop blur + hairline bottom border): back link left, actions right. The invalid button-wraps-anchor markup is fixed with anchors styled as buttons; one primary Download button for the active document; `.xls` demoted to a quiet tertiary text link at its existing URL. The EN PDF itself is redesigned light + emerald: typographic header, avatar with emerald ring, uppercase letter-spaced section titles over emerald hairlines, skill pills, emerald level dots, QR retained (reference: `prototype-resume-restyle.html`). PDFViewer renders at every breakpoint.

**Blocked by:** 04 — Design-system foundation; 05 — Content extraction prefactor.

**Status:** ready-for-agent

- [ ] Action bar visually indistinguishable from navbar Chrome treatment
- [ ] Valid markup: anchors styled as buttons, no nested interactive elements
- [ ] Single Download button serves the redesigned light+emerald EN PDF
- [ ] `.xls` reachable as tertiary text link at its existing URL
- [ ] PDF renders correctly at every breakpoint; visual inspection passes vs prototype
