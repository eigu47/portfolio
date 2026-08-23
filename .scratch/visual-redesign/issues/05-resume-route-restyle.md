# Resume route restyle spec

Labels: wayfinder:grilling

Status: resolved
Blocked by: 01

## Question

What does the redesigned /resume route look like, both around the PDF and inside it? Around: dark premium chrome replacing the gray buttons row, layout of download/back actions. Inside the PDF (@react-pdf/renderer stays): modernised typography, section styling, colour accents within print constraints. Also decide the fate of the `.xls` Japanese-format download (keep, replace with a proper JP PDF, or drop).

## Answer

Decided via grilling rounds 1–3 + UI prototype (`prototype-resume-restyle.html` in this directory — chrome A/B/C × PDF 1/2/3 switchable).

### Page chrome

- **Top action bar** won (over side rail and floating dock). It reuses the **site navbar's surface treatment verbatim**: translucent dark fill `rgba(9,9,11,0.7)` + `blur(12px)` + `1px` hairline bottom border — per the design system's "blur reserved for overlay chrome" rule.
- Back link ("← Back to portfolio") left; actions right.
- Fix the audit-flagged invalid `<button>`-wraps-`<a>` markup: links are anchors styled as buttons.

### Actions — language toggle replaces dual download buttons

- An **EN ⇄ 日本語 toggle** switches both the *displayed* PDF document and the download target.
- One emerald primary **Download** button produces the PDF for the active locale (EN → `EiguchiPablo.pdf`, JP → Japanese-named file).
- The legacy `.xls` stays reachable at its URL (`/栄口パブロ.xls`) but is demoted to a quiet tertiary text link in the bar.

### PDF document (light + emerald direction won over dark premium and monochrome)

- White page, slate text; emerald is the single accent.
- Typographic header (indigo banner removed): name large with tight tracking, role in emerald, contact rows right-aligned, circular avatar kept top-right with an emerald ring.
- Section titles: uppercase, small (~11px), letter-spaced, slate-500, over a thin **emerald hairline** rule (normalises today's mixed casing).
- Skills as faint-emerald rounded pills; languages as emerald level dots; certification scores accented emerald; QR block retained.

### Japanese variant

- Build a Japanese `MyDocument` variant with @react-pdf/renderer using Noto Sans JP (already licensed); shown when the toggle is 日本語. Font chunk loads only for the JP document.

### Static file

- `public/EiguchiPablo.pdf` is kept but must be rebuilt after the redesign so it matches the new document.

Mobile presentation of the viewer remains ticket 06's scope. Site-wide copy/i18n remains deliberately last per the map's fog — only the resume-route locale switch is decided here.
