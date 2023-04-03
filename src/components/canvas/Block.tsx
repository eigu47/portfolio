import { createContext, useRef } from "react";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

import useScrollPos from "~/utils/useScrollPos";
import useViewport from "~/utils/useViewport";

type Props = {
  children: React.ReactNode;
  offset?: number;
  factor?: number;
} & JSX.IntrinsicElements["group"];

export const offsetContext = createContext(0);
const position = new Vector3();

export default function Block({
  children,
  offset: parentOffset,
  factor = 1,
  ...props
}: Props) {
  const { scrollPos } = useScrollPos();
  const { height, offset: contextOffset } = useViewport();
  const ref = useRef<THREE.Group>(null);

  const offset = parentOffset ?? contextOffset;
  const relativeOffset = scrollPos - offset;

  useFrame((_, delta) => {
    ref.current?.position.lerp(
      position.set(0, relativeOffset * height * factor, 0),
      delta * 4
    );
  });

  return (
    <offsetContext.Provider value={offset}>
      <group ref={ref} position={[0, -height * offset, 0]} {...props}>
        {children}
      </group>
    </offsetContext.Provider>
  );
}
