import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baselineRoot = join(root, ".scratch/laptop-rendering/baselines");
const runRoot = join(root, ".scratch/laptop-rendering/current");
const session = `laptop-visual-regression-${process.pid}`;
const updateBaselines = process.env.UPDATE_LAPTOP_BASELINES === "1";
const appUrl = process.env.LAPTOP_VISUAL_URL ?? "http://localhost:3000";

const viewports = [
  { id: "desktop", width: 1440, height: 900, crop: "1000x800+220+100" },
  { id: "mobile", width: 390, height: 844, crop: "390x744+0+100" },
];

const states = [
  {
    id: "approach",
    targetScrollPage: { desktop: 2.75, mobile: 2.75 },
    assertBacksideHidden: true,
  },
  {
    id: "contact",
    targetScrollPage: { desktop: 3, mobile: 3.5 },
    assertBacksideHidden: false,
  },
  {
    id: "resume",
    targetScrollPage: { desktop: 4, mobile: 4 },
    assertBacksideHidden: false,
  },
];

function runBrowser(...args) {
  return execFileSync("agent-browser", ["--session", session, ...args], {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit",
  });
}

function cropScreenshot(source, destination, geometry) {
  execFileSync("convert", [source, "-crop", geometry, "+repage", destination], {
    cwd: root,
    stdio: "inherit",
  });
}

function assertAppReady() {
  runBrowser(
    "eval",
    "if (document.body.textContent?.includes('ErrorBoundary') || !document.querySelector('canvas')) throw new Error('Portfolio scene did not become ready'); 'ready'",
  );
}

function assertScreenLink() {
  runBrowser(
    "eval",
    "const link = document.querySelector('.screen-link a'); if (link?.getAttribute('href') !== '/EiguchiPablo.pdf' || getComputedStyle(link).pointerEvents !== 'auto') throw new Error('Screen PDF link is not interactive'); 'ready'",
  );
}

function whitePixelRatio(path) {
  return Number.parseFloat(
    execFileSync(
      "convert",
      [
        path,
        "-colorspace",
        "gray",
        "-threshold",
        "80%",
        "-format",
        "%[fx:mean]",
        "info:",
      ],
      { cwd: root, encoding: "utf8" },
    ),
  );
}

function assertBacksidePreviewHidden(current, assertBacksideHidden) {
  if (!assertBacksideHidden) return;

  const currentRatio = whitePixelRatio(current);

  if (currentRatio > 0.08) {
    throw new Error(
      `${current} exposes a resume-like surface during the backside transition: white-pixel ratio ${currentRatio.toFixed(3)}`,
    );
  }
}

function capture(viewport, state, currentScrollPage, output) {
  const targetScrollPage = state.targetScrollPage[viewport.id];

  if (viewport.id === "desktop") {
    if (state.id === "resume") {
      runBrowser("click", "a[href='#resume']");
      runBrowser("wait", "10000");
      runBrowser("screenshot", output);
      return targetScrollPage;
    }

    runBrowser("eval", "window.scrollTo(0, 0)");
    runBrowser("wait", "1000");
    runBrowser(
      "eval",
      `window.scrollTo(0, ${Math.round(viewport.height * targetScrollPage)})`,
    );
    runBrowser("wait", "10000");
    runBrowser("screenshot", output);
    return targetScrollPage;
  }

  const steps = Math.max(
    1,
    Math.ceil((targetScrollPage - currentScrollPage) / 0.25),
  );

  for (let step = 1; step <= steps; step += 1) {
    const page = Math.min(
      targetScrollPage,
      currentScrollPage +
        ((targetScrollPage - currentScrollPage) * step) / steps,
    );
    runBrowser(
      "eval",
      `window.scrollTo(0, ${Math.round(viewport.height * page)})`,
    );
    runBrowser("wait", "700");
  }

  runBrowser("wait", "8000");
  runBrowser("screenshot", output);
  return targetScrollPage;
}

rmSync(runRoot, { recursive: true, force: true });
mkdirSync(runRoot, { recursive: true });

try {
  for (const viewport of viewports) {
    if (viewport.id === "desktop") {
      runBrowser("open", appUrl);
      runBrowser("wait", "20000");
      runBrowser(
        "set",
        "viewport",
        String(viewport.width),
        String(viewport.height),
      );
    } else {
      runBrowser("open", "about:blank");
      runBrowser(
        "set",
        "viewport",
        String(viewport.width),
        String(viewport.height),
      );
      runBrowser("open", appUrl);
      runBrowser("wait", "20000");
    }
    assertAppReady();
    runBrowser(
      "eval",
      "document.documentElement.style.scrollSnapType='none'; document.documentElement.style.scrollBehavior='auto'",
    );
    runBrowser("wait", viewport.id === "desktop" ? "10000" : "3000");
    assertAppReady();
    assertScreenLink();
    let currentScrollPage = 0;

    for (const state of states) {
      const raw = join(runRoot, `${viewport.id}-${state.id}.png`);
      const current = join(runRoot, `${viewport.id}-${state.id}-crop.png`);
      const baseline = join(baselineRoot, `${viewport.id}-${state.id}.png`);

      currentScrollPage = capture(viewport, state, currentScrollPage, raw);
      cropScreenshot(raw, current, viewport.crop);

      if (updateBaselines) {
        mkdirSync(dirname(baseline), { recursive: true });
        copyFileSync(current, baseline);
        continue;
      }

      if (!existsSync(baseline)) {
        throw new Error(
          `Missing baseline ${baseline}; run UPDATE_LAPTOP_BASELINES=1 npm run test:laptop-visual`,
        );
      }

      assertBacksidePreviewHidden(current, state.assertBacksideHidden);
    }

    runBrowser("close");
  }
} finally {
  try {
    runBrowser("close");
  } catch {
    // The browser may already be closed after a successful viewport run.
  }
  rmSync(runRoot, { recursive: true, force: true });
}

// eslint-disable-next-line no-console
console.log(
  updateBaselines
    ? "Laptop visual baselines updated."
    : "Laptop visual regression passed.",
);
