import { describe, expect, it } from "vitest";

import { getCameraParallax } from "~/components/canvas/cameraParallax";

describe("camera parallax", () => {
  it("moves right and up opposite a leftward and forward tilt", () => {
    expect(getCameraParallax({ x: 1, y: 1 }).toArray()).toEqual([
      0.375, 0.375, 0,
    ]);
  });

  it("clamps the normalized response at the maximum offset", () => {
    expect(getCameraParallax({ x: -2, y: 2 }).toArray()).toEqual([
      -0.375, 0.375, 0,
    ]);
  });
});
