import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import Keyboard from "~/components/Keyboard";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="h-screen">
        <div className="absolute bottom-0 h-[50vh] w-full">
          <Scene>
            <Keyboard />
          </Scene>
        </div>
      </main>
      <div className="h-screen" />
      <Layout />
    </>
  );
}

function Scene({
  children,
  cameraPos = [0, 0, 4],
}: {
  children: React.ReactNode;
  cameraPos?: [number, number, number];
}) {
  return (
    <Canvas shadows camera={{ position: cameraPos }}>
      {/* <color attach="background" args={["slategray"]} /> */}
      <ambientLight intensity={0.5} />
      <spotLight
        castShadow
        intensity={0.5}
        position={[10, 15, 10]}
        angle={0.2}
        penumbra={1}
      />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
