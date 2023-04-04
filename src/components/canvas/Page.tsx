import { PAGES } from "~/utils/store";
import { type IndexUnion } from "~/utils/types";
import useViewport from "~/utils/useViewport";

type Props = {
  children: React.ReactNode;
  page?: IndexUnion<typeof PAGES>;
} & JSX.IntrinsicElements["group"];

export default function Page({ children, page = 0, ...props }: Props) {
  const { width, height } = useViewport();

  const [x, y, z] = PAGES[page].position ?? [0, 0, 0];
  const position = [x * width, y * height, z] satisfies THREE.Vector3Tuple;

  const rotation = PAGES[page].rotation ?? [0, 0, 0];

  return (
    <group position={position} rotation={[...rotation]} {...props}>
      {children}
    </group>
  );
}
