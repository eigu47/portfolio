import {
  type ComponentProps,
  useState,
  type ComponentRef,
  useEffect,
} from "react";

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
import useViewport from "~/utils/useViewport";

const cameraPos = new Vector3();
const cameraDir = new Vector3();

export default function Debug() {
  const camera = useThree((state) => state.camera);
  const { selectedObject, transformMode, setTransformActive, setCamera } =
    useDebugStore();
  const [{ debugOn, orbitControls }, set] = useControls(() => ({
    debugOn: false,
    orbitControls: { value: false, render: (get) => get("debugOn") as boolean },
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

  useEffect(() => {
    setCamera(camera);
  }, [setCamera, camera]);

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
    </>
  );
}

export function FullViewport({ ...props }: ComponentProps<typeof Plane>) {
  const { width, height } = useViewport();
  const [ref, setRef] = useState<ComponentRef<typeof Plane> | null>(null);

  return (
    <>
      <Plane
        ref={setRef}
        scale={[width, height, 0]}
        material-color="gray"
        {...props}
      />

      <Html transform occlude="blending" position={[0, 0, 0.01]}>
        <p className="text-center text-xs">
          {height.toFixed(2)} x {width.toFixed(2)}
          <br />
          {ref
            ?.getWorldPosition(new Vector3())
            .toArray()
            .map((pos) => pos.toFixed(2))
            .join(", ")}
        </p>
      </Html>
    </>
  );
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
