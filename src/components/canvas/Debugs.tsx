import { useState } from "react";

import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
  TransformControls,
  useCursor,
} from "@react-three/drei";
import { type ThreeEvent, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import { useStore } from "~/utils/store";

export default function Debugs() {
  const { camera } = useThree();
  const selectedObject = useStore((state) => state.selectedObject);
  const transformMode = useStore((state) => state.transformMode);
  const [{ debugOn }, set] = useControls(() => ({
    debugOn: false,
    cameraPos: {
      value: [0, 0, 5],
      onChange: (value: [number, number, number]) =>
        camera.position.set(...value),
      step: 0.1,
      render: (get) => get("debugOn") as boolean,
    },
  }));

  if (!debugOn) return null;

  return (
    <>
      <OrbitControls
        makeDefault
        onEnd={() => set({ cameraPos: camera.position.toArray() })}
      />
      <Perf position="top-left" className="top-10" />
      <GizmoHelper>
        <GizmoViewport />
      </GizmoHelper>
      <PivotControls annotations />
      {selectedObject && transformMode !== "disable" && (
        <TransformControls object={selectedObject} mode={transformMode} />
      )}
    </>
  );
}

export function useDebug() {
  const selectedObject = useStore((state) => state.selectedObject);
  const transformMode = useStore((state) => state.transformMode);
  const setSelectedObject = useStore((state) => state.setSelectedObject);
  const cylceTransformType = useStore((state) => state.cylceTransformType);
  const { debugOn } = useControls({ debugOn: false });
  const [hovered, setHovered] = useState(false);
  useCursor(debugOn && hovered);

  function onClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (debugOn) {
      setSelectedObject(e.eventObject);
      if (transformMode === "disable") cylceTransformType();
    }
  }

  function onContextMenu(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (debugOn && e.eventObject === selectedObject) cylceTransformType();
  }

  function onPointerEnter() {
    setHovered(true);
  }

  function onPointerOut() {
    setHovered(false);
  }

  return [
    { onClick, onContextMenu },
    debugOn ? { onPointerEnter, onPointerOut } : {},
  ] satisfies [JSX.IntrinsicElements["group"], JSX.IntrinsicElements["group"]];
}
