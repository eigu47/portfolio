import { Component, type ReactNode } from "react";

import { render, type RenderResult } from "@testing-library/react";

import App from "~/App";
import { installWebGL } from "~/test/webgl-stub";

/**
 * ErrorBoundary used to observe how the app fails when WebGL is unavailable.
 * Today the tree survives but no fallback exists (see ticket 06); the
 * boundary makes any future crash observable instead of failing the test.
 */
class ProbeBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) return null;
    return this.props.children;
  }
}

export interface AppSeam extends RenderResult {
  /** The first error caught while rendering (null = rendered cleanly). */
  getError: () => Error | null;
}

/**
 * High seam for behavioural tests: renders the root app in jsdom.
 *
 * - `webgl: "stubbed"` — a fake GL context is provided so the scene mounts.
 * - `webgl: "unavailable"` — context creation fails, like on devices without
 *   WebGL. Drives the resilience work in ticket 06.
 *
 * Cleanup: pair with `cleanup()` (Testing Library) and `restoreWebGL()`
 * (this module) in an afterEach.
 */
export function renderApp(
  webgl: "stubbed" | "unavailable" = "stubbed"
): AppSeam {
  installWebGL(webgl);

  let boundaryRef: ProbeBoundary | null = null;
  const { unmount, ...result } = render(
    <ProbeBoundary ref={(instance) => (boundaryRef = instance)}>
      <App />
    </ProbeBoundary>
  );

  return {
    ...result,
    getError: () => boundaryRef?.state.error ?? null,
    unmount,
  };
}
