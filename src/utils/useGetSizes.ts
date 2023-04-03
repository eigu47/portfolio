import { useContext } from "react";

import { useThree } from "@react-three/fiber";

import { offsetContext } from "~/components/canvas/Block";

export default function useGetSizes() {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);
  const offset = useContext(offsetContext);

  const mobile = size.width < 640;
  const width = viewport.width;
  const height = viewport.height;

  return {
    viewport,
    width,
    height,
    mobile,
    offset,
  };
}
