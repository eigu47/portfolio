import { Text } from "@react-three/drei";

import { useDebug } from "~/components/canvas/Debugs";
import { COLORS } from "~/utils/constants";
import { useBlock } from "~/utils/useBlock";

export default function Hero() {
  const { width, height, mobile } = useBlock();
  const { ...debug } = useDebug();

  return (
    <>
      <Text
        scale={mobile ? 0.6 : 0.8}
        anchorX="left"
        position={[-width * 0.7, height * 0.4, -3]}
        rotation={[0, Math.PI * 0.1, 0]}
        color={COLORS.slate300}
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        scale={mobile ? width * 0.12 : 0.8}
        anchorX={mobile ? "center" : "left"}
        position={[mobile ? 0 : -width * 0.35, height * 0.1, 0]}
        color={COLORS.slate300}
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        scale={0.35}
        anchorX="left"
        position={[-width * 0.45, 0, -1]}
        color={COLORS.slate300}
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
