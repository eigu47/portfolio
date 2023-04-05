import { useEffect, useRef } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { Vector3 } from "three";

import { COLORS, PAGES } from "~/utils/store";
import useScrollPos from "~/utils/useScrollPos";
import useViewport from "~/utils/useViewport";

const position = new Vector3();
const posFrom = new Vector3();
const posTo = new Vector3();
const lookAt = new Vector3();

const rotation = new Vector3();
const rotFrom = new Vector3();
const rotTo = new Vector3();

export default function Camera() {
  const { scrollPos, scrollPage, scrollDown } = useScrollPos();
  const { width, height } = useViewport();
  const { debugOn } = useControls({ debugOn: false });
  const ref = useRef<THREE.Group>(null);
  // Get current and next page plane position and rotation
  useEffect(() => {
    const [x, y, z] = PAGES[scrollPage].position ?? [0, 0, 0];
    const [px, py, pz] = PAGES[scrollPage + 1]?.position ?? [x, y, z];
    posFrom.set(x * width, y * height, z);
    posTo.set(px * width, py * height, pz);

    const [rx, ry, rz] = PAGES[scrollPage].rotation ?? [0, 0, 0];
    const [prx, pry, prz] = PAGES[scrollPage + 1]?.rotation ?? [rx, ry, rz];
    rotFrom.set(Math.PI * rx, Math.PI * ry, Math.PI * rz);
    rotTo.set(Math.PI * prx, Math.PI * pry, Math.PI * prz);
  }, [scrollPage]);

  useFrame(({ camera }, delta) => {
    if (debugOn || !ref.current) return null;

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
      <PerspectiveCamera makeDefault fov={60} position={[0, 0, 5]}>
        <fog attach="fog" args={[COLORS.slate900, 0, 60]} />
      </PerspectiveCamera>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 15, 10]} intensity={0.5} />
    </group>
  );
}
