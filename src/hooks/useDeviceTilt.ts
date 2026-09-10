import { useEffect, useState } from "react";

type Tilt = { x: number; y: number };

type DeviceOrientationPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export default function useDeviceTilt() {
  const [value, setValue] = useState<Tilt>({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const supported =
    typeof window !== "undefined" &&
    "DeviceOrientationEvent" in window &&
    (navigator.maxTouchPoints > 0 ||
      window.matchMedia?.("(pointer: coarse)").matches === true);

  useEffect(() => {
    if (!enabled) return;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setValue({
        x: Math.max(-1, Math.min(1, (event.gamma ?? 0) / 30)),
        y: Math.max(-1, Math.min(1, (event.beta ?? 0) / 30)),
      });
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, [enabled]);

  async function enable() {
    const orientation =
      window.DeviceOrientationEvent as DeviceOrientationPermission;
    if (orientation.requestPermission) {
      if ((await orientation.requestPermission()) !== "granted") return;
    }
    setEnabled(true);
  }

  return {
    value,
    supported,
    dismissed,
    enable,
    dismiss: () => setDismissed(true),
  };
}
