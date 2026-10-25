# 15 — Resume asset single source of truth

**What to build:** The static resume artifacts (`/EiguchiPablo.pdf`, `/EiguchiPablo.jpg`) are hand-made and have gone stale relative to the generated `MyDocument`. The resume route displays the EN document from the static file in an iframe while the download button serves the generated PDF — two sources for one document. Route display and laptop preview must come from the single source of truth: the `/resume` route renders `MyDocument` via PDFViewer for both locales, and the build regenerates the static PDF and its page-1 rasterization from `MyDocument` so they can never drift.

**Blocked by:** 09 — Resume action bar + EN PDF; 10 — JP PDF locale toggle.

**Status:** resolved

- [x] `/resume` displays `MyDocument` via PDFViewer for both locales (no static-file iframe)
- [x] Build regenerates `public/EiguchiPablo.pdf` from the EN `MyDocument`
- [x] Build regenerates `public/EiguchiPablo.jpg` from that exact PDF (page 1)
- [x] Laptop screen link and preview serve the regenerated assets

## Answer

Ticket 11's "native iframe embed" is superseded: PDFViewer *is* a native iframe
under the hood (`@react-pdf/renderer` renders one), so phones keep the native
viewer while the bytes are generated at runtime — always the latest resume. The
EN/JA branch in `resume/Index.tsx` collapsed into a single PDFViewer.

For the static artifacts, `npm run gen:resume-assets` (wired into `build`,
after the font check) renders the EN `MyDocument` in Node via a Vite SSR
bundle (`scripts/generate-resume-assets.tsx`), writes `public/EiguchiPablo.pdf`,
then rasterizes page 1 to `public/EiguchiPablo.jpg` with `pdf-to-img`
(`scale: 2`, JPEG). Font registration became explicit
(`registerCalibreFonts` in `resume/Document.tsx`) because the SSR build
resolves TTF imports to web URLs that Node cannot read; the route passes Vite
asset URLs, the generator passes disk paths. `MyDocument` grew an
`avatarSrc` override for the same reason (Header's `/avatar.jpg` is not a
resolvable Node path).

Trade-off accepted: `npm run dev` serves the committed artifacts until the
next build; staleness in a deployment is impossible because every build
regenerates both files.
