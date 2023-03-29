import { useRef } from "react";

import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Hero from "~/components/Hero";
import Keyboard from "~/components/Keyboard";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Canvas
        // className="!overflow-visible [&>div>div]:!overflow-visible"
        shadows
      >
        <ambientLight intensity={0.3} />
        <spotLight
          castShadow
          intensity={0.5}
          position={[10, 15, 10]}
          angle={0.2}
          penumbra={0.5}
        />
        <ScrollControls pages={2}>
          <Scroll html>
            <Hero />
          </Scroll>

          <Scroll>
            <Keyboard />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Layout />
    </>
  );
}
