# Site-wide improvement audit

Labels: wayfinder:research

Status: resolved
Blocked by: none

## Question

Beyond the already-named work (colours/shadows/background, loader, resume, upgrades), what else about this site feels amateurish or below professional bar? Audit the running site visually and the codebase structurally: accessibility basics, SEO/meta freshness (OG image), favicon set, error states, performance red flags (font loading, asset sizes), animation polish, empty/edge states. Return a prioritised findings list; items worth deciding become new map tickets, the rest feed the final spec's checklist.

## Answer

Static audit of `src/`, `index.html`, `public/`, `vercel.json`, `tailwind.config.cjs`. `npm run build` could not be observed (no `node_modules` installed; deps unresolved — itself a finding for onboarding: no lockfile-friendly install docs, only stale `yarn.lock` with npm-style `package.json`).

### P1 — embarrassing

1. **All site content lives only inside WebGL canvas text** (`src/App.tsx:12-17` renders empty `<section>`s; hero/about/projects are drei `<Text>`) — zero DOM headings/text means no `<h1>` anywhere, invisible to screen readers and crawlers. Catastrophic for an a11y/SEO pass.
2. **Invalid interactive nesting + dead-end UX on `/resume`** — `<button>` wrapping `<a>`/`PDFDownloadLink` (`src/components/resume/Index.tsx:32-66`) is invalid HTML and double-focusable; `PDFDownloadLink`'s `{loading}` render prop is unused so the button looks dead while the PDF builds.
3. **Japanese resume is a legacy `.xls` binary at a raw non-ASCII URL** — `href="/栄口パブロ.xls"` (`src/components/resume/Index.tsx:44`, file in `public/`). An unencoded Japanese filename + Excel 97 format reads as very amateur; should be a PDF (and URL-encoded).
4. **No error boundaries or real 404** — router catch-all silently `<Navigate to="/">` (`src/main.tsx:37`); a lazy-chunk load failure or WebGL/Canvas crash leaves a blank dark page with no recovery path.
5. **Broken favicon set** — the only icon is `public/favicon.ico`, which is actually PNG bytes named `.ico` at 32×32; no apple-touch-icon, SVG icon, webmanifest, or `theme-color`. Looks broken in iOS/Android bookmarks and dark tab bars.

### P2 — should fix

6. **posthog init without guards or config** — `posthog.init(import.meta.env.VITE_POSTHOG_KEY as string)` runs unconditionally (`src/main.tsx:14-16`): undefined env vars are cast away, no autocapture config, no DNT/opt-out respect, and no pageview wiring for the SPA's hash-scroll "pages".
7. **Meta freshness** — description has grammar error ("Currently based on Kawasaki") and reads placeholder-ish mixed EN/JP; no canonical link; `og:image` lacks width/height/alt; twitter tags use `property=` instead of `name=` for image/url. Good news: `og-image.jpg` exists and is correctly 1200×630. Title is generic ("Eiguchi Pablo's portfolio").
8. **Stale/conflicting copy across surfaces** — `public/curl.txt` says "Yokohama" and lists Golang/Express skills vs "Kawasaki"/no-backend everywhere else; About 3D text differs from resume summary; carousel links point at old deploy URLs (`country-quiz-eigu.vercel.app`, `keyboard-sniper.web.app`) bypassing the pretty `vercel.json` redirects like `/country-quiz`.
9. **vercel.json catch-all rewrite** — `/(.*) → /` returns index.html with HTTP 200 for every missing asset path, masking broken links/assets and polluting analytics.
10. **Dev tooling shipped to production** — leva `useControls` panels wired into 8+ prod components (Navbar, Layout, Camera, Carousel, Cable, Atom, TechLogos, Debug) plus `r3f-perf`; `?debug` exposes a live scene editor to any visitor and leva bloats the bundle even when hidden.
11. **No robots.txt / sitemap.xml** in `public/`.
12. **Section heights computed once from `document.documentElement.clientHeight` during render** (`src/App.tsx:16`, also `useScrollPos.ts`) — never re-measured on resize/orientation change → snap misalignment on mobile rotate.

### P3 — nice

13. Deprecated `overflow: overlay` and webkit-only scrollbar styling (`src/global.css:10-31`); no `scrollbar-gutter`.
14. React key-on-fragment warning in resume `Languages.tsx` (missing key on `<>` list) — console noise in dev/prod builds.
15. OG/Twitter meta blocks triplicate the same strings (`index.html:16-40`) — single-source them or generate head at build.
16. `tailwind.config.cjs` has an empty `colors.extend: {}` shell; design-system ticket will fill it but it signals unfinished config.
17. Unoptimized heavy assets feeding the perf spec with concrete numbers: `keyboard.gltf` 366KB + `laptop.glb` 89KB uncompressed, fonts as TTF not woff2 subsets (~7 font files), project images 540px JPG/PNG mix.
18. The bash-resume easter egg (`public/bash.sh`, `curl.txt`) is undocumented on the site — either surface it ("$ curl eiguchipablo.dev | bash" footer line) or cut it; right now it's dead weight that ships stale info (see #8).
19. Navbar mobile menu uses translate hacks and lacks `aria-current` for the active page though `scrollPage` is already known (`src/components/Navbar.tsx:29-55`).
20. `package.json` version `0.0.0`, no separate lint/format scripts, ESLint 8-era stack (covered by upgrades ticket — this confirms priority).

Note: stray PDFs in `public/` (`CS50x.pdf`, `Pablo Martin Eiguchi-ScrumAlliance_CSM_Certificate.pdf`, `EiguchiPablo.pdf/jpg`) appear intentionally hosted as credential links; verify they're actually linked somewhere, else remove — nothing in `src/` references them.
