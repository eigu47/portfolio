import { useEffect } from "react";

import { GUI } from "lil-gui";

import { TRANSFORM_MODES, useDebugStore } from "~/utils/debugStore";

export default function DebugPanel() {
  const setDebugOn = useDebugStore((state) => state.setDebugOn);
  const setOrbitControls = useDebugStore((state) => state.setOrbitControls);
  const setTransformMode = useDebugStore((state) => state.setTransformMode);

  useEffect(() => {
    const gui = new GUI({ title: "Portfolio debug" });
    const settings = {
      get debugOn() {
        return useDebugStore.getState().debugOn;
      },
      set debugOn(active: boolean) {
        setDebugOn(active);
      },
      get orbitControls() {
        return useDebugStore.getState().orbitControls;
      },
      set orbitControls(active: boolean) {
        setOrbitControls(active);
        if (active) setDebugOn(true);
      },
    };
    const selected = {
      get object() {
        const object = useDebugStore.getState().selectedObject;
        return object?.name || object?.uuid || "Click an object";
      },
    };
    const transform = {
      get transformMode() {
        return useDebugStore.getState().transformMode;
      },
      set transformMode(mode: (typeof TRANSFORM_MODES)[number]) {
        setTransformMode(mode);
      },
    };

    gui.add(settings, "debugOn").listen();
    gui.add(settings, "orbitControls").listen();
    gui.add(selected, "object").name("selected").listen().disable();
    gui.add(transform, "transformMode", [...TRANSFORM_MODES]).listen();

    return () => gui.destroy();
  }, [setDebugOn, setOrbitControls, setTransformMode]);

  return null;
}
