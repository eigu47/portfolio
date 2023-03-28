/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useEffect, useRef } from "react";

import { ContactShadows, Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3, type Group } from "three";
import type { GLTF } from "three-stdlib";

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

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/keyboard.gltf") as GLTFResult;
  const keyboardRef = useRef<Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX - document.documentElement.clientWidth / 2;
      mousePos.current.y =
        e.clientY - document.documentElement.clientHeight / 2;
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  });

  const position = new Vector3();

  useFrame(({}, delta) => {
    if (!keyboardRef.current) return null;

    keyboardRef.current.lookAt(
      position.lerp(
        new Vector3().set(
          mousePos.current.x,
          -2500 - mousePos.current.y * 2.5,
          2000
        ),
        delta * 1
      )
    );
  });

  return (
    <>
      <Float
        rotation={[Math.PI * 0.3, Math.PI * 0, 0]}
        position={[0, 1, 0]}
        dispose={null}
        speed={2}
      >
        <group {...props} ref={keyboardRef} castShadow>
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
      <ContactShadows position={[0, -0.7, 0]} blur={2} far={2} />
    </>
  );
}

useGLTF.preload("/keyboard.gltf");
