/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useRef } from "react";

import { Float, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { GLTF } from "three-stdlib";

import { useDebug } from "~/components/canvas/Debug";
import useMousePos from "~/utils/useMousePos";
import useViewport from "~/utils/useViewport";

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

const lookTo = new Vector3();

export default function Keyboard({ ...props }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/keyboard.gltf") as GLTFResult;
  const keyboardRef = useRef<THREE.Group>(null);
  const { width, height, mobile } = useViewport();
  const { posX, posY } = useMousePos();
  const { ...debug } = useDebug();

  useFrame((_, delta) => {
    keyboardRef.current?.lookAt(
      lookTo.lerp(lookTo.clone().set(posX, -posY - 2.5, 3.5), delta * 4)
    );
  });

  return (
    <>
      <Float>
        <group
          ref={keyboardRef}
          scale={mobile ? width * 0.18 : 0.9}
          position={[
            mobile ? 0 : width * 0.2,
            mobile ? -height * 0.25 : -height * 0.2,
            -0.5,
          ]}
          rotation={[Math.PI * 0.15, -Math.PI * 0.1, 0]}
          dispose={null}
          {...debug}
          {...props}
        >
          <mesh
            geometry={nodes.Case.geometry}
            material={materials["Black rubber"]}
          />
          <mesh
            name="cable"
            position={[0.7, 0.25, 0.55]}
            // geometry={nodes.Keyboard_cable.geometry}
            // material={materials["Black rubber"]}
          />
          <mesh
            geometry={nodes.Keycaps.geometry}
            material={materials["Keycap material"]}
            material-color="#cbd5e1"
          />
        </group>
      </Float>
    </>
  );
}

useGLTF.preload("/keyboard.gltf");

//  <ContactShadows position={[0, -1.5, 0]} far={5} blur={5} />
