import { Html } from "@react-three/drei";

import useViewport from "~/utils/useViewport";

export default function About() {
  const { width, height, mobile } = useViewport();

  return (
    <Html
      position={mobile ? [0, 0, 0] : [width * 0.08, height * 0.1, 0]}
      transform
      occlude="blending"
      scale={0.5}
      style={{ maxWidth: width * 55 }}
    >
      <div className="select-none rounded border border-cyan-950/70 bg-slate-950 p-6 text-center">
        <p>
          I&apos;m a self-taught frontend developer with a primary focus on
          React and TypeScript. <br />I love to learn new technologies to
          improve my skills and stay current with industry trends.
        </p>
      </div>
    </Html>
  );
}
