# 09 — Resume action bar + EN PDF redesign

**What to build:** `/resume` gets a top action bar reusing the navbar's **Chrome** treatment verbatim (translucent dark fill + backdrop blur + hairline bottom border): back link left, actions right. The invalid button-wraps-anchor markup is fixed with anchors styled as buttons; one primary Download button for the active document; `.xls` demoted to a quiet tertiary text link at its existing URL. The EN PDF itself is redesigned light + emerald: typographic header, avatar with emerald ring, uppercase letter-spaced section titles over emerald hairlines, skill pills, emerald level dots, QR retained (reference: `prototype-resume-restyle.html`). PDFViewer renders at every breakpoint.

**Blocked by:** 04 — Design-system foundation; 05 — Content extraction prefactor.

**Status:** resolved

- [x] Action bar visually indistinguishable from navbar Chrome treatment
- [x] Valid markup: anchors styled as buttons, no nested interactive elements
- [x] Single Download button serves the redesigned light+emerald EN PDF
- [x] `.xls` reachable as tertiary text link at its existing URL
- [x] PDF renders correctly at every breakpoint; visual inspection passes vs prototype

## Answer

Implemented the resume route's shared glass Chrome action bar, valid anchor-based actions, responsive PDF viewer, and light/emerald English document styling. The download action remains the single primary action; the legacy Japanese spreadsheet is retained as a tertiary link.
