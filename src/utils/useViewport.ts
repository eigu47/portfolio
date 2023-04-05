import { useMemo } from "react";

import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

import useScrollPos from "~/utils/useScrollPos";

const cameraPos = new Vector3();
const cameraDistance = new Vector3(0, 0, 5);

export default function useViewport() {
  const getCurrentViewport = useThree(
    (state) => state.viewport.getCurrentViewport
  );
  const camera = useThree((state) => state.camera);
  const threeSize = useThree((state) => state.size);
  const { scrollPage } = useScrollPos();
  // Native viewport width and height are not updated correctly if camera is moved
  const { width, height } = useMemo(() => {
    return getCurrentViewport(
      camera,
      camera.getWorldPosition(cameraPos).add(cameraDistance)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threeSize, scrollPage, camera, getCurrentViewport]);
  // Tailwind-like breakpoints
  const size = {
    ...threeSize,
    sm: threeSize.width > 640,
    md: threeSize.width > 768,
    lg: threeSize.width > 1024,
    xl: threeSize.width > 1280,
    "2xl": threeSize.width > 1536,
  };

  return {
    width,
    height,
    size,
  };
}
