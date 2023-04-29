import { useState } from "react";

import { Vector3 } from "three";

import useMousePos from "~/hooks/useMousePos";
import useScrollPos from "~/hooks/useScrollPos";
import { PAGES } from "~/utils/config";
import { useDebugStore } from "~/utils/debugStore";
import { type ValidIndex } from "~/utils/types";

export default function DebugOverlay() {
  return (
    <>
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
    <div
      className="fixed whitespace-nowrap rounded-md bg-[#151520] p-2 text-sm text-slate-100"
      style={{ left: x, top: y + 24 }}
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

const cameraPos = new Vector3();

function CameraPosition() {
  const camera = useDebugStore((state) => state.camera);
  const { scrollY, scrollPos } = useScrollPos();
  const [href, setHref] = useState<ValidIndex<typeof PAGES>>(0);

  camera?.getWorldPosition(cameraPos);

  return (
    <div className="fixed bottom-0 left-0 text-black">
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
  );
}
