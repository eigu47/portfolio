import { useEffect, useMemo, useState } from "react";

import { Decal, Float, Html, Icosahedron, useTexture } from "@react-three/drei";
import { type ThreeElements } from "@react-three/fiber";
import { CanvasTexture, SRGBColorSpace } from "three";

import {
  html,
  javascript,
  nextjs,
  react,
  tailwindcss,
  threejs,
  typescript,
} from "~/assets/logos";
import { useDebug } from "~/components/canvas/Debug";
import useViewport from "~/hooks/useViewport";
import { COLORS } from "~/utils/config";
import { useDebugStore } from "~/utils/debugStore";

export default function TechLogos() {
  const { mobile, width, height } = useViewport();

  const gap = (width * 0.8) / LOGOS.length;
  const groupOffset = (-gap * (LOGOS.length - 1)) / 2;

  return (
    <group position={[groupOffset, -height * 0.2, 0]}>
      {LOGOS.map((logo, i) => (
        <FloatingTechLogo
          key={logo.name}
          logo={logo}
          position={
            mobile
              ? [gap * i, i % 2 ? -gap * 2 : 0, 0]
              : [gap * i, i % 2 ? -gap * 0.5 : 0, 0]
          }
          scale={mobile ? 0.2 : 0.3}
          last={i === LOGOS.length - 1}
        />
      ))}
    </group>
  );
}

/**
 * One floating tech logo object (CONTEXT.md): an icosahedron carrying a
 * decal of the technology's logo mark, with a name tooltip on hover/tap.
 */
function FloatingTechLogo({
  logo: { name, src, scale },
  last,
  ...props
}: {
  logo: (typeof LOGOS)[number];
  last: boolean;
} & ThreeElements["group"]) {
  const debugOn = useDebugStore((state) => state.debugOn);
  const debug = useDebug();
  const [showModal, setModal] = useState(false);
  const { mobile } = useViewport();
  const textureSrc = useTexture(src);
  const texture = useMemo(() => {
    const image = textureSrc.image as HTMLImageElement;
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;

    const context = canvas.getContext("2d");
    if (!context) return textureSrc;

    context.drawImage(image, 0, 0);
    const nextTexture = new CanvasTexture(canvas);
    nextTexture.colorSpace = SRGBColorSpace;
    return nextTexture;
  }, [textureSrc]);

  useEffect(() => {
    if (texture !== textureSrc) {
      return () => texture.dispose();
    }
  }, [texture, textureSrc]);

  return (
    <group {...props} {...debug}>
      <Float speed={1.96} rotationIntensity={0.245} floatIntensity={0.245}>
        <Icosahedron
          args={[1, 1]}
          castShadow
          onPointerEnter={() => !mobile && setModal(true)}
          onPointerLeave={() => !mobile && setModal(false)}
          onPointerDown={() => setModal(true)}
          onPointerMissed={() => setModal(false)}
        >
          <meshStandardMaterial color={COLORS.textLo} flatShading />
          <Decal
            map={texture}
            position={[0, 0, 1]}
            rotation={[Math.PI * 2, 0, 0]}
            scale={[scale, scale, 0.8]}
            debug={debugOn}
          >
            <meshBasicMaterial
              map={texture}
              alphaTest={0.01}
              depthTest={false}
              depthWrite={false}
              toneMapped={false}
              transparent
            />
          </Decal>
        </Icosahedron>
      </Float>

      {showModal && (
        <Html position={mobile && last ? [-0.5, -0.5, 0] : [0.5, -0.5, 0]}>
          <div className="rounded-surface border-hairline bg-surface border p-2 text-center">
            <p>{name}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

export const LOGOS = [
  { name: "HTML/CSS", src: html, scale: 1 },
  { name: "Javascript", src: javascript, scale: 1 },
  { name: "Typescript", src: typescript, scale: 1 },
  { name: "Next.js", src: nextjs, scale: 1 },
  { name: "React Native", src: react, scale: 1.2 },
  { name: "Tailwind", src: tailwindcss, scale: 1.3 },
  { name: "Three.js", src: threejs, scale: 1.3 },
] as const;
