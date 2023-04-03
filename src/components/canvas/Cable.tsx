import { useRef } from "react";

import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame, type Object3DNode, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { type Line2 } from "three-stdlib";

import useViewport from "~/utils/useViewport";

type Line2Props = Object3DNode<Line2, typeof Line2> & {
  setPoints: (
    start: Vector3 | [number, number, number],
    end: Vector3 | [number, number, number],
    mid: Vector3 | [number, number, number]
  ) => void;
};

const start = new Vector3();
const end = new Vector3();
const mid = new Vector3();

export default function Cable() {
  const { width, height } = useViewport();
  const ref = useRef<Line2Props>(null);

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
