import { useState } from "react";

import { Icosahedron, Tube } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { CatmullRomCurve3, Vector3 } from "three";

import { usePage } from "~/components/canvas/Page";
import useViewport from "~/hooks/useViewport";

export default function Cable({
  cableRef,
}: {
  cableRef: React.RefObject<THREE.Mesh>;
}) {
  const { width, height, mobile } = useViewport();
  const { position: page1 } = usePage(1);
  const { position: page2 } = usePage(2);
  const { position: page3 } = usePage(3);

  const fixedPoints = ConvertToPoints(
    mobile
      ? [
          [width * -0.26 - 0.05, height * 0.1 + width * 0.05, -0.05],
          [width * -0.45, 0, -1.5],

          [[width * -0.4, height * 0.5, -1.5], page1],

          [[-0.5, height * 0.5, width * -0.5], page2],
          [[-1, height * -0.5, width * -0.45], page2],

          [[width * -0.5, height * -0.15, 1], page3],

          [[-1.05, -0.5, 0.5], page3],
          [[-1, -0.5, 0.5], page3],
        ]
      : [
          [width * -0.35 + 2.7, height * 0.05 + 0.23, -0.05],
          [width * -0.23, -0.2, -1],
          // over web dev
          [width * -0.55 + 1.1, height * -0.1 + 0.15, -1.9],
          [width * -0.55 + 0.9, height * -0.1 + 0.15, -2.1],

          [[width * -0.2, height * 0.5, -0.5], page1],

          [[width * -0, height * 0.5, width * -0.15 - 1], page2],
          [[width * -0.2, height * -0.15, -0.5], page3],
          [[-1.45, -0.95, 0.5], page3],
          [[-1.35, -0.95, 0.5], page3],
        ]
  );

  return (
    <>
      <LooseCable cableRef={cableRef} />
      <CableSection points={fixedPoints} segments={256} />
    </>
  );
}

const keyboardPos = new Vector3();

function LooseCable({ cableRef }: { cableRef: React.RefObject<THREE.Mesh> }) {
  const { width, height, mobile } = useViewport();
  const [startPoint, setStartPoint] = useState<THREE.Vector3Tuple>([0, 0, 0]);

  const points = ConvertToPoints(
    mobile
      ? [
          startPoint,
          [[width * -0, height * 0.08, -0.2], startPoint],
          [[width * -0.3, height * 0.12, 0.3], startPoint],
          // over "eiguchi"
          [width * -0.26, height * 0.1 + width * 0.05, 0.05],
          [width * -0.26 - 0.05, height * 0.1 + width * 0.05, -0.05],
        ]
      : [
          startPoint,
          [[width * 0.02, height * 0.05, -0.5], startPoint],
          [[width * -0, height * 0.12, -0.5], startPoint],
          [[width * -0.25, height * 0.13, 0.3], startPoint],
          // over "pablo"
          [width * -0.35 + 2.8, height * 0.05 + 0.23, 0.05],
          [width * -0.35 + 2.7, height * 0.05 + 0.23, -0.05],
        ]
  );

  useFrame(() => {
    if (!cableRef.current) return null;

    setStartPoint(cableRef.current.getWorldPosition(keyboardPos).toArray());
  });

  return <CableSection points={points} />;
}

function CableSection({
  points,
  segments = 64,
}: {
  points: Vector3[];
  segments?: number;
}) {
  const { mobile } = useViewport();
  const { debugOn } = useControls({ debugOn: false });

  return (
    <>
      <Tube
        args={[new CatmullRomCurve3(points), segments, mobile ? 0.013 : 0.02]}
        material-color="#020617"
      />
      {debugOn &&
        points.map((p, i) => (
          <Icosahedron
            key={i}
            args={[0.05, 0]}
            position={p}
            material-wireframe={true}
          />
        ))}
    </>
  );
}

type VectorLike = THREE.Vector3 | THREE.Vector3Tuple;
type Point = VectorLike | [VectorLike, VectorLike];

function ToVector3(vector: VectorLike): THREE.Vector3 {
  return vector instanceof Vector3 ? vector : new Vector3(...vector);
}

function ConvertToPoints(points: Point[]): Vector3[] {
  return points.map((p) => {
    if (p.length === 2) return ToVector3(p[0]).add(ToVector3(p[1]));
    return ToVector3(p);
  });
}
