import { Canvas } from "@react-three/fiber";

import Keyboard from "~/components/Keyboard";

export default function Scene() {
  return (
    <Canvas shadows className="!fixed top-0">
      <ambientLight intensity={0.3} />
      <spotLight
        castShadow
        intensity={0.5}
        position={[10, 15, 10]}
        angle={0.2}
        penumbra={0.5}
      />
      <Keyboard />
    </Canvas>
  );
}
