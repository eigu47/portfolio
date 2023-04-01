import { Suspense } from "react";

import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Camera from "~/components/canvas/Camera";
import Debugs from "~/components/canvas/Debugs";
import Keyboard from "~/components/canvas/Keyboard";
export default function Scene() {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") != null;

  return (
    <>
      <Canvas className="!fixed top-0">
        <Camera />

        <Suspense fallback={null}>
          <Keyboard />
        </Suspense>

        <Preload all />
        {isDebug && <Debugs />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
