import { Suspense, useRef } from "react";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { type Mesh } from "three";

import Cable from "~/components/canvas/Cable";
import Camera from "~/components/canvas/Camera";
import Debugs from "~/components/canvas/Debugs";
import Hero from "~/components/canvas/Hero";
import Keyboard from "~/components/canvas/Keyboard";

export default function Scene() {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") != null;
  const cableRef = useRef<Mesh>(null);

  return (
    <>
      <Canvas className="!fixed top-0">
        <Camera />

        <Suspense fallback={null}>
          <Keyboard />
          <Hero />
          {/* <Cable cableRef={cableRef} /> */}
        </Suspense>

        <Preload all />
        {isDebug && <Debugs />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
