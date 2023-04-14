import { useRef } from "react";

import { Float, Line, Sphere, Trail, useDetectGPU } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, EllipseCurve } from "three";

import Dragabble from "~/components/canvas/Dragabble";
import { type Layout } from "~/utils/types";
import useViewport from "~/utils/useViewport";

const points = new EllipseCurve(
  0,
  0,
  3,
  1.15,
  0,
  2 * Math.PI,
  false,
  0
).getPoints(100);

const bloomCyan = new Color(0.1, 1.2, 1.2);
const normalCyan = new Color("cyan");
const bloonNucleous = new Color(6, 0.2, 2);
const normalNucleous = new Color(2, 2, 2);

export default function Atom({
  scale = 0.1,
  ...props
}: { scale?: number } & JSX.IntrinsicElements["group"]) {
  const basicRef = useRef<THREE.MeshBasicMaterial>(null);
  const { width, height, device } = useViewport();
  const { tier } = useDetectGPU();

  const cyan = tier > 2 ? bloomCyan : normalCyan;

  const layout: Layout<JSX.IntrinsicElements["group"]> = {
    mobile: { position: [0, height * 0.2, 0] },
    desktop: { position: [-width * 0.4, height * 0.2, 0] },
  };

  return (
    <group {...layout[device]} {...props}>
      <Dragabble hoverColor={[basicRef, normalNucleous, bloonNucleous]}>
        <Float
          speed={1}
          rotationIntensity={50}
          floatIntensity={0}
          scale={scale}
        >
          <Line
            worldUnits
            points={points}
            color={cyan}
            lineWidth={0.3 * scale}
            toneMapped={tier < 2}
          />
          <Line
            worldUnits
            points={points}
            color={cyan}
            lineWidth={0.3 * scale}
            rotation={[0, 0, 1]}
            toneMapped={tier < 2}
          />
          <Line
            worldUnits
            points={points}
            color={cyan}
            lineWidth={0.3 * scale}
            rotation={[0, 0, -1]}
            toneMapped={tier < 2}
          />
          <Electron speed={3} scale={scale} />
          <Electron rotation={[0, 0, Math.PI / 3]} speed={4} scale={scale} />
          <Electron rotation={[0, 0, -Math.PI / 3]} speed={3.5} scale={scale} />
          <Sphere args={[0.55, 64, 64]}>
            {tier > 2 ? (
              <meshBasicMaterial
                ref={basicRef}
                color={[3, 0.5, 1]}
                toneMapped={false}
              />
            ) : (
              <meshPhysicalMaterial
                color={"cyan"}
                roughness={0.5}
                metalness={0.5}
              />
            )}
          </Sphere>
        </Float>
      </Dragabble>
    </group>
  );
}

function Electron({
  radius = 3,
  speed = 4,
  scale = 1,
  ...props
}: {
  radius?: number;
  speed?: number;
  scale?: number;
} & JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;

    ref.current?.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });

  return (
    <group {...props}>
      <Trail
        width={5 * scale}
        length={8 * scale}
        color={new Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}
