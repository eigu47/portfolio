import { type RefObject, useRef } from "react";

import { QuadraticBezierLine } from "@react-three/drei";
import { useFrame, type Object3DNode } from "@react-three/fiber";
import { type Mesh, Vector3 } from "three";
import { type Line2 } from "three-stdlib";

import { useBlock } from "~/utils/useBlock";

type Line2Props = Object3DNode<Line2, typeof Line2> & {
  setPoints: (
    start: Vector3 | [number, number, number],
    end: Vector3 | [number, number, number],
    mid: Vector3 | [number, number, number]
  ) => void;
};

export default function Cable({ cableRef }: { cableRef: RefObject<Mesh> }) {
  const { width, height } = useBlock();
  const ref = useRef<Line2Props>(null);

  const start = new Vector3(-width * 0.5, -height, 0);
  const end = new Vector3(-width * 0.5, -height * 1.5, -height);
  const mid = new Vector3(-width * 0.5, -height * 1.5, -height);
  const lerpTo = new Vector3(width * 0.5, height * 0.3, -5);

  useFrame((_, delta) => {
    if (!cableRef.current || !ref.current) return null;

    cableRef.current.getWorldPosition(start);
    mid.lerp(lerpTo, delta * 1);

    ref.current.setPoints(start, end, mid);
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
