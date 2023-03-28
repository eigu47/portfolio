import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import Keyboard from "~/components/Keyboard";

function App() {
  return (
    <>
      <main className="h-80">
        <Canvas shadows camera={{ position: [0, 0, 3] }}>
          {/* <color attach="background" args={["slategray"]} /> */}
          <ambientLight intensity={0.5} />
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
      </main>
      <div className="h-screen"></div>
    </>
  );
}

export default App;
