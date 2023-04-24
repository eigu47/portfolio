import { useRef } from "react";

import { Float, Line, Sphere, Trail, useDetectGPU } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Color, EllipseCurve } from "three";

import { useDebug } from "~/components/canvas/Debug";
import Dragabble from "~/components/canvas/Dragabble";
import useViewport from "~/utils/useViewport";

const bloomCyan = new Color(0.1, 1.2, 1.2);
const normalCyan = new Color("cyan");
const bloonNucleous = new Color(6, 0.2, 2);
const normalNucleous = new Color(2, 2, 2);

export default function Atom({
  scale = 0.1,
  ...props
}: { scale?: number } & JSX.IntrinsicElements["group"]) {
  const basicRef = useRef<THREE.MeshBasicMaterial>(null);
  const physicalRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const { debugOn } = useControls({ debugOn: false });
  const { width, height, mobile } = useViewport();
  const { tier } = useDetectGPU();
  const { ...debug } = useDebug();

  const cyan = tier > 2 ? bloomCyan : normalCyan;

  return (
    <group
      position={
        mobile ? [0, height * 0.3, 0] : [-width * 0.35, height * 0.2, 0]
      }
      {...props}
      {...debug}
    >
      <Dragabble
        hoverColor={
          tier > 2
            ? [basicRef, normalNucleous, bloonNucleous]
            : [physicalRef, normalCyan, bloonNucleous]
        }
      >
        <Float rotationIntensity={50} scale={scale}>
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
                ref={physicalRef}
                color={normalCyan}
                roughness={0.5}
                metalness={0.5}
              />
            )}
          </Sphere>

          <Sphere
            args={[2, 8, 8]}
            visible={debugOn}
            material-wireframe={true}
          />
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
  const electronRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;

    electronRef.current?.position.set(
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
  0
).getPoints(100);
