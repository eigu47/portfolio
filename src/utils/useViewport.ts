import { useContext } from "react";

import { useThree } from "@react-three/fiber";

import { offsetContext } from "~/components/canvas/Block";

export default function useViewport() {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const offset = useContext(offsetContext);

  return {
    viewport,
    offset,
    width: viewport.width,
    height: viewport.height,
    mobile: size.width < 640,
  };
}
