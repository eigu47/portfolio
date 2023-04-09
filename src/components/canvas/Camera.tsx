import { useRef } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";

import { usePage } from "~/components/canvas/Page";
import useScrollPos from "~/utils/useScrollPos";

const position = new Vector3();
const rotation = new Vector3();
const lookAt = new Vector3();

export default function Camera() {
  const { debugOn, enableZoom } = useControls({
    debugOn: false,
    enableZoom: { value: true, render: (get) => get("debugOn") as boolean },
  });
  const { scrollPos, scrollPage, scrollDown } = useScrollPos();
  const { position: posFrom, rotation: rotFrom } = usePage(scrollPage);
  const { position: posTo, rotation: rotTo } = usePage(scrollPage + 1);
  const ref = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    if ((debugOn && enableZoom) || !ref.current) return null;

    position.lerpVectors(posFrom, posTo, scrollPos - scrollPage);
    ref.current.position.lerp(position, delta * 4);

    camera.lookAt(
      lookAt.lerp(scrollDown ? position : ref.current.position, delta * 8)
    );

    rotation.lerpVectors(rotFrom, rotTo, scrollPos - scrollPage);
    ref.current.rotation.setFromVector3(rotation);
  });

  return (
    <group ref={ref}>
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 5]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 15, 10]} intensity={0.5} />
    </group>
  );
}
