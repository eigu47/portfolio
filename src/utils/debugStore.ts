import { create } from "zustand";

import { type ValidIndex } from "~/utils/types";

export const TRANSFORM_MODES = [
  "translate",
  "rotate",
  "scale",
  "disable",
] as const;
let modeId: ValidIndex<typeof TRANSFORM_MODES> = 0;

export const useDebugStore = create<{
  selectedObject: THREE.Object3D<THREE.Event> | null;
  transformActive: boolean;
  transformMode: (typeof TRANSFORM_MODES)[number];
  camera: THREE.Camera | null;

  setSelectedObject: (object: THREE.Object3D<THREE.Event>) => void;
  setTransformActive: (active: boolean) => void;
  cycleTransformMode: () => void;
  setCamera: (camera: THREE.Camera) => void;
}>((set) => ({
  selectedObject: null,
  transformActive: false,
  transformMode: TRANSFORM_MODES[modeId],
  camera: null,

  setSelectedObject: (selectedObject) => set({ selectedObject }),
  setTransformActive: (transformActive) => set({ transformActive }),
  cycleTransformMode: () => {
    modeId = ((modeId + 1) % TRANSFORM_MODES.length) as typeof modeId;
    set({ transformMode: TRANSFORM_MODES[modeId] });
  },
  setCamera: (camera) => set({ camera }),
}));
