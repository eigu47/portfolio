import { Suspense } from "react";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Leva } from "leva";

import Atom from "~/components/canvas/Atom";
import Camera from "~/components/canvas/Camera";
import Debug, { FullViewport } from "~/components/canvas/Debug";
import Hero from "~/components/canvas/Hero";
import Keyboard from "~/components/canvas/Keyboard";
import Page from "~/components/canvas/Page";

const isDebug =
  new URLSearchParams(window.location.search).get("debug") != null;

export default function Scene() {
  return (
    <>
      <Canvas className="!fixed top-0">
        <Camera />

        <Suspense fallback={null}>
          <Page>
            <Hero />
            <Keyboard />
          </Page>

          <Page page={1}>
            <Atom />
          </Page>

          <Page page={2}>
            <FullViewport />
          </Page>

          <Page page={3}>
            <FullViewport />
          </Page>
        </Suspense>

        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.5} />
        </EffectComposer>
        <Preload all />
        {isDebug && <Debug />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
