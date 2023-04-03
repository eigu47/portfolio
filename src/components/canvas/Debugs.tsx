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
import { type Vector3Tuple } from "three";

import { useStore } from "~/utils/store";
import useGetMousePos from "~/utils/useGetMousePos";

export default function Debugs() {
  const camera = useThree((state) => state.camera);
  const selectedObject = useStore((state) => state.selectedObject);
  const transformMode = useStore((state) => state.transformMode);
  const setTransformActive = useStore((state) => state.setTransformActive);
  const [{ debugOn }, set] = useControls(() => ({
    debugOn: false,
    cameraPos: {
      value: camera.position.toArray(),
      onEditEnd: (value: Vector3Tuple) => camera.position.set(...value),
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
        <TransformControls
          object={selectedObject}
          mode={transformMode}
          onMouseDown={() => setTransformActive(true)}
          onMouseUp={() => setTransformActive(false)}
        />
      )}
    </>
  );
}

export function useDebug() {
  const selectedObject = useStore((state) => state.selectedObject);
  const transformMode = useStore((state) => state.transformMode);
  const transformActive = useStore((state) => state.transformActive);
  const setSelectedObject = useStore((state) => state.setSelectedObject);
  const cylceTransformType = useStore((state) => state.cylceTransformType);
  const { debugOn } = useControls({ debugOn: false });
  const [hovered, setHovered] = useState(false);
  useCursor((debugOn && hovered) || transformActive);

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

  return {
    onClick,
    onContextMenu,
    onPointerEnter: debugOn ? onPointerEnter : undefined,
    onPointerOut: debugOn ? onPointerOut : undefined,
  } satisfies JSX.IntrinsicElements["group"];
}

export function ObjectPosition() {
  const transformActive = useStore((state) => state.transformActive);
  const selectedObject = useStore((state) => state.selectedObject);
  const transformMode = useStore((state) => state.transformMode);
  const { clientX, clientY } = useGetMousePos();

  if (!transformActive || !selectedObject) return null;
  return (
    <div
      className="fixed rounded-md bg-[#151520] p-2 text-sm text-slate-100"
      style={{ top: clientY + 24, left: clientX }}
    >
      {transformMode === "translate" &&
        selectedObject.position.toArray().map((pos, i) => (
          <p key={i}>
            {i === 0 ? "x" : i === 1 ? "y" : "z"}: {pos.toFixed(2)}
          </p>
        ))}
      {transformMode === "rotate" &&
        selectedObject.rotation
          .toArray()
          .filter((val): val is number => typeof val === "number")
          .map((rot, i) => (
            <p key={i}>
              {i === 0 ? "x" : i === 1 ? "y" : "z"}:{" "}
              {(rot / Math.PI).toFixed(2)}
            </p>
          ))}
      {transformMode === "scale" &&
        selectedObject.scale.toArray().map((scale, i) => (
          <p key={i}>
            {i === 0 ? "x" : i === 1 ? "y" : "z"}: {scale.toFixed(2)}
          </p>
        ))}
    </div>
  );
}
