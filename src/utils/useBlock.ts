import { useThree } from "@react-three/fiber";

export function useBlock() {
  const viewport = useThree((state) => state.viewport);
  const size = useThree((state) => state.size);

  return {
    viewport,
    mobile: size.width < 640,
    width: viewport.width,
    height: viewport.height,
  };
}
