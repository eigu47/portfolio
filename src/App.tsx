import { Suspense } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Keyboard from "~/components/Keyboard";

function App() {
  return (
    <>
      <main className="h-80">
        <Canvas>
          {/* <color attach="background" args={["slategray"]} /> */}
          <PerspectiveCamera makeDefault position={[0, -1, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} />
          <Suspense fallback={null}>
            <Keyboard />
          </Suspense>
        </Canvas>
      </main>
      <div className="h-screen"></div>
    </>
  );
}

export default App;
