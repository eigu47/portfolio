import { createContext, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import useScrollPos from "~/utils/useScrollPos";
import useViewport from "~/utils/useViewport";

type Props = {
  children: React.ReactNode;
  page?: number;
  scrollFactor?: number;
  offsetX?: number;
  offsetZ?: number;
} & JSX.IntrinsicElements["group"];

export const pageContext = createContext(0);
const position = new Vector3();

export default function Block({
  children,
  page: parentPage,
  scrollFactor = 1,
  offsetX = 0,
  offsetZ = 0,
  ...props
}: Props) {
  const { scrollPos } = useScrollPos();
  const { height, page: contextPage } = useViewport();
  const page = parentPage ?? contextPage;
  const ref = useRef<THREE.Group>(null);

  const relativePage = scrollPos - page;

  useFrame((_, delta) => {
    ref.current?.position.lerp(
      position.set(
        offsetX * relativePage,
        relativePage * height * scrollFactor,
        offsetZ * relativePage
      ),
      delta * 4
    );
  });

  return (
    <pageContext.Provider value={page}>
      <group ref={ref} position={[0, -height * page, 0]} {...props}>
        {children}
      </group>
    </pageContext.Provider>
  );
}
