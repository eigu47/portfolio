import { useRef } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";

import { usePage } from "~/components/canvas/Page";
import useScrollPos from "~/hooks/useScrollPos";

const position = new Vector3();
const rotation = new Vector3();
const rotationLerp = new Vector3();
const lookAt = new Vector3();

export default function Camera() {
  const { debugOn, orbitControls } = useControls({
    debugOn: false,
    orbitControls: { value: false, render: (get) => get("debugOn") as boolean },
  });
  const { scrollPos, scrollPage, scrollDown } = useScrollPos();
  const { position: posFrom, rotation: rotFrom } = usePage(scrollPage);
  const { position: posTo, rotation: rotTo } = usePage(scrollPage + 1);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    if ((debugOn && orbitControls) || !groupRef.current) return null;

    position.lerpVectors(posFrom, posTo, scrollPos - scrollPage);
    groupRef.current.position.lerp(position, delta * 4);

    camera.lookAt(
      lookAt.lerp(scrollDown ? position : groupRef.current.position, delta * 8)
    );

    rotation.lerpVectors(rotFrom, rotTo, scrollPos - scrollPage);

    groupRef.current.rotation.setFromVector3(
      rotationLerp.lerp(rotation, delta * 8)
    );
  });

  return (
    <>
      <group ref={groupRef}>
        <PerspectiveCamera makeDefault fov={60} position={[0, 0, 5]} />
      </group>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 15, 10]} intensity={0.5} />
    </>
  );
}
