import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

import useGetScrollPos from "~/utils/useGetScrollPos";

export default function Camera() {
  const { scrollPos } = useGetScrollPos();
  const { debugOn } = useControls({ debugOn: false });

  useFrame(({ camera, scene }, delta) => {
    if (debugOn) return null;

    camera.position.z = 5 - scrollPos * 10;
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
