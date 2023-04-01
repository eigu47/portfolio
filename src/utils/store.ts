import type { Event, Object3D } from "three";
import { create } from "zustand";

import { type LengthToUnion } from "~/utils/types";

export const TRANSFORM_MODES = [
  "translate",
  "rotate",
  "scale",
  "disable",
] as const;
let modeId: LengthToUnion<typeof TRANSFORM_MODES> = 0;

type transformMode = (typeof TRANSFORM_MODES)[number];

type Store = {
  selectedObject: Object3D<Event> | null;
  transformMode: transformMode;
  transformActive: boolean;

  setSelectedObject: (object: Object3D<Event>) => void;
  cylceTransformType: () => void;
  setTransformActive: (active: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  selectedObject: null,
  transformMode: TRANSFORM_MODES[modeId],
  transformActive: false,

  setSelectedObject(selectedObject) {
    set({ selectedObject });
  },
  cylceTransformType() {
    modeId = ((modeId + 1) % TRANSFORM_MODES.length) as typeof modeId;
    set({ transformMode: TRANSFORM_MODES[modeId] });
  },
  setTransformActive(transformActive) {
    set({ transformActive });
  },
}));
