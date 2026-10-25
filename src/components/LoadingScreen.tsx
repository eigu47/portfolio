import { useEffect, useState } from "react";

import { useProgress } from "@react-three/drei";

const MINIMUM_DISPLAY_MS = 500;
const COMPLETION_HOLD_MS = 250;
const EXIT_DURATION_MS = 500;

export default function LoadingScreen() {
  const { active, progress } = useProgress();
  const percentage = Number.isFinite(progress)
    ? Math.round(Math.min(100, Math.max(0, progress)))
    : 0;
  const [startedAt] = useState(() => Date.now());
  const [phase, setPhase] = useState<"visible" | "exiting" | "hidden">(
    "visible",
  );
  const [displayedPercentage, setDisplayedPercentage] = useState(percentage);
  // Storing information from previous renders: re-render inline rather than
  // mutating a ref during render, which is concurrency-unsafe in React 19.
  if (percentage > displayedPercentage) {
    setDisplayedPercentage(percentage);
  }

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

  return (
    <div
      className={`bg-bg-base fixed inset-0 z-40 grid place-items-center [background-image:var(--page-background)] opacity-100 transition-[opacity,filter] duration-700 ease-in ${
        phase === "exiting" ? "pointer-events-none opacity-0 blur-md" : ""
      }`}
      data-loading-overlay
      data-loading-phase={phase}
      role="status"
      aria-label="loading portfolio"
      aria-live="polite"
    >
      <div className="flex w-3xs flex-col items-center">
        <p
          className="text-text-hi mb-8 flex items-center font-mono text-6xl leading-none font-medium tracking-[-0.02em]"
          aria-hidden="true"
        >
          e<span className="text-accent">/</span>p
        </p>
        <div
          className="bg-hairline h-0.5 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-label="loading assets"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayedPercentage}
        >
          <span
            className="to-accent block h-full rounded-full bg-gradient-to-r from-accent-half shadow-[0_0_12px_var(--color-accent-glow)] transition-[width] duration-[350ms] ease-out"
            style={{ width: `${displayedPercentage}%` }}
          />
        </div>
        <p className="text-text-lo mt-4 self-end font-mono text-sm tracking-[0.15em] [font-variant-numeric:tabular-nums]">
          loading {displayedPercentage}%
        </p>
      </div>
    </div>
  );
}
