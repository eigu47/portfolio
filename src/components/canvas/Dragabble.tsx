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
  far = 5,
  hoverColor,
  ...props
}: {
  speed?: number;
  far?: number;
  hoverColor?: [
    object: React.RefObject<THREE.MeshBasicMaterial>,
    colorFrom: THREE.Color,
    colorTo: THREE.Color,
    speed?: number
  ];
} & JSX.IntrinsicElements["group"]) {
  const ref = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const { width, height } = useThree((state) => state.size);
  const [hover, setHover] = useState(false);
  useCursor(hover);

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ xy: [x, y] }) => {
      camera.getWorldPosition(cameraPos);
      // Drag on the same plane as the camera, `far` units away
      dragPos
        .set((x / width) * 2 - 1, (-y / height) * 2 + 1, 0)
        .unproject(camera)
        .sub(cameraPos)
        .normalize()
        .multiplyScalar(far)
        .add(cameraPos);
      // Correct parent offset
      if (ref.current?.parent) {
        dragPos
          .add(ref.current.parent.position.clone().negate())
          .applyQuaternion(ref.current.parent.quaternion.clone().invert());
      }
    },
  });

  useFrame((_, delta) => {
    ref.current?.position.lerp(dragPos, delta * speed);

    if (hoverColor) {
      const [materialRef, colorFrom, colorTo, speed = 10] = hoverColor;

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
