import { useMemo } from "react";

import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const cameraPos = new Vector3();
const cameraDis = new Vector3(0, 0, 5);

export default function useViewport() {
  const getCurrentViewport = useThree(
    (state) => state.viewport.getCurrentViewport
  );
  const camera = useThree((state) => state.camera);
  const { width: sizeWidth, height: sizeHeight } = useThree(
    (state) => state.size
  );
  // Native viewport width and height are not updated correctly if camera is moved
  const { width, height } = useMemo(() => {
    return getCurrentViewport(
      camera,
      camera.getWorldPosition(cameraPos).add(cameraDis)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, getCurrentViewport, sizeHeight]);
  // Tailwind-like breakpoints
  const size = {
    width: sizeWidth,
    height: sizeHeight,
    sm: sizeWidth > 640,
    md: sizeWidth > 768,
    lg: sizeWidth > 1024,
    xl: sizeWidth > 1280,
    "2xl": sizeWidth > 1536,
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    } as const,
  };
  const mobile = !size.sm || width * 3 < height * 2;

  return {
    width,
    height,
    size,
    mobile,
    device: mobile ? ("mobile" as const) : ("desktop" as const),
  };
}
