import { MathUtils, Vector3 } from "three";

export const CAMERA_PARALLAX_DISTANCE = 0.375;

export function getCameraParallax(
  { x, y }: { x: number; y: number },
  target = new Vector3(),
) {
  return target.set(
    MathUtils.clamp(x, -1, 1) * CAMERA_PARALLAX_DISTANCE,
    MathUtils.clamp(y, -1, 1) * CAMERA_PARALLAX_DISTANCE,
    0,
  );
}
