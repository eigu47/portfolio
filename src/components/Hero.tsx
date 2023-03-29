import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import Keyboard from "~/components/Keyboard";

export default function Hero() {
  return (
    <main className="container mx-auto h-screen max-w-full">
      <div className="absolute bottom-0 h-[50vh] w-full">
        <Canvas shadows camera={{ position: [0, 0, 4] }}>
          {/* <color attach="background" args={["slategray"]} /> */}
          <ambientLight intensity={0.3} />
          <spotLight
            castShadow
            intensity={0.5}
            position={[10, 15, 10]}
            angle={0.2}
            penumbra={1}
          />
          <Suspense fallback={null}>
            <Keyboard />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
