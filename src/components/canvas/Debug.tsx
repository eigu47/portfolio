import { type ComponentProps, useState } from "react";

import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  PivotControls,
  TransformControls,
  Plane,
  useCursor,
  Html,
} from "@react-three/drei";
import { type ThreeEvent, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { Vector3 } from "three";

import { useDebugStore } from "~/utils/debugStore";
import useMousePos from "~/utils/useMousePos";
import useViewport from "~/utils/useViewport";

const cameraPos = new Vector3();
const cameraDir = new Vector3();

export default function Debug() {
  const camera = useThree((state) => state.camera);
  const { selectedObject, transformMode, setTransformActive } = useDebugStore();
  const [{ debugOn, orbitControls }, set] = useControls(() => ({
    debugOn: false,
    orbitControls: {
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
  camera
    .getWorldPosition(cameraPos)
    .add(camera.getWorldDirection(cameraDir).multiplyScalar(5));

  if (!debugOn) {
    camera.position.set(0, 0, 5);

    return <Perf position="top-left" className="top-20" minimal />;
  }

  return (
    <>
      <Perf position="top-left" className="m-3" />
      <OrbitControls
        makeDefault={orbitControls}
        enableZoom={orbitControls}
        enableRotate={orbitControls}
        enablePan={orbitControls}
        onEnd={() => set({ cameraPos: camera.position.toArray() })}
        target={cameraPos}
      />
      <group position={cameraPos}>
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
      <TransformControlsInfo />
    </>
  );
}

function TransformControlsInfo() {
  const { selectedObject, transformActive, transformMode } = useDebugStore();
  const { clientX, clientY } = useMousePos();

  if (!transformActive || !selectedObject) return null;
  return (
    <Html calculatePosition={() => [clientX, clientY + 24]}>
      <div className="whitespace-nowrap rounded-md bg-[#151520] p-2 text-sm text-slate-100">
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
    </Html>
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
