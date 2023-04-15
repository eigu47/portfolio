import { Text } from "@react-three/drei";

import { useDebug } from "~/components/canvas/Debug";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function Hero() {
  const { width, height, mobile } = useViewport();
  const { ...debug } = useDebug();

  return (
    <>
      <Text
        scale={mobile ? 0.5 : 0.7}
        position={[-width * 0.7, height * 0.3, -3]}
        rotation={[0, Math.PI * 0.1, 0]}
        anchorX="left"
        color={COLORS.slate300}
        font="/fonts/Calibre-Light.ttf"
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        scale={mobile ? width * 0.15 : 0.7}
        position={
          mobile ? [0, height * 0.05, 0] : [-width * 0.35, height * 0.05, 0]
        }
        anchorX={mobile ? "center" : "left"}
        color={COLORS.slate300}
        font="/fonts/Calibre-Medium.ttf"
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        position={
          mobile ? [0, -height * 0.1, -3] : [-width * 0.55, -height * 0.1, -3]
        }
        anchorX={mobile ? "center" : "left"}
        scale={0.35}
        color={COLORS.slate400}
        font="/fonts/Calibre-Light.ttf"
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
