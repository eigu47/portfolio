# Spec: Visual redesign of eiguchipablo.dev

Labels: ready-for-agent

Status: ready-for-agent

Synthesized from the resolved decision tickets in this directory (01–12). Execution should be able to proceed ticket-by-ticket from this spec with no further design decisions. Where a ticket holds a fuller token table or prototype detail, it is referenced rather than duplicated.

## Problem Statement

The portfolio today looks dated and flat next to the work it is meant to sell: a default-ish light-on-dark scene with no design system behind it, no branded loading experience, an unstyled `/resume` route, broken meta assets (favicon set, no real OG image), heavy unoptimized fonts and dormant dependencies shipping in the production bundle, and content that lives entirely inside a WebGL canvas — invisible to crawlers, screen readers, and anyone whose GPU refuses to cooperate. On phones it behaves badly: scroll fights the scene, menus don't hide properly, and the resume viewer is hidden below a breakpoint. There is also no Japanese version of the resume despite the site's bilingual audience.

## Solution

A complete visual redesign around a **dark premium** design system: near-black gradient background with film grain, one emerald accent (`#34d399`), hairline-bordered translucent surfaces, Calibre + Noto Sans JP typography kept but polished. The interactive 3D scene stays and gets restyled to match (muted original prop colours, deep-emerald in-scene accents, three-point lighting with emerald rim, fog + starfield over a reflective glow floor, tuned bloom/vignette, motion reduced ~30%). A branded `e/p` monogram loader with a hairline progress bar covers asset loading. The `/resume` route gets a glass-chrome action bar whose **locale toggle** switches both the displayed PDF and its download between English and a newly built Japanese document. The whole effort rides on a single-transaction dependency upgrade (React 19 / fiber v9 / drei v10 / current three). Mobile gets pure adaptive scene quality, direction-locked touch scrolling, and a proper full-screen menu. When WebGL fails — or the user prefers reduced motion — the site serves a real static DOM version of the page instead of nothing.

## User Stories

1. As a visitor, I want a cohesive dark-premium look across every page, so that the site feels like a crafted product rather than a demo.
2. As a visitor, I want a single consistent accent colour guiding my eye to links and actions, so that I instantly know what is interactive.
3. As a visitor, I want a branded loading screen showing real progress while assets load, so that waiting feels intentional rather than broken.
4. As a visitor on a fast connection, I want the loader never to flash for less than a moment, so that I don't see a jarring flicker.
5. As a visitor on a slow connection, I want the loader to sit quietly showing honest progress, so that I trust the site is still working.
6. As a visitor, I want the loader to hand off smoothly into the 3D scene with a fade-and-blur reveal, so that the transition feels polished.
7. As a visitor, I want the 3D scene's colours to feel moody and premium rather than toy-like, so that the aesthetic matches the copy's ambition.
8. As a returning visitor, I want the laptop project's identity colours recognisable even when muted, so that the projects still read as the same work.
9. As a visitor, I want scene motion calmed relative to today, so that the page feels refined instead of restless.
10. As a visitor using a keyboard, I want arrow keys to spin the project carousel and focusable project links, so that I can reach the same meaning mouse users get.
11. As a screen-reader user, I want all canvas text mirrored as visually-hidden DOM with proper landmarks and sr-only headings, so that I can actually consume the site.
12. As a search engine crawler, I want real DOM text describing who Eiguchi Pablo is and what he builds, so that the site can rank and display rich results.
13. As a visitor whose browser cannot create a WebGL context, I want a fully readable static DOM version of the page, so that I get the content instead of a black screen.
14. As a visitor who loses their GPU context mid-session, I want the site to recover gracefully into that static version, so that a driver hiccup doesn't blank the page.
15. As a visitor with reduced-motion enabled, I want the same static DOM experience without 3D animation, snap-scrolling, or animated reveals, so that the site doesn't make me ill.
16. As a visitor with JavaScript disabled, I want a styled `<noscript>` page with the monogram, name, intro, and contact links, so that I still learn who this person is.
17. As a visitor experiencing a route-level crash, I want an error boundary with a retry action, so that a single failure doesn't force me to leave.
18. As a visitor, I want a favicon set and OG image matching the brand, so that tabs, bookmarks, and shared links look professional.
19. As a visitor seeing a shared link, I want a typographic OG card with name, role, and location, so that the preview communicates identity at a glance.
20. As a recruiter visiting `/resume`, I want a clean top action bar in the site's chrome treatment, so that navigation and downloads are obvious.
21. As an English-speaking recruiter, I want to view and download the English PDF, so that I can assess the candidate in my language.
22. As a Japanese-speaking recruiter, I want to toggle to 日本語 and have both the displayed PDF *and* the download switch to Japanese, so that everything I take away is consistently localised.
23. As a visitor arriving via `/resume?lang=ja`, I want the resume to start in Japanese, so that deep links respect the language I was sent.
24. As a visitor, I want one Download button reflecting the active locale, so that I'm not puzzled by parallel per-language buttons.
25. As a legacy-link holder, I want the old `.xls` download still reachable as a quiet tertiary link, so that old references don't break.
26. As a recruiter on a phone, I want the resume PDF rendered inline at any breakpoint, so that I can read it without downloading.
27. As a visitor reading the resume, I want a light, print-friendly document with emerald accents, clear small-caps section titles, and skill pills, so that it reads like a designed artefact.
28. As a visitor, I want the static public PDF rebuilt after the redesign, so that directly-linked copies match the new design.
29. As a mobile visitor, I want vertical swipes always to scroll the page regardless of where I touch, so that I never get trapped by the scene.
30. As a mobile visitor, I want scene quality adapted automatically to my device, so that the page stays smooth without a separate "mobile version".
31. As a mobile visitor, I want viewport-relative heights tracked live (including browser chrome show/hide), so that layout doesn't jump or clip.
32. As a mobile visitor, I want the nav menu to hold my social/email links and disappear completely when closed, so that it never obstructs content.
33. As a curious mobile visitor, I want an optional non-invasive "tilt" chip enabling gyro parallax, so that I choose whether the scene reacts to my hands.
34. As a desktop visitor, I want hover states that lift surfaces and warm borders toward emerald, so that interactivity feels tangible.
35. As a visitor, I want muted secondary text that still passes AA contrast against the grain-and-glass background, so that I can read everything comfortably.
36. As a low-vision visitor, I want clearly visible focus outlines on all interactive elements, so that I can track where I am on the page.
37. As a power user, I want the debug panel available behind a URL parameter without leva shipping in production, so that dev tooling costs nothing for normal visitors.
38. As a first-time visitor on metered data, I want Japanese font subsets delivered as woff2 only in the weight needed, so that the page doesn't cost tens of megabytes.
39. As a visitor, I want performance measured before/after rather than against arbitrary budgets, so that improvements are demonstrably real.
40. As a maintainer, I want dependencies upgraded in one transaction including React/fiber/three majors, so that the codebase sits on supported versions with breakage fixed once.
41. As a maintainer, I want dormant dependencies removed from the production bundle, so that the shipped site carries only what runs.
42. As a visitor reading the refreshed copy, I want confident-minimal tone, lowercase nav labels, and Yokohama stated correctly everywhere, so that details reinforce credibility.

