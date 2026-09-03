import { useEffect, useState } from "react";

import { useProgress } from "@react-three/drei";

const MINIMUM_DISPLAY_MS = 800;
const COMPLETION_HOLD_MS = 250;
const EXIT_DURATION_MS = 700;

export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const [startedAt] = useState(() => Date.now());
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">(
    "visible",
  );

  useEffect(() => {
    if (active || progress < 100) return;

    const remaining = Math.max(
      0,
      MINIMUM_DISPLAY_MS - (Date.now() - startedAt),
    );
    let exitTimer: number | undefined;
    const holdTimer = window.setTimeout(() => {
      setPhase("exiting");
      exitTimer = window.setTimeout(() => setPhase("hidden"), EXIT_DURATION_MS);
    }, remaining + COMPLETION_HOLD_MS);

    return () => {
      window.clearTimeout(holdTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
    };
  }, [active, progress, startedAt]);

  if (phase === "hidden") return null;

  const percentage = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      className={`loading-screen loading-screen--${phase}`}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div className="loading-screen__content">
        <p className="loading-screen__mark" aria-hidden="true">
          e<span>/</span>p
        </p>
        <div
          className="loading-screen__progress"
          role="progressbar"
          aria-label="Loading assets"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <span style={{ width: `${percentage}%` }} />
        </div>
        <p className="loading-screen__percentage">loading {percentage}%</p>
      </div>
    </div>
  );
}
