import { Text } from "@react-three/drei";
import { type Vector3Tuple } from "three";

import { useDebug } from "~/components/canvas/Debug";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function Hero() {
  const { width, height, device } = useViewport();
  const { ...debug } = useDebug();

  const display = [
    {
      mobile: {
        scale: 0.5,
        position: [-width * 0.7, height * 0.3, -3],
        rotation: [0, Math.PI * 0.1, 0] satisfies Vector3Tuple,
        anchorX: "left",
      },
      desktop: {
        scale: 0.7,
        position: [-width * 0.7, height * 0.3, -3],
        rotation: [0, Math.PI * 0.1, 0] satisfies Vector3Tuple,
        anchorX: "left",
      },
    },
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
    {
      mobile: {
        scale: 0.35,
        position: [0, -height * 0.1, -3],
        anchorX: "center",
      },
      desktop: {
        scale: 0.35,
        position: [-width * 0.55, -height * 0.1, -3],
        anchorX: "left",
      },
    },
  ] as const;

  return (
    <>
      <Text
        scale={display[0][device].scale}
        position={display[0][device].position}
        rotation={display[0][device].rotation}
        anchorX={display[0][device].anchorX}
        color={COLORS.slate300}
        {...debug}
      >
        Hello, I am
      </Text>
      <Text
        scale={display[1][device].scale}
        position={display[1][device].position}
        anchorX={display[1][device].anchorX}
        color={COLORS.slate300}
        {...debug}
      >
        Eiguchi Pablo
      </Text>
      <Text
        scale={display[2][device].scale}
        position={display[2][device].position}
        anchorX={display[2][device].anchorX}
        color={COLORS.slate300}
        {...debug}
      >
        - Web Developer -
      </Text>
    </>
  );
}
