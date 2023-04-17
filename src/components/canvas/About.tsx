import { Html } from "@react-three/drei";

import useViewport from "~/utils/useViewport";

export default function About() {
  const { width, height, mobile } = useViewport();

  return (
    <Html
      position={mobile ? [0, 0, 0] : [width * 0.1, height * 0.1, 0]}
      center
      transform
      occlude="blending"
    >
      <div className="rounded border border-cyan-950 bg-slate-950/70">
        <h3>HELLO</h3>
      </div>
    </Html>
  );
}
