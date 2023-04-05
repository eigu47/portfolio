import { PAGES } from "~/utils/store";
import { type ValidIndex } from "~/utils/types";
import useViewport from "~/utils/useViewport";

type Props = {
  children: React.ReactNode;
  page?: ValidIndex<typeof PAGES>;
} & JSX.IntrinsicElements["group"];

export default function Page({ children, page = 0, ...props }: Props) {
  const { width, height } = useViewport();

  const [x, y, z] = PAGES[page].position ?? [0, 0, 0];
  const position = [x * width, y * height, z] satisfies THREE.Vector3Tuple;

  const [rx, ry, rz] = PAGES[page].rotation ?? [0, 0, 0];
  const rotation = [
    Math.PI * rx,
    Math.PI * ry,
    Math.PI * rz,
  ] satisfies THREE.Vector3Tuple;

  return (
    <group position={position} rotation={rotation} {...props}>
      {children}
    </group>
  );
}
