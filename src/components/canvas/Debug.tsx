import {
  type ComponentProps,
  type ComponentRef,
  lazy,
  Suspense,
  useEffect,
  useState,
} from "react";

import {
  GizmoHelper,
  GizmoViewport,
  Html,
  OrbitControls,
  PivotControls,
  Plane,
  TransformControls,
  useCursor,
} from "@react-three/drei";
import {
  type ThreeElements,
  type ThreeEvent,
  useThree,
} from "@react-three/fiber";
import { Vector3 } from "three";

import useViewport from "~/hooks/useViewport";
import { useDebugStore } from "~/utils/debugStore";

const cameraPos = new Vector3();
const cameraDir = new Vector3();
const perfEdgeOffset = {
  top: "calc(2dvh + 0.75rem)",
  left: "calc(2vw + 0.75rem)",
};
const Perf = lazy(() =>
  import("r3f-perf").then(({ Perf: DebugPerf }) => ({ default: DebugPerf })),
);

export default function Debug() {
  const camera = useThree((state) => state.camera);
  const {
    debugOn,
    orbitControls,
    selectedObject,
    transformMode,
    setTransformActive,
    setCamera,
  } = useDebugStore();
  // Adds 5 units in the direction the camera is facing
  camera
    .getWorldPosition(cameraPos)
    .add(camera.getWorldDirection(cameraDir).multiplyScalar(5));

  useEffect(() => {
    setCamera(camera);
  }, [setCamera, camera]);

  useEffect(() => {
    document.documentElement.classList.toggle("snap-none", debugOn);
  }, [debugOn]);

  if (!debugOn) {
    camera.position.set(0, 0, 5);

    return (
      <Suspense fallback={null}>
        <Perf position="top-left" minimal />
      </Suspense>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <Perf position="top-left" style={{ top: "1em", left: "1em" }} />
      </Suspense>
      <OrbitControls
        makeDefault={orbitControls}
        enableZoom={orbitControls}
        enableRotate={orbitControls}
        enablePan={orbitControls}
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

export function FullViewport(props: ComponentProps<typeof Plane>) {
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
  const { debugOn } = useDebugStore();
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
  } satisfies ThreeElements["group"];
}
