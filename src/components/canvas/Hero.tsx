import { Text } from "@react-three/drei";

import { calibre300, calibre400, calibre500 } from "~/assets/fonts";
import { useDebug } from "~/components/canvas/Debug";
import useViewport from "~/hooks/useViewport";
import { COLORS } from "~/utils/config";

export default function Hero() {
  const { width, height, mobile } = useViewport();
  const debug = useDebug();

  return (
    <>
      <Text
        scale={mobile ? 0.5 : 0.7}
        position={
          mobile
            ? [-width * 0.7, height * 0.35, -3]
            : [-width * 0.7, height * 0.3, -3]
        }
        rotation={[0, Math.PI * 0.1, 0]}
        anchorX="left"
        color={COLORS.slate300}
        font={calibre400}
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        scale={mobile ? width * 0.16 : 0.7}
        position={
          mobile ? [0, height * 0.1, 0] : [-width * 0.35, height * 0.05, 0]
        }
        anchorX={mobile ? "center" : "left"}
        color={COLORS.slate300}
        font={calibre500}
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        position={
          mobile ? [0, -height * 0, -3] : [-width * 0.55, -height * 0.1, -2]
        }
        anchorX={mobile ? "center" : "left"}
        scale={0.35}
        color={COLORS.slate400}
        font={calibre300}
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
