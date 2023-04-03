import { useFrame } from "@react-three/fiber";

export default function Camera() {
  useFrame(({ camera, scene }, delta) => {
    // camera.position.y = -scrollPos * 10;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 15, 10]} intensity={0.5} />
      <fog attach="fog" args={["#0f172a", 0, 60]} />
    </>
  );
}
