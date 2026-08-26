import { vi } from "vitest";

import "@testing-library/jest-dom/vitest";

// --- DOM APIs jsdom lacks but the app's dependencies touch ---

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof globalThis.ResizeObserver;
}

window.matchMedia =
  window.matchMedia ??
  ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));

// troika-three-text (drei <Text>) builds its worker from an object URL
if (typeof globalThis.Worker === "undefined") {
  globalThis.Worker = class Worker {
    onmessage: ((e: MessageEvent) => void) | null = null;
    onerror: ((e: ErrorEvent) => void) | null = null;
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
      return true;
    }
  } as unknown as typeof globalThis.Worker;
}

globalThis.URL.createObjectURL ??= () => "blob:stub";
globalThis.URL.revokeObjectURL ??= () => {};

// --- deterministic GPU tier (detect-gpu would otherwise hit the network) ---
vi.mock("@react-three/drei", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@react-three/drei")>();
  return {
    ...actual,
    useDetectGPU: () => ({ tier: 0, isMobile: false, type: "stub" }),
  };
});
