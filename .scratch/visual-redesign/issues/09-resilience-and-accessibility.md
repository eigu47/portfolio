# Resilience & accessibility requirements

Labels: wayfinder:grilling

Status: resolved
Blocked by: none

## Question

What must this site do when things go wrong or users differ from the assumed default? Decide: fallback experience when WebGL is unavailable/context creation fails; `prefers-reduced-motion` behaviour (scene animations, loader, snap-scroll); baseline accessibility — keyboard navigation around a mouse-driven draggable scene, focus states, contrast against the dark palette, semantic landmarks, alt/aria for canvas content. Output explicit requirements the execution tickets must satisfy.

## Answer

**1. WebGL failure → DOM content fallback.** When WebGL is unavailable or context creation fails (at mount or mid-session via context-loss), render a real DOM version of the page: name, about text, project list with links, contact links — same content as the scene, no 3D. This doubles as the fix for the audit's "all content is canvas-only" P1.

**2. Reduced motion → one branch rule.** `prefers-reduced-motion` swaps the whole 3D experience for the *same* static DOM page from (1). One render branch covers both conditions: reduced-motion OR WebGL failure → DOM version. No 3D, no CSS snap, no animated loader reveal. (Slightly beyond WCAG's letter — scroll-driven camera is user-initiated — but cheapest unambiguously-compliant option since the DOM page must exist anyway.)

**3. Keyboard = meaning, not mimicry.** Anything carrying information or action gets a keyboard path: project carousel spins via ←/→ arrow keys and exposes focusable project links; tech-logo tooltips reachable by tab. Decorative draggables (atom) are aria-hidden / non-interactive for assistive tech. No fake drag implementations.

**4. Structure & text mirror.** Add `<header>`/`<main>`/`<footer>` landmarks; each section gets an sr-only heading; all canvas text (hero, about, project titles) mirrored as visually-hidden DOM so screen readers and crawlers see real content.

**5. Contrast — spun out.** Deliberately not decided here; a prototype ticket ([Muted-text contrast prototype](10-muted-text-contrast-prototype.md)) will put candidate muted-grey ramps + emerald usage on the dark/grain background for visual selection of AA-passing tokens.

**6. Resume on mobile.** PDFViewer renders at every breakpoint (`@react-pdf` works on phones); download actions become secondary. The current `hidden … sm:block` hiding goes away.

**7. Failure states — boundaries only.** ErrorBoundary around the Canvas (recovers into the (1) fallback) plus route-level ErrorBoundaries with retry UI; lazy-chunk loading state while /resume loads. Catch-all redirect to `/` stays — no custom 404 page.

**8. No-JS → static branded noscript.** Hand-written HTML in `index.html` inside `<noscript>`, styled inline to match dark premium: monogram, name, one-line intro, email + `/resume` links. The React fallback can't serve this case (nothing runs without JS), so it's a small one-time duplication.

**9. Focus states.** Minimal restyling of browser-default focus outlines — no custom ring token system.
