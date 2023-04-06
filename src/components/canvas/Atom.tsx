import { type ComponentProps, useRef, useState } from "react";

import { Float, Line, Sphere, Trail, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Color, EllipseCurve, Vector3, type Mesh } from "three";

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

const cyan = new Color("cyan");
const tomato = new Color("tomato");
const dragPos = new Vector3();

export default function Atom({
  scale = 0.15,
  ...props
}: { scale?: number } & JSX.IntrinsicElements["group"]) {
  const [hover, setHover] = useState(false);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const atomRef = useRef<THREE.Group>(null);
  const { width, height, size } = useViewport();

  useCursor(hover);

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ offset }) => {
      dragPos.set(
        width * (offset[0] / size.width),
        height * -(offset[1] / size.height),
        0
      );
    },
  });

  useFrame((_, delta) => {
    materialRef.current?.color.lerp(hover ? tomato : cyan, delta * 12);
    atomRef.current?.position.lerp(dragPos, delta * 12);
  });

  return (
    <group {...props} ref={atomRef} scale={scale}>
      <Float speed={1} rotationIntensity={50} floatIntensity={5}>
        <Line worldUnits points={points} color={cyan} lineWidth={0.3 * scale} />
        <Line
          worldUnits
          points={points}
          color={cyan}
          lineWidth={0.3 * scale}
          rotation={[0, 0, 1]}
        />
        <Line
          worldUnits
          points={points}
          color={cyan}
          lineWidth={0.3 * scale}
          rotation={[0, 0, -1]}
        />
        <Electron speed={3} scale={scale} />
        <Electron rotation={[0, 0, Math.PI / 3]} speed={4} scale={scale} />
        <Electron rotation={[0, 0, -Math.PI / 3]} speed={3.5} scale={scale} />
        <Sphere
          args={[0.55, 64, 64]}
          {...(bind() as ComponentProps<typeof Sphere>)}
        >
          <meshPhysicalMaterial ref={materialRef} roughness={0} color={cyan} />
        </Sphere>
      </Float>
    </group>
  );
}

type ElectronProps = {
  radius?: number;
  speed?: number;
  scale: number;
} & JSX.IntrinsicElements["group"];

function Electron({ radius = 3, speed = 4, scale, ...props }: ElectronProps) {
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
          <meshBasicMaterial color={[10, 1, 10]} />
        </mesh>
      </Trail>
    </group>
  );
}
