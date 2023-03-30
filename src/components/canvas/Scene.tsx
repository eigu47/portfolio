import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Debugs from "~/components/canvas/Debugs";
import Keyboard from "~/components/canvas/Keyboard";

export default function Scene() {
  return (
    <Canvas shadows className="!fixed top-0">
      {/* <ambientLight intensity={0.3} /> */}
      <spotLight
        castShadow
        intensity={0.2}
        position={[10, 15, 10]}
        angle={0.2}
        penumbra={0.5}
      />
      <Keyboard />
      <Environment preset="sunset" />
      <Debugs />
    </Canvas>
  );
}
