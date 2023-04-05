import { useMemo } from "react";

import { Vector3 } from "three";

import { PAGES } from "~/utils/store";
import { type ValidIndex } from "~/utils/types";
import useViewport from "~/utils/useViewport";

type Props = {
  children: React.ReactNode;
  page?: ValidIndex<typeof PAGES>;
} & JSX.IntrinsicElements["group"];

export default function Page({ children, page = 0, ...props }: Props) {
  const { position, rotation } = usePage(page);

  return (
    <group position={position} rotation={rotation.toArray()} {...props}>
      {children}
    </group>
  );
}

export function usePage(page: number) {
  const { width, height } = useViewport();

  const position = useMemo(() => {
    const [x, y, z] = PAGES[page]?.position ??
      PAGES[page - 1]?.position ?? [0, 0, 0];

    return new Vector3(x * width, y * height, z);
  }, [page, width, height]);

  const rotation = useMemo(() => {
    const [rx, ry, rz] = PAGES[page]?.rotation ??
      PAGES[page - 1]?.rotation ?? [0, 0, 0];

    return new Vector3(Math.PI * rx, Math.PI * ry, Math.PI * rz);
  }, [page]);

  return { position, rotation };
}
