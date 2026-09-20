import { describe, expect, it } from "vitest";

import { getCameraParallax } from "~/components/canvas/cameraParallax";

describe("camera parallax", () => {
  it("moves right and up opposite a leftward and forward tilt", () => {
    const parallax = getCameraParallax({ x: 1, y: 1 });

    expect(parallax.x).toBeCloseTo(0.265165, 5);
    expect(parallax.y).toBeCloseTo(0.265165, 5);
    expect(parallax.length()).toBeCloseTo(0.375, 5);
  });

  it("clamps the normalized response before applying camera parallax", () => {
    expect(getCameraParallax({ x: -2, y: 0 }).toArray()).toEqual([
      -0.375, 0, 0,
    ]);
  });
});
