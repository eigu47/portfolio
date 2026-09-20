import { cleanup, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import useDeviceTilt from "~/hooks/useDeviceTilt";

const originalDeviceOrientationEvent = window.DeviceOrientationEvent;
const originalMaxTouchPoints = navigator.maxTouchPoints;

type TiltValue = { x: number; y: number };

function TiltHarness() {
  const { enable, value } = useDeviceTilt();

  return (
    <>
      <button onClick={() => void enable()} type="button">
        Keyboard
      </button>
      <output data-testid="tilt-value">
        {value ? JSON.stringify(value) : "unset"}
      </output>
    </>
  );
}

async function dispatchOrientation(beta: number, gamma: number, alpha = 0) {
  const event = new Event("deviceorientation");
  Object.defineProperties(event, {
    alpha: { value: alpha },
    beta: { value: beta },
    gamma: { value: gamma },
  });
  await act(() => window.dispatchEvent(event));
}

function getTiltValue(): TiltValue {
  return JSON.parse(
    screen.getByTestId("tilt-value").textContent ?? "{}",
  ) as TiltValue;
}

beforeEach(() => {
  Object.defineProperty(window, "DeviceOrientationEvent", {
    configurable: true,
    value: class DeviceOrientationEvent extends Event {},
  });
  Object.defineProperty(navigator, "maxTouchPoints", {
    configurable: true,
    value: 1,
  });
});

afterEach(() => {
  cleanup();
  Object.defineProperty(window, "DeviceOrientationEvent", {
    configurable: true,
    value: originalDeviceOrientationEvent,
  });
  Object.defineProperty(navigator, "maxTouchPoints", {
    configurable: true,
    value: originalMaxTouchPoints,
  });
});

describe("device tilt", () => {
  it("uses the first orientation as neutral and maps portrait tilt to scene direction", async () => {
    const user = userEvent.setup();
    render(<TiltHarness />);

    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(0, 0);
    await dispatchOrientation(15, -15);

    const value = getTiltValue();
    expect(value.x).toBeCloseTo(0.5, 1);
    expect(value.y).toBeCloseTo(0.5, 1);
  });

  it("keeps Android's forward-pitch Euler jump on the vertical axis", async () => {
    const user = userEvent.setup();
    render(<TiltHarness />);

    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(90, 0);
    await dispatchOrientation(80, -180, 180);

    const value = getTiltValue();
    expect(value.x).toBeCloseTo(0, 1);
    expect(value.y).toBeCloseTo(1 / 3, 1);
  });

  it("keeps a deliberate horizontal tilt larger than one sensor step", async () => {
    const user = userEvent.setup();
    render(<TiltHarness />);

    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(90, 0);
    await dispatchOrientation(90, 60);

    const value = getTiltValue();
    expect(value.x).toBeLessThan(0);
    expect(value.y).toBeCloseTo(0, 1);
  });

  it("keeps horizontal movement active during a pitched orientation", async () => {
    const user = userEvent.setup();
    render(<TiltHarness />);

    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(90, 0);
    await dispatchOrientation(80, -180, 180);
    await dispatchOrientation(80, -180, 165);

    const value = getTiltValue();
    expect(value.x).toBeGreaterThan(0);
    expect(value.y).toBeCloseTo(1 / 3, 1);
  });

  it("silently allows a denied activation to be retried", async () => {
    let permission: "denied" | "granted" = "denied";
    Object.defineProperty(window.DeviceOrientationEvent, "requestPermission", {
      configurable: true,
      value: async () => permission,
    });
    const user = userEvent.setup();
    render(<TiltHarness />);

    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(0, 0);
    await dispatchOrientation(15, -15);
    expect(getTiltValue()).toEqual({ x: 0, y: 0 });

    permission = "granted";
    await user.click(screen.getByRole("button", { name: "Keyboard" }));
    await dispatchOrientation(0, 0);
    await dispatchOrientation(15, -15);
    expect(getTiltValue().x).toBeCloseTo(0.5, 1);
  });
});
