import { type ComponentProps, useState, type ComponentRef } from "react";

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
import { PAGES } from "~/utils/store";
import { type ValidIndex } from "~/utils/types";
import useMousePos from "~/utils/useMousePos";
import useScrollPos from "~/utils/useScrollPos";
import useViewport from "~/utils/useViewport";

const cameraPos = new Vector3();
const cameraDir = new Vector3();

export default function Debug() {
  const camera = useThree((state) => state.camera);
  const { selectedObject, transformMode, setTransformActive } = useDebugStore();
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
      <CameraPosition />
    </>
  );
}

function TransformControlsInfo() {
  const { selectedObject, transformActive, transformMode } = useDebugStore();
  const {
    client: { x, y },
  } = useMousePos();

  if (!transformActive || !selectedObject) return null;
  return (
    <Html calculatePosition={() => [x, y + 24]}>
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

function CameraPosition() {
  const cameraPos = useThree((state) =>
    state.camera.getWorldPosition(new Vector3())
  );
  const { scrollY, scrollPos } = useScrollPos();
  const [href, setHref] = useState<ValidIndex<typeof PAGES>>(0);

  return (
    <Html prepend calculatePosition={(_el, _cam, { height }) => [0, height]}>
      <div className="absolute bottom-full text-black">
        <a
          href={`#${PAGES[href].id}`}
          className="bg-slate-100 text-2xl"
          onClick={() =>
            setHref(((href + 1) % PAGES.length) as ValidIndex<typeof PAGES>)
          }
        >
          ⏭
        </a>
        <p className="whitespace-nowrap bg-slate-100 px-1 text-center">
          {cameraPos
            .toArray()
            .map((pos) => pos.toFixed(2))
            .join(", ")}
          <br />
          y: {scrollY.toFixed(0)}, pos: {scrollPos.toFixed(2)}
        </p>
      </div>
    </Html>
  );
}

export function FullViewport({ ...props }: ComponentProps<typeof Plane>) {
  const { width, height } = useViewport();
  const [ref, setRef] = useState<ComponentRef<typeof Plane> | null>(null);

  return (
    <>
      <Plane scale={[width, height, 0]} {...props} ref={setRef} />
      <Html center transform>
        <p className="text-center text-xs text-black">
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
