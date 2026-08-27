import type * as THREE from "three";
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
  selectedObject: THREE.Object3D | null;
  debugOn: boolean;
  orbitControls: boolean;
  transformActive: boolean;
  transformMode: (typeof TRANSFORM_MODES)[number];
  camera: THREE.Camera | null;

  setSelectedObject: (object: THREE.Object3D | null) => void;
  setDebugOn: (active: boolean) => void;
  setOrbitControls: (active: boolean) => void;
  setTransformMode: (mode: (typeof TRANSFORM_MODES)[number]) => void;
  setTransformActive: (active: boolean) => void;
  cycleTransformMode: () => void;
  setCamera: (camera: THREE.Camera) => void;
}>((set) => ({
  selectedObject: null,
  debugOn: new URLSearchParams(window.location.search).has("debug"),
  orbitControls: false,
  transformActive: false,
  transformMode: TRANSFORM_MODES[modeId],
  camera: null,

  setSelectedObject: (selectedObject) => set({ selectedObject }),
  setDebugOn: (debugOn) => set({ debugOn }),
  setOrbitControls: (orbitControls) => set({ orbitControls }),
  setTransformMode: (transformMode) => set({ transformMode }),
  setTransformActive: (transformActive) => set({ transformActive }),
  cycleTransformMode: () => {
    modeId = ((modeId + 1) % TRANSFORM_MODES.length) as typeof modeId;
    set({ transformMode: TRANSFORM_MODES[modeId] });
  },
  setCamera: (camera) => set({ camera }),
}));
