import { useMemo, useRef, useState } from "react";

import { useCursor } from "@react-three/drei";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import type * as THREE from "three";
import { Quaternion, Vector3 } from "three";

import usePreventScroll from "~/hooks/usePreventScroll";

export default function Draggable({
  children,
  speed = 10,
  far = 5,
  hoverColor,
  ...props
}: {
  speed?: number;
  far?: number;
  hoverColor?: [
    object:
      | React.RefObject<THREE.MeshBasicMaterial | null>
      | React.RefObject<THREE.MeshPhysicalMaterial | null>,
    colorFrom: THREE.Color,
    colorTo: THREE.Color,
    speed?: number,
  ];
} & ThreeElements["group"]) {
  const groupRef = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const { width, height } = useThree((state) => state.size);
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const preventScroll = usePreventScroll();
  useCursor(hover, "grab");
  useCursor(drag, "grabbing", hover ? "grab" : "auto");

  const dragPos = useMemo(() => new Vector3(), []);
  const cameraPos = useMemo(() => new Vector3(), []);
  const parentPos = useMemo(() => new Vector3(), []);
  const parentQuat = useMemo(() => new Quaternion(), []);

  groupRef.current?.parent?.getWorldPosition(parentPos).negate();
  groupRef.current?.parent?.getWorldQuaternion(parentQuat).invert();

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ xy: [x, y], down, offset: [offX, offY] }) => {
      preventScroll.current = down;
      setDrag(down);

      camera.getWorldPosition(cameraPos);
      // fixes weird bug in mobile
      if (offX && offY)
        // Drag on the same plane as the camera, `far` units away.
        dragPos
          .set((x / width) * 2 - 1, -(y / height) * 2 + 1, 0)
          .unproject(camera)
          .sub(cameraPos)
          .normalize()
          .multiplyScalar(down ? far * 0.8 : far)
          .add(cameraPos)
          // correct by parent offset
          .add(parentPos)
          .applyQuaternion(parentQuat);
    },
  });

  useFrame((_, delta) => {
    groupRef.current?.position.lerp(dragPos, delta * speed);

    if (hoverColor) {
      const [materialRef, colorFrom, colorTo, speed = 10] = hoverColor;

      materialRef.current?.color.lerp(
        hover || drag ? colorTo : colorFrom,
        delta * speed,
      );
    }
  });

  return (
    <group ref={groupRef} {...props} {...(bind() as ThreeElements["group"])}>
      {children}
    </group>
  );
}
