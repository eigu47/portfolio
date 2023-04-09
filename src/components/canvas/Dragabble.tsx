import { useRef } from "react";

import { useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { Vector3 } from "three";

const mouseCoords = new Vector3();
const cameraPos = new Vector3();

export default function Dragabble({
  children,
  ...props
}: JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const bind = useDrag(({ xy: [x, y] }) => {
    if (!ref.current) return;

    camera.getWorldPosition(cameraPos);

    mouseCoords
      .set((x / size.width) * 2 - 1, (-y / size.height) * 2 + 1, 0)
      .unproject(camera)
      .sub(cameraPos)
      .normalize()
      .multiplyScalar(5)
      .add(cameraPos);

    if (ref.current.parent) {
      mouseCoords
        .add(ref.current.parent?.position.clone().negate())
        .applyQuaternion(ref.current?.parent?.quaternion.clone().invert());
    }

    ref.current.position.copy(mouseCoords);
  });

  return (
    <group ref={ref} {...props} {...(bind() as JSX.IntrinsicElements["group"])}>
      {children}
    </group>
  );
}
