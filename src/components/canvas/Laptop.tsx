/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Laptop by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/fEYeMIiRNHM)
*/

import { useRef } from "react";

import { Html, Plane, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { type GLTF } from "three-stdlib";

import { useDebug } from "~/components/canvas/Debug";
import useScrollPos from "~/hooks/useScrollPos";
import useViewport from "~/hooks/useViewport";
import { PAGES } from "~/utils/config";

const CONTACT_PAGE = PAGES.findIndex(({ id }) => id === "contact");
const rotation = new Vector3();
const openRot = new Vector3();
const closedRot = new Vector3(Math.PI * 0.56, 0, 0);

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/laptop.glb") as GLTFResult;
  const { height, mobile } = useViewport();
  const { scrollPos } = useScrollPos();
  const monitorRef = useRef<THREE.Group>(null);
  const debug = useDebug();

  const isOpen = scrollPos > CONTACT_PAGE - 0.25;

  useFrame((_, delta) => {
    monitorRef.current?.rotation.setFromVector3(
      rotation.lerp(isOpen ? openRot : closedRot, delta * 4)
    );
  });

  return (
    <group
      scale={mobile ? 0.15 : 0.2}
      position={mobile ? [0, -height * 0.12, 0] : [0, -height * 0.2, 0]}
      rotation={[0.3, 0, 0]}
      dispose={null}
      {...props}
      {...debug}
    >
      <mesh
        geometry={nodes["Laptop_01_Cube025-Mesh"].geometry}
        material={materials["1A1A1A"]}
      />
      <mesh
        geometry={nodes["Laptop_01_Cube025-Mesh_1"].geometry}
        material={materials["455A64"]}
      />
      <group
        position={[0, 0.19, -4.85]}
        ref={monitorRef}
        rotation={closedRot.toArray()}
      >
        <group position={[0, 4.92, -1.08]} rotation={[-0.18, 0, 0]}>
          <Plane scale={[12.56, 8.41, 1]}>
            <meshBasicMaterial color={[0.6, 0.6, 6]} toneMapped={false} />
          </Plane>

          <Html
            position-z={0.1}
            transform
            occlude="blending"
            className="screen h-[310px] w-[480px] overflow-y-scroll"
          >
            <a href="/EiguchiPablo.pdf" target="_blank" rel="noreferrer">
              <img src="/EiguchiPablo.jpg" alt="Eiguchi Pablo Martin" />
            </a>
          </Html>
        </group>

        <mesh
          geometry={nodes["Laptop_01_Cube025-Mesh001"].geometry}
          material={materials["1A1A1A"]}
        />
      </group>
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    ["Laptop_01_Cube025-Mesh"]: THREE.Mesh;
    ["Laptop_01_Cube025-Mesh_1"]: THREE.Mesh;
    ["Laptop_01_Cube025-Mesh001"]: THREE.Mesh;
    ["Laptop_01_Cube025-Mesh001_1"]: THREE.Mesh;
    ["Laptop_01_Cube025-Mesh001_2"]: THREE.Mesh;
    ["Laptop_01_Cube025-Mesh001_3"]: THREE.Mesh;
  };
  materials: {
    ["1A1A1A"]: THREE.MeshStandardMaterial;
    ["455A64"]: THREE.MeshStandardMaterial;
    ["039BE5"]: THREE.MeshStandardMaterial;
    F44336: THREE.MeshStandardMaterial;
    FF9800: THREE.MeshStandardMaterial;
  };
};

useGLTF.preload("/laptop.glb");
