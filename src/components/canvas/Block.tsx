import { createContext, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import useGetScrollPos from "~/utils/useGetScrollPos";
import useGetSizes from "~/utils/useGetSizes";

export const offsetContext = createContext(0);

type Props = {
  children: React.ReactNode;
  offset?: number;
  factor?: number;
} & JSX.IntrinsicElements["group"];

const position = new Vector3();

export default function Block({
  children,
  offset: parentOffset,
  factor = 1,
  ...props
}: Props) {
  const { scrollPos } = useGetScrollPos();
  const { height, offset: contextOffset } = useGetSizes();
  const offset = parentOffset ?? contextOffset;
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    ref.current?.position.lerp(
      position.set(0, height * scrollPos * factor, 0),
      0.1
    );
  });

  return (
    <offsetContext.Provider value={offset}>
      <group {...props} position={[0, -height * offset, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
}
