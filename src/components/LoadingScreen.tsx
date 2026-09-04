import { useEffect, useState } from "react";

import { useProgress } from "@react-three/drei";

const MINIMUM_DISPLAY_MS = 500;
const COMPLETION_HOLD_MS = 250;
const EXIT_DURATION_MS = 500;

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
      className={`bg-bg-base fixed inset-0 z-40 grid place-items-center [background-image:var(--page-background)] opacity-100 transition-[opacity,filter] duration-700 ease-in ${
        phase === "exiting" ? "pointer-events-none opacity-0 blur-[10px]" : ""
      }`}
      data-loading-overlay
      data-loading-phase={phase}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div className="flex w-[min(220px,calc(100vw-3rem))] flex-col items-center">
        <p
          className="text-text-hi mb-8 flex items-center font-mono text-6xl leading-none font-medium tracking-[-0.02em]"
          aria-hidden="true"
        >
          e<span className="text-accent">/</span>p
        </p>
        <div
          className="bg-hairline h-0.5 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-label="Loading assets"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentage}
        >
          <span
            className="to-accent block h-full rounded-full bg-gradient-to-r from-[rgba(52,211,153,0.5)] shadow-[0_0_12px_var(--color-accent-glow)] transition-[width] duration-[350ms] ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-text-lo mt-4 self-end font-mono text-[13px] tracking-[0.15em] [font-variant-numeric:tabular-nums]">
          loading {percentage}%
        </p>
      </div>
    </div>
  );
}
