# Spec: Visual redesign execution

Status: ready-for-agent

Execution spec for the visual redesign, broken into tracer-bullet implementation tickets (01–14 in this directory).

The full design spec — problem statement, user stories, implementation decisions, testing decisions, out-of-scope — lives at [`.scratch/visual-redesign/spec.md`](../visual-redesign/spec.md), consolidated from resolved decision tickets 01–12 in `.scratch/visual-redesign/issues/`. Those files remain the source of truth for token tables and prototype references.

## Execution order

Dependency edges across tickets: 01 → 02 → {03, 04, 05, 13} fan out in parallel → their dependents (06–12) → 14 last. Content/copy refresh is last on the route per the map.

## Testing decisions (apply to every ticket)

Behavioural tests only, through one high seam: render the root app in a jsdom-like environment with WebGL stubbed or unavailable; assert observable outcomes. Vitest + Testing Library arrive with ticket 01. Visual/design work (palette, grain/glass, scene restyle, loader visuals, PDF typography, favicon/OG) is verified by building and inspecting against the locked prototypes in `.scratch/visual-redesign/` — not under automated test.
