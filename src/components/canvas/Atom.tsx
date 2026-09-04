import { useRef, useState } from "react";

import {
  Float,
  Icosahedron,
  Line,
  Sphere,
  Trail,
  useDetectGPU,
} from "@react-three/drei";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import type * as THREE from "three";
import { Color, EllipseCurve } from "three";

import Draggable from "~/components/canvas/Draggable";
import useViewport from "~/hooks/useViewport";
import { useDebugStore } from "~/utils/debugStore";

const bloomCyan = new Color(0.1, 1.2, 1.2);
const normalCyan = new Color("cyan");
const bloomNucleus = new Color(6, 0.2, 2);
const normalNucleus = new Color(2, 2, 2);

export default function Atom({
  scale = 0.1,
  ...props
}: { scale?: number } & ThreeElements["group"]) {
  const basicRef = useRef<THREE.MeshBasicMaterial>(null);
  const physicalRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const debugOn = useDebugStore((state) => state.debugOn);
  const { width, height, mobile } = useViewport();
  const { tier } = useDetectGPU();

  const cyan = tier > 2 ? bloomCyan : normalCyan;

  return (
    <group
      position={
        mobile ? [0, height * 0.3, 0] : [-width * 0.35, height * 0.2, 0]
      }
      {...props}
    >
      <Draggable
        hoverColor={
          tier > 2
            ? [basicRef, normalNucleus, bloomNucleus]
            : [physicalRef, normalCyan, bloomNucleus]
        }
      >
        <Float rotationIntensity={35} scale={scale}>
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
          <Electron speed={2.1} scale={scale} />
          <Electron rotation={[0, 0, Math.PI / 3]} speed={2.8} scale={scale} />
          <Electron
            rotation={[0, 0, -Math.PI / 3]}
            speed={2.45}
            scale={scale}
          />
          <Sphere args={[0.55]}>
            {tier > 2 ? (
              <meshBasicMaterial
                ref={basicRef}
                color={[3, 0.5, 1]}
                toneMapped={false}
              />
            ) : (
              <meshPhysicalMaterial
                ref={physicalRef}
                color={normalCyan}
                roughness={0.5}
                metalness={0.5}
              />
            )}
          </Sphere>

          <Icosahedron
            args={[2, 0]}
            visible={debugOn}
            material-wireframe={true}
          />
        </Float>
      </Draggable>
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
} & ThreeElements["group"]) {
  const electronRef = useRef<THREE.Mesh>(null);
  const [trailWidth, setTrailWidth] = useState(0);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const t = elapsed * speed;

    electronRef.current?.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0,
    );
    // fixes weird flicker at start
    !trailWidth && elapsed > 1 && setTrailWidth(5 * scale);
  });

  return (
    <group {...props}>
      <Trail
        width={trailWidth}
        length={8 * scale}
        color={new Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={electronRef}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

const points = new EllipseCurve(
  0,
  0,
  3,
  1.15,
  0,
  2 * Math.PI,
  false,
  0,
).getPoints(100);
