import { Center, Decal, Float, useTexture } from "@react-three/drei";
import { useControls } from "leva";

import html from "~/assets/html.svg";
import javascript from "~/assets/javascript.svg";
import nextjs from "~/assets/nextjs.svg";
import redux from "~/assets/redux.svg";
import tailwindcss from "~/assets/tailwindcss.svg";
import threejs from "~/assets/threejs.svg";
import typescript from "~/assets/typescript.svg";
import { COLORS } from "~/utils/store";
import useViewport from "~/utils/useViewport";

export default function TechLogos() {
  const { mobile, width, height } = useViewport();

  const gap = (width * 0.8) / LOGOS.length;

  return (
    <Center position={[0, -height * 0.25, 0]} disableZ disableY>
      {LOGOS.map(({ name, src, scale }, i) => (
        <Ball
          key={name}
          logo={src}
          position={
            mobile
              ? [gap * i, i % 2 ? -gap * 2 : 0, 0]
              : [gap * i, i % 2 ? -gap * 0.5 : 0, 0]
          }
          scale={mobile ? 0.2 : 0.3}
          logoScale={scale}
        />
      ))}
    </Center>
  );
}

function Ball({
  logo,
  logoScale,
  ...props
}: { logo: string; logoScale: number } & JSX.IntrinsicElements["group"]) {
  const { debugOn } = useControls({ debugOn: false });
  const texture = useTexture(logo);

  return (
    <group {...props}>
      <Float speed={4}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color={COLORS.slate100} flatShading />
          <Decal
            map={texture}
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={1.2 * logoScale}
            debug={debugOn}
            flatShading
          />
        </mesh>
      </Float>
    </group>
  );
}

export const LOGOS = [
  { name: "html", src: html, scale: 1 },
  { name: "javascript", src: javascript, scale: 1 },
  { name: "typescript", src: typescript, scale: 1 },
  { name: "nextjs", src: nextjs, scale: 1 },
  { name: "tailwindcss", src: tailwindcss, scale: 1.3 },
  { name: "threejs", src: threejs, scale: 1.3 },
  { name: "redux", src: redux, scale: 1 },
] as const;
