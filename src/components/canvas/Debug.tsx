import { type ComponentProps, useState } from "react";

import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
  Plane,
  TransformControls,
  useCursor,
} from "@react-three/drei";
import { type ThreeEvent, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Vector3 } from "three";

import { useDebugStore } from "~/utils/debugStore";
import useMousePos from "~/utils/useMousePos";
import useViewport from "~/utils/useViewport";

const cameraTarget = new Vector3();

export default function Debug() {
  const camera = useThree((state) => state.camera);
  const { selectedObject, transformMode, setTransformActive } = useDebugStore();
  const [{ debugOn, enableZoom }, set] = useControls(() => ({
    debugOn: false,
    enableZoom: {
      value: true,
      render: (get) => get("debugOn") as boolean,
    },
    cameraPos: {
      value: camera.position.toArray(),
      onEditEnd: (value: THREE.Vector3Tuple) => camera.position.set(...value),
      step: 0.1,
      render: (get) => get("debugOn") as boolean,
    },
  }));
  // Adds 5 units in the direction the camera is facing
  cameraTarget.copy(
    camera
      .getWorldPosition(cameraTarget.clone())
      .add(camera.getWorldDirection(cameraTarget.clone()).multiplyScalar(5))
  );

  if (!debugOn) {
    camera.position.set(0, 0, 5);
    return null;
  }

  return (
    <>
      <Perf position="top-left" className={debugOn ? "m-3" : "hidden"} />
      <OrbitControls
        makeDefault
        enableZoom={enableZoom}
        onEnd={() => set({ cameraPos: camera.position.toArray() })}
        target={cameraTarget}
      />
      <group position={cameraTarget}>
        <PivotControls annotations />
      </group>
      <GizmoHelper>
        <GizmoViewport />
      </GizmoHelper>
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

export function ObjectPosition() {
  const { selectedObject, transformActive, transformMode } = useDebugStore();
  const { clientX, clientY } = useMousePos();

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

export function FullViewport({ ...props }: ComponentProps<typeof Plane>) {
  const { width, height } = useViewport();

  return <Plane scale={[width, height, 0]} {...props} />;
}

export function useDebug() {
  const {
    selectedObject,
    transformActive,
    transformMode,
    setSelectedObject,
    cycleTransformMode,
  } = useDebugStore();
  const { debugOn } = useControls({ debugOn: false });
  const [hovered, setHovered] = useState(false);
  useCursor((debugOn && hovered) || transformActive);

  function onClick(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    setSelectedObject(e.eventObject);
    if (transformMode === "disable") cycleTransformMode();
  }

  function onContextMenu(e: ThreeEvent<MouseEvent>) {
    e.stopPropagation();
    if (e.eventObject === selectedObject) cycleTransformMode();
  }

  if (!debugOn) return {};
  return {
    onClick,
    onContextMenu,
    onPointerEnter: () => setHovered(true),
    onPointerOut: () => setHovered(false),
  } satisfies JSX.IntrinsicElements["group"];
}
