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

  const cableStart = useMemo(() => {
    const start = new Vector3(...startPoint);

    return [
      start,
      start.clone().add(new Vector3(0, height * 0.1, -1)),
      start.clone().add(new Vector3(-width * 0.2, height * 0.2, -2)),
      start.clone().add(new Vector3(-width * 0.4, height * 0.3, -2.5)),
      new Vector3(-width * 0.1, -height * 0.3, -1).sub(start),
      new Vector3(-width * 0.1, -height * 0.4, -1).sub(start),
      cableMid[0] ?? new Vector3(0, 0, 0),
    ];
  }, [startPoint, cableMid, width, height]);

  useFrame(() => {
    if (!cableRef.current) return null;

    setStartPoint(cableRef.current.getWorldPosition(keyboardPos).toArray());
  });

  return (
    <>
      <CablePart points={cableStart} material={material} />
      <CablePart points={cableMid} material={material} />
    </>
  );
}

function CablePart({
  points,
  material,
}: {
  points: THREE.Vector3[];
  material: THREE.MeshStandardMaterial;
}) {
  const curve = useMemo(() => {
    return new CatmullRomCurve3(points, false, "chordal", 0.5);
  }, [points]);

  return <Tube args={[curve, 64, 0.025, 8, false]} material={material} />;
}
