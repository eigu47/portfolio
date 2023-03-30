/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useEffect, useRef } from "react";

import { ContactShadows, Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, type Group } from "three";
import type { GLTF } from "three-stdlib";
import useGetMousePos from "~/utils/useGetMousePos";

type GLTFResult = GLTF & {
  nodes: {
    Keyboard_cable: THREE.Mesh;
    Case: THREE.Mesh;
    Keycaps: THREE.Mesh;
  };
  materials: {
    ["Black rubber"]: THREE.MeshStandardMaterial;
    ["Keycap material"]: THREE.MeshStandardMaterial;
  };
};

const lerpedPos = new Vector3();
const position = new Vector3();

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/keyboard.gltf") as GLTFResult;
  const keyboardRef = useRef<Group>(null);
  const mouse = useGetMousePos();

  useFrame((_, delta) => {
    if (!keyboardRef.current) return;

    lerpedPos.lerp(
      position.set(mouse.current.x - 0.5, -mouse.current.y - 2, 4),
      delta * 2
    );

    keyboardRef.current.lookAt(lerpedPos);
  });

  return (
    <group {...props}>
      <Float rotation={[Math.PI * 0.3, 0, 0]} speed={2} floatIntensity={2}>
        <group ref={keyboardRef}>
          <mesh
            geometry={nodes.Case.geometry}
            // material={nodes.Case.material}
            material={materials["Black rubber"]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Keyboard_cable.geometry}
            material={nodes.Keyboard_cable.material}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Keycaps.geometry}
            material={materials["Keycap material"]}
            material-color="#cbd5e1"
            castShadow
            receiveShadow
          />
        </group>
      </Float>
      <ContactShadows position={[0, -1.5, 0]} scale={20} blur={2} />
    </group>
  );
}

useGLTF.preload("/keyboard.gltf");
