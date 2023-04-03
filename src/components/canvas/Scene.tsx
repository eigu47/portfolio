import { Suspense } from "react";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Block from "~/components/canvas/Block";
import Cable from "~/components/canvas/Cable";
import Camera from "~/components/canvas/Camera";
import Debug from "~/components/canvas/Debug";
import Hero from "~/components/canvas/Hero";
import Keyboard from "~/components/canvas/Keyboard";

export default function Scene() {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") != null;

  return (
    <>
      <Canvas className="!fixed top-0">
        <Camera />

        <Suspense fallback={null}>
          <Block offset={0}>
            <Keyboard />
            <Hero />
            {/* <Cable /> */}
          </Block>

          <Block offset={1}>
            <Keyboard />
            <Block>
              <Hero />
            </Block>
          </Block>
        </Suspense>

        <Preload all />
        {isDebug && <Debug />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