## Implementation Decisions

- **Design system (ticket 01).** Token table as decided: `bg-base #09090b`, `bg-grad-top #0d0d11`, `accent #34d399`, `accent-glow rgba(52,211,153,.25–.35)`, `text-hi #f1f5f9`, `text-lo #94a3b8`, `surface rgba(255,255,255,0.03)`. Background: layered dark gradient + top-centre radial emerald glow + faint cool counter-glow + fixed SVG film-grain overlay (~4% alpha). Chrome rule: hairline borders (`rgba(255,255,255,0.08)`), soft large shadows, backdrop-blur reserved for overlay chrome only. Radii 12–16px; airy spacing; emerald used sparingly — one accent moment per view region. Typography stays Calibre + Noto Sans JP with tighter display tracking and a clear size hierarchy.
- **Contrast tokens (ticket 10).** Body-copy grey stays at the AA-safe value (6.78:1 vs worst-case composite); a new darker `text-faint` token exists for decorative/disabled/large-only use and is banned from body copy. Future contrast checks measure against the worst-case composite background, not the flat base. Focus treatment: emerald ring + halo.
- **Loading experience (ticket 03).** DOM overlay outside the Canvas (not a Suspense fallback inside it): centred `e/p` monogram with emerald slash, 220px hairline track with glowing emerald fill, small mono percentage. Progress driven by real asset progress with an ease-out curve. Gated on completion AND a 0.8s minimum display; reveal = ~250ms hold, ~700ms fade+blur out, scene fades/scales in from 1.04. Stalled loads sit quietly — no retry hint, no timeout messaging.
- **Scene restyle (ticket 04).** Original prop palette muted (laptop keeps blue/red/orange identity, desaturated + darkened); deep-emerald in-scene accents; three-point rig plus emerald rim spotlight; fog + starfield combined with reflective glow floor; bloom + vignette tuned; existing motion kept at roughly −30%. Interactive prototype variant H is the reference.
- **Performance (ticket 08).** Noto Sans JP subset to woff2 Regular only. Leva fully removed from prod; the `?debug` panel rebuilt on lil-gui behind a dynamic import. Canvas keeps `frameloop="always"` with adaptive performance scaling; device pixel ratio capped at `[1, 2]`. No hard perf budgets — capture a before/after baseline instead.
- **Dependency upgrade (ticket 02).** Single-transaction bump: React 19, fiber v9, drei v10, current three, @react-pdf/renderer 4.x (mind the PDFViewer API caveat), react-router and Tailwind majors as needed. Drop leva entirely.
- **Resume route (ticket 05).** Top action bar reusing the navbar's chrome treatment verbatim (translucent dark fill + blur + hairline bottom border); back link left, actions right; anchors styled as buttons fixing the invalid button-wraps-anchor markup. A locale toggle switches both displayed PDF and download target; one primary Download button per active locale; `.xls` demoted to tertiary text link at its existing URL. PDF document goes light + emerald: typographic header, avatar with emerald ring, uppercase letter-spaced section titles over emerald hairlines, skill pills, emerald level dots, QR retained. A Japanese document variant is built with the JP font chunk loaded only for it. The public static PDF is rebuilt post-redesign.
- **Mobile behaviour (ticket 06).** Pure adaptive scene quality — no mobile-specific overrides; escalation ladder may drop post-processing. Touch direction-locked: vertical gestures always scroll. Small screens use dynamic-viewport units with live viewport tracking and snap-proximity camera. Mobile menu contains social/email links and fully hides when closed. Phones get a native iframe embed of the static PDF. Gyro tilt opts in through a completed tap on the 3D keyboard; failed or unsupported activation is silent.
- **Resilience & accessibility (ticket 09).** One render branch rule: reduced-motion OR WebGL failure → static DOM fallback page carrying name, about, projects with links, contact links. ErrorBoundary around the Canvas recovering into that fallback; route-level boundaries with retry; catch-all redirect to home stays. Landmarks (`header`/`main`/`footer`), sr-only section headings, sr-only mirror of all canvas text. Keyboard paths for meaning-bearing controls (carousel ←/→, focusable project links, tab-reachable tooltips); decorative draggables aria-hidden. Static branded `<noscript>` in the entry HTML. Browser-default focus outlines minimally restyled. PDFViewer renders at every breakpoint.
- **Content & locale scope (ticket 11).** No site-wide i18n: the toggle stays resume-scoped, canvas text remains English permanently, no persistence; the query parameter sets initial resume language for that visit only. Copy refresh applies confident-minimal tone to new copy only (loader, fallback), lowercase nav labels, all-caps PDF section titles, Yokohama corrected in resume contact row and metadata, backend stack added to resume skills.
- **Meta assets (ticket 12).** Favicon: `e/p` monogram on dark gradient tile with emerald slash, optically centred; exported as SVG, PNG 32, ICO, apple-touch 180; no dark-mode variant. OG image: typographic card with staggered centred name, role pinned left, location bottom-right; exact spacing tunable during implementation.
- **Execution order.** Dependency upgrade and design-system foundation land before dependent visual work; content/copy refresh is last on the route, per the map.

