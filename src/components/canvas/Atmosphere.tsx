import { Environment, Lightformer, Stars } from "@react-three/drei";

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
      <Environment resolution={64}>
        <Lightformer
          color={COLORS.emerald400}
          form="rect"
          intensity={2}
          position={[0, 3, -4]}
          scale={[4, 2, 1]}
        />
        <Lightformer
          color="#596a99"
          form="rect"
          intensity={1.4}
          position={[-4, 2, 0]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[3, 1.5, 1]}
        />
      </Environment>
    </>
  );
}
