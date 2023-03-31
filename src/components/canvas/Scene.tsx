import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import Debugs from "~/components/canvas/Debugs";
import Keyboard from "~/components/canvas/Keyboard";

export default function Scene() {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") != null;

  return (
    <>
      <Canvas className="!fixed top-0">
        <ambientLight intensity={0.2} />
        <spotLight
          intensity={0.5}
          position={[10, 15, 10]}
          angle={0.2}
          penumbra={0.5}
        />
        <Keyboard />
        {isDebug && <Debugs />}
      </Canvas>
      {!isDebug && <Leva hidden={!isDebug} />}
    </>
  );
}
