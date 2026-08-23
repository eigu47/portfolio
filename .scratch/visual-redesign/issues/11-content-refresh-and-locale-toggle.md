# Site-wide content/copy refresh + EN⇄日本語 toggle

Labels: wayfinder:grilling

Type: grilling
Status: resolved
Blocked by: none

## Question

The destination names the visual spec as the deliverable, with the content/copy refresh deliberately last — and the visual spec has now stabilised (every prior ticket resolved). Two coupled decisions remain before the map can clear:

1. **Site-wide EN⇄日本語 toggle** — how does locale switching work across the whole site (not just /resume)? Scope: which strings localise (nav, hero, section headings, sr-only mirror, loader, error/fallback pages), where translations live (static dictionaries vs per-component), how the toggle persists (localStorage? `?lang=` param?), default behaviour for JP vs EN browsers, and how the canvas-mirrored DOM text (per ticket 09) stays in sync.
2. **Content/copy refresh** — what actually changes in the copy itself? Current copy was written for the old look; decide tone shifts (if any) against dark-premium, what gets tightened or cut, whether project descriptions/dates are current, and anything the audit (ticket 07) flagged about content.

Deliverable of this ticket: a decided scope for both, sharp enough that `/to-spec` can collapse it into execution tickets without re-deciding.

## Answer

Resolved 2026-08-22 via grilling. The ticket's premise half-dissolved: there is **no site-wide toggle** — the EN⇄日本語 switch stays resume-scoped exactly as ticket 05 specced.

### Locale

- **Resume-scoped only.** No site-wide i18n scaffolding, no dictionaries, no library. Canvas text (hero, about, projects) is English permanently; the sr-only DOM mirror therefore never needs locale sync (this dissolves the sync clause in ticket 09's answer).
- JP translations exist only for the resume PDF (the JP `MyDocument` already specced in ticket 05). Authoring: agent drafts Japanese strings, user reviews before lock.
- No browser detection, no persistence — everything starts EN on every visit.
- `/resume?lang=ja` sets the initial PDF language for that visit only (shareable link for recruiters); bare `/resume` always opens EN. Toggle + download follow the active locale per ticket 05.

### Copy refresh

- Tone bar: **confident-minimal applies to new copy only** — loader strings (ticket 03), WebGL-failure/reduced-motion fallback and error-boundary copy (ticket 09). Existing hero/about/project copy stays verbatim.
- Casing convention: nav labels stay lowercase (`hello, about…`); PDF section titles all-caps (`SUMMARY`, `SKILLS`, `CERTIFICATIONS`, `LANGUAGES`, `INTERESTS`) — fixes today's mixed `SKILLS` vs `Summary`.
- **Location corrected to Yokohama everywhere**: resume PDF contact row (`Kawasaki, Japan` → Yokohama), `index.html` meta description ("Currently based on Kawasaki" → Yokohama). curl.txt is already correct.
- Backend stack (Node, Express, Golang) gets **added to the resume PDF's skills** rather than dropped from curl.txt; afterwards curl.txt matches the resume.

Execution note: these are content edits inside documents/artifacts specced by tickets 03, 05, 09 plus small string fixes; no further design decisions remain.
