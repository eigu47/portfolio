import { useState } from "react";

import { Center, Decal, Float, Html, useTexture } from "@react-three/drei";
import { useControls } from "leva";

import {
  html,
  javascript,
  nextjs,
  redux,
  tailwindcss,
  threejs,
  typescript,
} from "~/assets/logos";
import { useDebug } from "~/components/canvas/Debug";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function TechLogos() {
  const { mobile, width, height } = useViewport();

  const gap = (width * 0.8) / LOGOS.length;

  return (
    <Center position={[0, -height * 0.25, 0]} disableZ disableY>
      {LOGOS.map((ball, i) => (
        <Ball
          key={ball.name}
          ball={ball}
          position={
            mobile
              ? [gap * i, i % 2 ? -gap * 2 : 0, 0]
              : [gap * i, i % 2 ? -gap * 0.5 : 0, 0]
          }
          scale={mobile ? 0.2 : 0.3}
        />
      ))}
    </Center>
  );
}

function Ball({
  ball: { name, src, scale },
  ...props
}: { ball: (typeof LOGOS)[number] } & JSX.IntrinsicElements["group"]) {
  const { debugOn } = useControls({ debugOn: false });
  const texture = useTexture(src);
  const debug = useDebug();
  const [showModal, setModal] = useState(false);
  const { mobile } = useViewport();

  return (
    <group {...props} {...debug}>
      <Float speed={4}>
        <mesh
          onPointerEnter={() => !mobile && setModal(true)}
          onPointerLeave={() => !mobile && setModal(false)}
          onPointerDown={() => setModal(true)}
          onPointerMissed={() => setModal(false)}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={COLORS.slate100} flatShading />
          <Decal
            map={texture}
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={1.2 * scale}
            debug={debugOn}
            flatShading
          />
        </mesh>
      </Float>

      {showModal && (
        <Html position={[0.5, -0.5, 0]}>
          <div className="rounded border border-cyan-800 bg-cyan-950 p-2">
            <p>{name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export const LOGOS = [
  { name: "HTML", src: html, scale: 1 },
  { name: "Javascript", src: javascript, scale: 1 },
  { name: "Typescript", src: typescript, scale: 1 },
  { name: "Next.js", src: nextjs, scale: 1 },
  { name: "Tailwindcss", src: tailwindcss, scale: 1.3 },
  { name: "Three.js", src: threejs, scale: 1.3 },
  { name: "Redux", src: redux, scale: 1 },
] as const;
