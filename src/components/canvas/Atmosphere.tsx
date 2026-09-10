import { Stars } from "@react-three/drei";

import { COLORS } from "~/utils/config";

export default function Atmosphere() {
  return (
    <>
      <fogExp2 attach="fog" args={["#0a0a0e", 0.026]} />
      <Stars
        fade
        factor={1.4}
        radius={28}
        depth={18}
        count={350}
        saturation={0}
        speed={0.08}
      />
      <mesh
        position={[0, -1.7, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[9, 64]} />
        <meshStandardMaterial
          color="#101013"
          emissive={COLORS.emeraldDeep}
          emissiveIntensity={0.08}
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>
    </>
  );
}
