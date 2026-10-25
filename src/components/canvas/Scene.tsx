import { lazy, Suspense, useRef, useState } from "react";

import { PerformanceMonitor, Preload, useDetectGPU } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type * as THREE from "three";

import About from "~/components/canvas/About";
import Atmosphere from "~/components/canvas/Atmosphere";
import Atom from "~/components/canvas/Atom";
import Cable from "~/components/canvas/Cable";
import Camera from "~/components/canvas/Camera";
import Carousel from "~/components/canvas/Carousel";
import Debug from "~/components/canvas/Debug";
import Hero from "~/components/canvas/Hero";
import Keyboard from "~/components/canvas/Keyboard";
import Laptop from "~/components/canvas/Laptop";
import Page from "~/components/canvas/Page";
import TechLogos from "~/components/canvas/TechLogos";
import useDeviceTilt from "~/hooks/useDeviceTilt";
import { isDebugVisit } from "~/utils/debugStore";

const DebugPanel = lazy(() => import("~/components/canvas/DebugPanel"));

export default function Scene() {
  const cableRef = useRef<THREE.Mesh>(null);
  const { tier } = useDetectGPU();
  const [quality, setQuality] = useState(2);
  const tilt = useDeviceTilt();

  return (
    <>
      <Canvas
        aria-hidden="true"
        className="!fixed top-0 !h-[100dvh] scale-[1.04] touch-pan-y opacity-0 [transition:opacity_900ms_ease,transform_1200ms_cubic-bezier(0.22,1,0.36,1)]"
        data-scene-shell
        dpr={[1, 2]}
        frameloop="always"
        performance={{ min: 0.5 }}
        shadows={quality > 0 ? "soft" : false}
      >
        <PerformanceMonitor
          onDecline={() => setQuality((value) => Math.max(0, value - 1))}
          onIncline={() => setQuality((value) => Math.min(2, value + 1))}
          onFallback={() => setQuality(0)}
        />
        <Camera tilt={tilt.value} />
        <Atmosphere />

        <Suspense fallback={<Hero />}>
          <Page page={0}>
            <Hero />
            <Keyboard
              cableRef={cableRef}
              onClick={(event) => {
                event.stopPropagation();
                void tilt.enable();
              }}
            />
            <Cable cableRef={cableRef} />
          </Page>

          <Page page={1}>
            <Atom />
            <About />
            <TechLogos />
          </Page>

          <Page page={2}>
            <Carousel />
          </Page>

          <Page page={3}>
            <Laptop />
          </Page>

          <Preload all />
        </Suspense>

        {tier > 2 && quality > 0 && (
          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={quality === 2 ? 0.2 : 0.1}
              radius={quality === 2 ? 0.24 : 0.12}
              luminanceThreshold={0.82}
            />
          </EffectComposer>
        )}

        {isDebugVisit && <Debug />}
      </Canvas>
      <div aria-hidden="true" className="scene-vignette" data-scene-vignette />
      {isDebugVisit && (
        <Suspense fallback={null}>
          <DebugPanel />
        </Suspense>
      )}
    </>
  );
}
