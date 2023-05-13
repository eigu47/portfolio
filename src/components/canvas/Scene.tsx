import { Suspense, useRef } from "react";

import { Preload, useDetectGPU } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Leva } from "leva";

import About from "~/components/canvas/About";
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

const isDebug =
  new URLSearchParams(window.location.search).get("debug") != null;

export default function Scene() {
  const cableRef = useRef<THREE.Mesh>(null);
  const { tier } = useDetectGPU();

  return (
    <>
      <Canvas className="!fixed top-0 !h-screen">
        <Camera />

        <Suspense fallback={<Hero />}>
          <Page page={0}>
            <Hero />
            <Keyboard cableRef={cableRef} />
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

        {tier > 2 && (
          <EffectComposer>
            <Bloom mipmapBlur intensity={0.3} radius={0.2} />
          </EffectComposer>
        )}

        {isDebug && <Debug />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
