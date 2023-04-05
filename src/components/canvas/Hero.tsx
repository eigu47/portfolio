import { Text } from "@react-three/drei";

import { useDebug } from "~/components/canvas/Debug";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function Hero() {
  const { width, height, size } = useViewport();
  const { ...debug } = useDebug();

  return (
    <>
      <Text
        scale={size.sm ? 0.7 : 0.5}
        anchorX="left"
        position={[-width * 0.7, height * 0.3, -3]}
        rotation={[0, Math.PI * 0.1, 0]}
        color={COLORS.slate300}
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        scale={size.sm ? 0.7 : width * 0.15}
        anchorX={size.sm ? "left" : "center"}
        position={[size.sm ? -width * 0.35 : 0, height * 0.05, 0]}
        color={COLORS.slate300}
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        scale={0.35}
        anchorX={size.sm ? "left" : "center"}
        position={[size.sm ? -width * 0.55 : 0, -height * 0.1, -3]}
        color={COLORS.slate300}
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
