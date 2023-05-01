import { useMemo, useState } from "react";

import { Tube } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, MeshStandardMaterial, Vector3 } from "three";

import { usePage } from "~/components/canvas/Page";
import useViewport from "~/hooks/useViewport";

const keyboardPos = new Vector3();

export default function Cable({
  cableRef,
}: {
  cableRef: React.RefObject<THREE.Mesh>;
}) {
  const { width, height } = useViewport();
  const { position: page1 } = usePage(1);
  const { position: page2 } = usePage(2);
  const { position: page3 } = usePage(3);
  const [startPoint, setStartPoint] = useState<THREE.Vector3Tuple>([0, 0, 0]);

  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: "#020617",
      flatShading: true,
    });
  }, []);

  const cableMid = useMemo(() => {
    return [
      new Vector3(-width * 0.3, -height * 0.6, -1),
      new Vector3(-width * 0.25, -height * 0.8, -1),
      page1.clone().add(new Vector3(-width * 0.3, 0, 1)),
      page2,
      page3.clone().add(new Vector3(-width * 0.3, height * 0.4, 1)),
    ];
  }, [page1, page2, page3, width, height]);

  useFrame(() => {
    if (!cableRef.current) return null;

    setStartPoint(cableRef.current.getWorldPosition(keyboardPos).toArray());
  });

  return (
    <>
      <CablePart
        points={[
          [0, 0.1, -1],
          [-0.2, 0.2, -2],
          [-0.4, 0.3, -2.5],
          [-0.5, 0.2, -2.5],
          [-0.6, 0.2, -2.5],
          [-0.7, -0.2, -2.5],
        ]}
        attach={[new Vector3(...startPoint), cableMid[0] ?? new Vector3()]}
        material={material}
      />
      <CablePart points={cableMid} material={material} />
    </>
  );
}

function CablePart({
  points,
  material,
  attach, // head and tail of the cable
}: {
  points: (THREE.Vector3 | THREE.Vector3Tuple)[];
  material: THREE.MeshStandardMaterial;
  attach?: [THREE.Vector3, THREE.Vector3];
}) {
  const { width, height } = useViewport();
  // points dont change so memoize separately
  const vectorPoints = useMemo(() => {
    return points.map((p) => {
      if (p instanceof Vector3) return p;
      return new Vector3(width * p[0], height * p[1], p[2]);
    });
  }, [points, width, height]);
  // this creates the least amount of vector3 instances
  const curvePoints = useMemo(() => {
    if (!attach) return vectorPoints;
    return [
      attach[0],
      ...vectorPoints.map((p) => p.clone().add(attach[0])),
      attach[1],
    ];
  }, [attach, vectorPoints]);

  const curve = new CatmullRomCurve3(curvePoints, false, "chordal", 0.5);

  return <Tube args={[curve, 64, 0.025, 8, false]} material={material} />;
}
