import { MathUtils, Vector3 } from "three";

export const CAMERA_PARALLAX_DISTANCE = 0.375;
export type TiltResponse = { x: number; y: number };

export function getCameraParallax(
  { x, y }: TiltResponse,
  target = new Vector3(),
) {
  const normalizedX = MathUtils.clamp(x, -1, 1);
  const normalizedY = MathUtils.clamp(y, -1, 1);
  const magnitude = Math.hypot(normalizedX, normalizedY);
  const scale = magnitude > 1 ? 1 / magnitude : 1;

  return target.set(
    normalizedX * scale * CAMERA_PARALLAX_DISTANCE,
    normalizedY * scale * CAMERA_PARALLAX_DISTANCE,
    0,
  );
}
