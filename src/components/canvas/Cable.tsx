import { type ComponentRef, useRef } from "react";

import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import useViewport from "~/utils/useViewport";

const start = new Vector3();
const end = new Vector3();
const mid = new Vector3();

export default function Cable() {
  const { width, height } = useViewport();
  const ref = useRef<ComponentRef<typeof QuadraticBezierLine>>(null);

  const { scene } = useThree();
  const cable = scene.getObjectByName("cable");

  end.set(-width * 0.8, -height * 0.5, 0);

  useFrame(() => {
    if (!ref.current || !cable) return null;

    ref.current.setPoints(cable.position, end, mid);
  });

  return (
    <QuadraticBezierLine
      ref={ref}
      start={start}
      end={end}
      lineWidth={3}
      color="black"
    />
  );
}
