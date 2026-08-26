# 10 — JP PDF + locale toggle

**What to build:** The resume's **Locale toggle** works end-to-end: one source of truth (the active locale) drives both the displayed PDF and the download target between English and a newly built Japanese document. The JP PDF mirrors the EN design (typographic header, emerald sections, skill pills) using the JP font chunk loaded only for that document. Arriving via `/resume?lang=ja` starts the visit in Japanese; no persistence beyond the visit. The public static PDF (`EiguchiPablo.pdf`) is rebuilt post-redesign so directly-linked copies match the new design.

**Blocked by:** 09 — Resume action bar + EN PDF redesign.

**Status:** ready-for-agent

- [ ] Toggle switches displayed document language AND download filename/content together
- [ ] Japanese PDF built from ticket 05's locale-aware data; JP font chunk loads only for it
- [ ] `/resume?lang=ja` sets initial locale for that visit; no persistence; canvas text stays EN permanently
- [ ] Seam test covers toggle behaviour and query-param initial locale
- [ ] Static public PDF rebuilt to match the new EN design
