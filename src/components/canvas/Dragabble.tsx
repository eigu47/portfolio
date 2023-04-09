import { useRef, useState } from "react";

import { useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

const dragPos = new Vector3();
const cameraPos = new Vector3();

export default function Dragabble({
  children,
  speed = 10,
  changeColor,
  ...props
}: {
  speed?: number;
  changeColor?: [
    object: React.RefObject<THREE.MeshBasicMaterial>,
    colorFrom: THREE.Color,
    colorTo: THREE.Color,
    speed?: number
  ];
} & JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const [hover, setHover] = useState(false);
  useCursor(hover);

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ xy: [x, y] }) => {
      camera.getWorldPosition(cameraPos);
      dragPos
        .set((x / size.width) * 2 - 1, (-y / size.height) * 2 + 1, 0)
        .unproject(camera)
        .sub(cameraPos)
        .normalize()
        .multiplyScalar(5)
        .add(cameraPos);

      if (ref.current?.parent) {
        dragPos
          .add(ref.current?.parent?.position.clone().negate())
          .applyQuaternion(ref.current?.parent?.quaternion.clone().invert());
      }
    },
  });

  useFrame((_, delta) => {
    ref.current?.position.lerp(dragPos, delta * speed);

    if (changeColor) {
      const [materialRef, colorFrom, colorTo, speed = 10] = changeColor;

      materialRef.current?.color.lerp(
        hover ? colorTo : colorFrom,
        delta * speed
      );
    }
  });

  return (
    <group ref={ref} {...props} {...(bind() as JSX.IntrinsicElements["group"])}>
      {children}
    </group>
  );
}
