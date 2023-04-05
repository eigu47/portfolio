import { useRef, useState } from "react";

import { Float, Line, Sphere, Trail, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, EllipseCurve, Vector3, type Mesh } from "three";

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

const atomColor = new Color("#1fb2f5");
const tomato = new Color("tomato");

export default function Atom({
  scale = 0.2,
  ...props
}: { scale?: number } & JSX.IntrinsicElements["group"]) {
  const [hover, setHover] = useState(false);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const sphereRef = useRef<THREE.Group>(null);

  // useCursor(hover);

  useFrame((_, delta) => {
    materialRef.current?.color.lerp(hover ? tomato : atomColor, delta * 8);
  });

  return (
    <group {...props} ref={sphereRef} scale={scale}>
      <Float speed={2} rotationIntensity={20} floatIntensity={1}>
        <Line
          worldUnits
          points={points}
          color={atomColor}
          lineWidth={0.3 * scale}
        />
        <Line
          worldUnits
          points={points}
          color={atomColor}
          lineWidth={0.3 * scale}
          rotation={[0, 0, 1]}
        />
        <Line
          worldUnits
          points={points}
          color={atomColor}
          lineWidth={0.3 * scale}
          rotation={[0, 0, -1]}
        />
        <Electron speed={3} />
        <Electron rotation={[0, 0, Math.PI / 3]} speed={4} />
        <Electron rotation={[0, 0, -Math.PI / 3]} speed={3.5} />
        <Sphere
          args={[0.55, 64, 64]}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          <meshPhysicalMaterial
            ref={materialRef}
            roughness={0.5}
            color={atomColor}
          />
        </Sphere>
      </Float>
    </group>
  );
}

type ElectronProps = {
  radius?: number;
  speed?: number;
  scale?: number;
} & JSX.IntrinsicElements["group"];

function Electron({
  radius = 2.75,
  speed = 4,
  scale = 0.2,
  ...props
}: ElectronProps) {
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
        length={6 * scale}
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
