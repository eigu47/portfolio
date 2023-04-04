import { useMemo } from "react";

import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

const cameraPos = new Vector3();
const cameraDistance = new Vector3(0, 0, 5);

export default function useViewport() {
  const getCurrentViewport = useThree(
    (state) => state.viewport.getCurrentViewport
  );
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const { width, height } = useMemo(() => {
    return getCurrentViewport(
      camera,
      camera.getWorldPosition(cameraPos).clone().add(cameraDistance)
    );
  }, [size]);

  return {
    width,
    height,
    mobile: size.width < 640,
  };
}
