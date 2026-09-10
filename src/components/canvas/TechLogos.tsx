import { useState } from "react";

import {
  Center,
  Decal,
  Float,
  Html,
  Icosahedron,
  useTexture,
} from "@react-three/drei";
import { type ThreeElements } from "@react-three/fiber";

import {
  html,
  javascript,
  nextjs,
  react,
  tailwindcss,
  threejs,
  typescript,
} from "~/assets/logos";
import { useDebug } from "~/components/canvas/Debug";
import useViewport from "~/hooks/useViewport";
import { useDebugStore } from "~/utils/debugStore";

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
          last={i === LOGOS.length - 1}
        />
      ))}
    </Center>
  );
}

function Ball({
  ball: { name, src, scale },
  last,
  ...props
}: {
  ball: (typeof LOGOS)[number];
  last: boolean;
} & ThreeElements["group"]) {
  const debugOn = useDebugStore((state) => state.debugOn);
  const texture = useTexture(src);
  const debug = useDebug();
  const [showModal, setModal] = useState(false);
  const { mobile } = useViewport();

  return (
    <group {...props} {...debug}>
      <Float speed={1.96} rotationIntensity={0.245} floatIntensity={0.245}>
        <Icosahedron
          args={[1, 1]}
          castShadow
          onPointerEnter={() => !mobile && setModal(true)}
          onPointerLeave={() => !mobile && setModal(false)}
          onPointerDown={() => setModal(true)}
          onPointerMissed={() => setModal(false)}
        >
          <meshStandardMaterial color="#94a3b8" flatShading />
          <Decal
            map={texture}
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={1.2 * scale}
            debug={debugOn}
            // flatShading
          />
        </Icosahedron>
      </Float>

      {showModal && (
        <Html position={mobile && last ? [-0.5, -0.5, 0] : [0.5, -0.5, 0]}>
          <div className="rounded-surface border-hairline bg-surface border p-2 text-center">
            <p>{name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export const LOGOS = [
  { name: "HTML/CSS", src: html, scale: 1 },
  { name: "Javascript", src: javascript, scale: 1 },
  { name: "Typescript", src: typescript, scale: 1 },
  { name: "Next.js", src: nextjs, scale: 1 },
  { name: "React Native", src: react, scale: 1.2 },
  { name: "Tailwind", src: tailwindcss, scale: 1.3 },
  { name: "Three.js", src: threejs, scale: 1.3 },
] as const;
