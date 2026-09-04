import { Stars } from "@react-three/drei";

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
    </>
  );
}
