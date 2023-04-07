import { type ComponentProps, useRef, useState } from "react";

import {
  Float,
  Line,
  Sphere,
  Trail,
  useCursor,
  useDetectGPU,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import {
  Color,
  EllipseCurve,
  Vector3,
  type Mesh,
  Euler,
  Quaternion,
} from "three";

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
const dragPos = new Vector3();
const dragRot = new Quaternion();

export default function Atom({
  scale = 0.1,
  ...props
}: { scale?: number } & JSX.IntrinsicElements["group"]) {
  const [hover, setHover] = useState(false);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const atomRef = useRef<THREE.Group>(null);
  const camera = useThree(({ camera }) => camera);
  const { width, height, size } = useViewport();
  const { tier } = useDetectGPU();
  const cyan = tier > 2 ? bloomCyan : normalCyan;
  useCursor(hover);

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ offset }) => {
      dragPos
        .set(
          width * (offset[0] / size.width),
          height * -(offset[1] / size.height),
          0
        )
        .applyQuaternion(camera.getWorldQuaternion(dragRot));
    },
  });

  useFrame((_, delta) => {
    materialRef.current?.color.lerp(
      hover ? bloonNucleous : normalNucleous,
      delta * 8
    );
    atomRef.current?.position.lerp(dragPos, delta * 12);
  });

  return (
    <group rotation={[0, -Math.PI / 2, 0]} {...props}>
      <group ref={atomRef} scale={scale} position={dragPos}>
        <Float speed={1} rotationIntensity={50} floatIntensity={0}>
          <Line
            worldUnits
            points={points}
            color={cyan}
            // color={"cyan"}
            lineWidth={0.3 * scale}
            toneMapped={tier < 2}
          />
          <Line
            worldUnits
            points={points}
            color={cyan}
            // color={"cyan"}
            lineWidth={0.3 * scale}
            rotation={[0, 0, 1]}
            toneMapped={tier < 2}
          />
          <Line
            worldUnits
            points={points}
            color={cyan}
            // color={"cyan"}
            lineWidth={0.3 * scale}
            rotation={[0, 0, -1]}
            toneMapped={tier < 2}
          />
          <Electron speed={3} scale={scale} />
          <Electron rotation={[0, 0, Math.PI / 3]} speed={4} scale={scale} />
          <Electron rotation={[0, 0, -Math.PI / 3]} speed={3.5} scale={scale} />
          <Sphere
            args={[0.55, 64, 64]}
            {...(bind() as ComponentProps<typeof Sphere>)}
          >
            {tier > 2 ? (
              <meshBasicMaterial
                ref={materialRef}
                color={[3, 0.5, 1]}
                toneMapped={false}
              />
            ) : (
              <meshPhysicalMaterial
                // ref={materialRef}
                color={"cyan"}
                roughness={0.5}
                metalness={0.5}
              />
            )}
          </Sphere>
        </Float>
      </group>
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
  const ref = useRef<Mesh>(null);

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