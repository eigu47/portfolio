import { type ComponentPropsWithRef } from "react";

import { Text } from "@react-three/drei";

import { useDebug } from "~/components/canvas/Debug";
import { COLORS } from "~/utils/store";
import { type Layout } from "~/utils/types";
import useViewport from "~/utils/useViewport";

export default function Hero() {
  const { width, height, device } = useViewport();
  const { ...debug } = useDebug();

  const layout: Layout<ComponentPropsWithRef<typeof Text>>[] = [
    // Hello, I am
    {
      mobile: { scale: 0.5 },
      desktop: { scale: 0.7 },
    },
    // Eiguchi Pablo
    {
      mobile: {
        scale: width * 0.15,
        position: [0, height * 0.05, 0],
        anchorX: "center",
      },
      desktop: {
        scale: 0.7,
        position: [-width * 0.35, height * 0.05, 0],
        anchorX: "left",
      },
    },
    // - Web Developer -
    {
      mobile: {
        position: [0, -height * 0.1, -3],
        anchorX: "center",
      },
      desktop: {
        position: [-width * 0.55, -height * 0.1, -3],
        anchorX: "left",
      },
    },
  ];

  return (
    <>
      <Text
        position={[-width * 0.7, height * 0.3, -3]}
        rotation={[0, Math.PI * 0.1, 0]}
        anchorX="left"
        color={COLORS.slate300}
        font="/fonts/Calibre-Light.ttf"
        {...layout[0]?.[device]}
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        color={COLORS.slate300}
        font="/fonts/Calibre-Medium.ttf"
        {...layout[1]?.[device]}
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        scale={0.35}
        color={COLORS.slate400}
        font="/fonts/Calibre-Light.ttf"
        {...layout[2]?.[device]}
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
