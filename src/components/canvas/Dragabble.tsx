import { useRef, useState } from "react";

import { useCursor, useDetectGPU } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Quaternion, Vector3 } from "three";

const dragPos = new Vector3();
const cameraPos = new Vector3();
const parentPos = new Vector3();
const parentQuat = new Quaternion();

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
  const { isMobile } = useDetectGPU();
  useCursor(hover);

  ref.current?.parent?.getWorldPosition(parentPos).negate();
  ref.current?.parent?.getWorldQuaternion(parentQuat).invert();

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ xy: [x, y], last }) => {
      camera.getWorldPosition(cameraPos);
      // Drag on the same plane as the camera, `far` units away
      dragPos
        .set((x / width) * 2 - 1, -(y / height) * 2 + 1, 0)
        .unproject(camera)
        .sub(cameraPos)
        .normalize()
        .multiplyScalar(last ? far : far * 0.8)
        .add(cameraPos)
        // correct by parent offset
        .add(parentPos)
        .applyQuaternion(parentQuat);
    },
  });

  useFrame((_, delta) => {
    if (isMobile) return null;

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
    <group
      ref={ref}
      {...props}
      {...(!isMobile && (bind() as JSX.IntrinsicElements["group"]))}
    >
      {children}
    </group>
  );
}
