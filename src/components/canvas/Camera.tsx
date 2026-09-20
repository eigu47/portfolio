import { useRef } from "react";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { Quaternion, Vector3 } from "three";

import { usePage } from "~/components/canvas/Page";
import { getCameraParallax, type TiltResponse } from "~/hooks/useDeviceTilt";
import useScrollPos from "~/hooks/useScrollPos";
import { useDebugStore } from "~/utils/debugStore";

const CAMERA_POSITION = [0, 0, 5] as const;
const position = new Vector3();
const rotation = new Vector3();
const rotationLerp = new Vector3();
const lookAt = new Vector3();
const cameraBasePosition = new Vector3(...CAMERA_POSITION);
const cameraWorldPosition = new Vector3();
const cameraParallax = new Vector3();
const cameraRight = new Vector3();
const cameraUp = new Vector3();
const cameraQuaternion = new Quaternion();

export default function Camera({
  tilt = { x: 0, y: 0 },
}: {
  tilt?: TiltResponse;
}) {
  const { debugOn, orbitControls } = useDebugStore();
  const { scrollPos, scrollPage, scrollDown } = useScrollPos();
  const { position: posFrom, rotation: rotFrom } = usePage(scrollPage);
  const { position: posTo, rotation: rotTo } = usePage(scrollPage + 1);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ camera }, delta) => {
    if ((debugOn && orbitControls) || !groupRef.current) return null;

    position.lerpVectors(posFrom, posTo, scrollPos - scrollPage);
    groupRef.current.position.lerp(position, delta * 2.8);

    rotation.lerpVectors(rotFrom, rotTo, scrollPos - scrollPage);
    groupRef.current.rotation.setFromVector3(
      rotationLerp.lerp(rotation, delta * 5.6),
    );

    const target = scrollDown ? position : groupRef.current.position;
    camera.lookAt(
      lookAt.lerp(
        target.clone().add({ x: tilt.x * 0.75, y: tilt.y * 0.75, z: 0 }),
        delta * 5.6,
      ),
    );

    // Convert the normalized response from the camera's rendered axes into its parent space.
    camera.getWorldQuaternion(cameraQuaternion);
    groupRef.current.localToWorld(cameraWorldPosition.copy(cameraBasePosition));
    cameraRight.set(1, 0, 0).applyQuaternion(cameraQuaternion);
    cameraUp.set(0, 1, 0).applyQuaternion(cameraQuaternion);
    getCameraParallax(tilt, cameraParallax);
    cameraWorldPosition
      .addScaledVector(cameraRight, cameraParallax.x)
      .addScaledVector(cameraUp, cameraParallax.y);
    groupRef.current.worldToLocal(cameraWorldPosition);
    camera.position.lerp(cameraWorldPosition, Math.min(1, delta * 5.6));
  });

  return (
    <>
      <group ref={groupRef}>
        <PerspectiveCamera makeDefault fov={60} position={CAMERA_POSITION} />
      </group>
      <ambientLight color="#bcc4d4" intensity={0.14} />
      <directionalLight
        castShadow
        color="#fff4e5"
        intensity={1.25}
        position={[5, 8, 5]}
        shadow-bias={-0.0005}
        shadow-camera-far={30}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        color="#8a94a8"
        intensity={0.35}
        position={[-6, 3, 6]}
      />
      <spotLight
        color="#8ce5bd"
        intensity={0.55}
        penumbra={0.7}
        angle={0.65}
        position={[3.5, 4.5, -6.5]}
        target-position={[0, -0.3, 0]}
      />
      <pointLight
        color="#8ce5bd"
        intensity={0.15}
        distance={12}
        position={[0, -2.2, 2]}
      />
    </>
  );
}
