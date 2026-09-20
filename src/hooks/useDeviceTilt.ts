import { useEffect, useRef, useState } from "react";

import { Euler, MathUtils, Quaternion } from "three";

type DeviceOrientationPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};
type Tilt = { x: number; y: number };
type Orientation = { alpha: number; beta: number; gamma: number };

const TILT_RANGE_DEGREES = 30;
const DEVICE_ORIENTATION_OFFSET = new Quaternion(
  -Math.sqrt(0.5),
  0,
  0,
  Math.sqrt(0.5),
);

function orientationQuaternion({ alpha, beta, gamma }: Orientation) {
  return new Quaternion()
    .setFromEuler(
      new Euler(
        MathUtils.degToRad(beta),
        MathUtils.degToRad(alpha),
        MathUtils.degToRad(-gamma),
        "YXZ",
      ),
    )
    .multiply(DEVICE_ORIENTATION_OFFSET);
}

function relativeTilt(baseline: Quaternion, current: Quaternion): Tilt {
  const rotation = new Euler().setFromQuaternion(
    baseline.clone().invert().multiply(current),
    "YXZ",
  );

  return {
    x: Math.max(
      -1,
      Math.min(1, -MathUtils.radToDeg(rotation.y) / TILT_RANGE_DEGREES),
    ),
    y: Math.max(
      -1,
      Math.min(1, MathUtils.radToDeg(rotation.x) / TILT_RANGE_DEGREES),
    ),
  };
}

export default function useDeviceTilt() {
  const [value, setValue] = useState<Tilt>({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const baseline = useRef<Quaternion | null>(null);
  const supported =
    typeof window !== "undefined" &&
    "DeviceOrientationEvent" in window &&
    (navigator.maxTouchPoints > 0 ||
      window.matchMedia?.("(pointer: coarse)").matches === true);

  useEffect(() => {
    if (!enabled) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta === null || event.gamma === null) return;
      const current = orientationQuaternion({
        alpha: event.alpha ?? 0,
        beta: event.beta,
        gamma: event.gamma,
      });
      if (!baseline.current) {
        baseline.current = current;
        return;
      }

      setValue(relativeTilt(baseline.current, current));
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [enabled]);

  async function enable() {
    if (!supported || enabled) return;

    try {
      const orientation =
        window.DeviceOrientationEvent as DeviceOrientationPermission;
      if (orientation?.requestPermission) {
        if ((await orientation.requestPermission()) !== "granted") return;
      }
      baseline.current = null;
      setValue({ x: 0, y: 0 });
      setEnabled(true);
    } catch {
      setEnabled(false);
    }
  }

  return {
    value,
    supported,
    enabled,
    enable,
  };
}
