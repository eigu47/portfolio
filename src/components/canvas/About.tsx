import { Text } from "@react-three/drei";

import { calibre400 } from "~/assets/fonts";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function About() {
  const { width, height, mobile } = useViewport();

  return (
    <>
      <Text
        position={
          mobile ? [0, height * 0.05, 0] : [width * 0.1, height * 0.12, 0]
        }
        maxWidth={mobile ? width * 0.9 : width * 0.6}
        fontSize={mobile ? 0.2 : 0.3}
        textAlign="center"
        lineHeight={1.3}
        letterSpacing={0.03}
        color={COLORS.slate300}
        font={calibre400}
        depthOffset={-2}
      >
        I&apos;m a self-taught frontend developer with a primary focus on React
        and TypeScript.{"\n"}I love to learn new technologies to improve my
        skills and stay current with industry trends.
      </Text>
    </>
  );
}
