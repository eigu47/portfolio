import { useEffect } from "react";

import { GUI } from "lil-gui";

import { TRANSFORM_MODES, useDebugStore } from "~/utils/debugStore";

export default function DebugPanel() {
  const setDebugOn = useDebugStore((state) => state.setDebugOn);
  const setOrbitControls = useDebugStore((state) => state.setOrbitControls);
  const setTransformMode = useDebugStore((state) => state.setTransformMode);

  useEffect(() => {
    const { debugOn, orbitControls, selectedObject, transformMode } =
      useDebugStore.getState();
    const gui = new GUI({ title: "Portfolio debug" });
    const settings = { debugOn, orbitControls };
    const selected = { object: selectedObject?.name || "Click an object" };

    gui.add(settings, "debugOn").onChange(setDebugOn);
    gui.add(settings, "orbitControls").onChange((active: boolean) => {
      setOrbitControls(active);
      if (active) setDebugOn(true);
    });
    gui.add(selected, "object").name("selected").disable();
    gui
      .add({ transformMode }, "transformMode", [...TRANSFORM_MODES])
      .onChange(setTransformMode);

    return () => gui.destroy();
  }, [setDebugOn, setOrbitControls, setTransformMode]);

  return null;
}
