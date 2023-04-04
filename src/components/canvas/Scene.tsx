import { Suspense } from "react";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Camera from "~/components/canvas/Camera";
import { FullViewport } from "~/components/canvas/Debug";
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
            <Keyboard />
            <Hero />
          </Page>

          <Page page={1}>
            <FullViewport />
          </Page>

          <Page page={2}>
            <FullViewport />
          </Page>

          <Page page={3}>
            <FullViewport />
          </Page>
        </Suspense>

        <Preload all />
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
