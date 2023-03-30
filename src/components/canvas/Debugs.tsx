import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
} from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Debugs() {
  const { debugOn } = useControls("Debug", { debugOn: false });

  return (
    <>
      {debugOn && (
        <>
          <OrbitControls makeDefault />
          <Perf position="top-left" className="top-10" showGraph={false} />
          <GizmoHelper>
            <GizmoViewport />
          </GizmoHelper>
          <PivotControls annotations />
        </>
      )}
    </>
  );
}
