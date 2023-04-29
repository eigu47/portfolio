import { useMemo, useRef, useState } from "react";

import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { Vector3 } from "three";

import usePreventScroll from "~/hooks/usePreventScroll";
import useViewport from "~/hooks/useViewport";

export default function Rotable({
  children,
  desktopSpeed = 2,
  mobileSpeed = 1.5,
  lerp = 8,
  ...props
}: {
  desktopSpeed?: number;
  mobileSpeed?: number;
  lerp?: number;
} & JSX.IntrinsicElements["group"]) {
  const {
    mobile,
    size: { width: sizeWidth },
  } = useViewport();
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const carouselRef = useRef<THREE.Group>(null);
  const preventScroll = usePreventScroll();
  useCursor(hover, "grab");
  useCursor(drag, "grabbing", hover ? "grab" : "auto");

  const rotation = useMemo(() => new Vector3(), []);
  const lerpFrom = useMemo(() => new Vector3(), []);

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ offset: [x], down }) => {
      setDrag(down);
      preventScroll.current = down;

      rotation.set(
        0,
        mobile
          ? Math.PI * (x / sizeWidth) * mobileSpeed
          : Math.PI * (x / sizeWidth) * desktopSpeed,
        0
      );
    },
  });

  useFrame((_, delta) => {
    carouselRef.current?.rotation.setFromVector3(
      lerpFrom.lerp(rotation, delta * lerp)
    );
  });

  return (
    <group
      ref={carouselRef}
      {...props}
      {...(bind() as JSX.IntrinsicElements["group"])}
    >
      {children}
    </group>
  );
}
