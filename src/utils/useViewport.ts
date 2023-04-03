import { useContext } from "react";

import { useThree } from "@react-three/fiber";

import { pageContext } from "~/components/canvas/Block";

export default function useViewport() {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const page = useContext(pageContext);

  return {
    viewport,
    page,
    width: viewport.width,
    height: viewport.height,
    mobile: size.width < 640,
  };
}
