import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

type V3 = [number, number, number];

export default function Debugs() {
  const { camera } = useThree();

  const [{ debugOn }, set] = useControls(() => ({
    debugOn: false,
    cameraPos: {
      value: [0, 0, 5],
      onChange: (value: V3) => camera.position.set(...value),
      step: 0.1,
      render: (get) => get("debugOn") as boolean,
    },
  }));

  function handleUpdateLeva() {
    set({ cameraPos: camera.position.toArray() });
  }

  if (!debugOn) return null;

  return (
    <>
      <OrbitControls makeDefault onEnd={handleUpdateLeva} />
      <Perf position="top-left" className="top-10" />
      <GizmoHelper>
        <GizmoViewport />
      </GizmoHelper>
      <PivotControls annotations />
    </>
  );
}