## Testing Decisions

- **Good tests assert external behavior only**: what renders, what the user can do, what happens on failure — never internal state, component structure, or implementation details.
- **One seam.** All automated tests go through a single high seam: rendering the root app in a jsdom-like environment with WebGL stubbed or unavailable, then asserting observable outcomes — loader appears then yields to content; reduced-motion or WebGL failure shows the static DOM fallback; landmarks and the sr-only canvas-text mirror exist; the resume locale toggle switches the displayed document language and download target; the query parameter sets the initial locale; error boundaries present retry. Keyboard interactions (carousel arrows) are exercised at the same seam.
- **Test framework is part of the work**: Vitest + Testing Library are added as part of execution — none are installed today.
- **Prior art**: none in the repo; these are the first tests. Keep them behavioural and few enough to stay maintainable.
- **Not under automated test**: visual/design-system work — palette tokens, grain/glass treatments, scene restyle, loader visuals, PDF typography, favicon/OG artwork. These are verified by building the site and visual inspection against the locked prototypes in this directory, plus a build-time check that fonts/assets emitted match expectations.

## Out of Scope

- Site-wide internationalisation beyond the resume-scoped toggle (decided against in ticket 11).
- Replacing or removing the interactive 3D scene — it is restyled, not replaced.
- Custom 404 page — the catch-all redirect to home stays.
- Loader stall/retry messaging — deliberate quiet behaviour; revisit only with real-world evidence.
- Hard performance budgets — baseline comparison instead.
- New typeface pairings or new font files beyond the JP subset.
- Content rewriting of existing copy — refresh applies to new copy only.
- Automated visual-regression/screenshot testing infrastructure.

## Further Notes

- This spec consolidates tickets 01–12 in `.scratch/visual-redesign/issues/`; those files remain the source of truth for full token tables, prototype references, and rationale. Prototypes referenced: design system, loading experience, scene (variant H), resume restyle, muted contrast, meta assets.
- Glossary terms used: **Chrome** (navbar surface treatment is canonical; resume action bar and overlays reuse it verbatim) and **Locale toggle** (one source of truth: the active locale drives display and downloads alike).
- Suggested execution order follows the dependency edges the tickets were resolved under: upgrade → design system → loader → scene → resume → mobile → resilience/a11y → meta assets → content refresh last.
