import { useRef, useState } from "react";

import { Image, Text, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import { DoubleSide, FrontSide, Vector3 } from "three";

import { calibre400 } from "~/assets/fonts";
import {
  playpool,
  countryQuiz,
  traveler,
  keyboardSniper,
} from "~/assets/images";
import { COLORS } from "~/utils/store";
import usePreventScroll from "~/utils/usePreventScroll";
import useViewport from "~/utils/useViewport";
import { useDebug } from "~/components/canvas/Debug";

const rotation = new Vector3();
const lerpFrom = new Vector3();

export default function Carousel(props: JSX.IntrinsicElements["group"]) {
  const {
    width,
    height,
    mobile,
    size: { width: sizeWidth },
  } = useViewport();
  const carouselRef = useRef<THREE.Group>(null);
  const preventScroll = usePreventScroll();
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  useCursor(!drag && hover, "grab");
  useCursor(drag, "grabbing", hover ? "grab" : "auto");
  const { ...debug } = useDebug();

  const size = mobile ? width * 0.35 : width * 0.15;

  const bind = useDrag(({ offset: [x], down }) => {
    setDrag(down);
    preventScroll.current = down;

    rotation.set(0, Math.PI * (x / sizeWidth) * 2, 0);
  });

  useFrame((_, delta) => {
    if (!carouselRef.current) return null;

    carouselRef.current.rotation.setFromVector3(
      lerpFrom.lerp(rotation, delta * 8)
    );
  });

  return (
    <group {...props}>
      <Text
        position={[0, size * 0.5 + height * 0.15, 0]}
        fontSize={0.35}
        font={calibre400}
        color={COLORS.slate300}
        material-side={DoubleSide}
      >
        Personal projects
      </Text>

      <group
        ref={carouselRef}
        {...(bind() as JSX.IntrinsicElements["group"])}
        {...debug}
      >
        {PROJECTS.map((project, i) => (
          <Project
            key={i}
            project={project}
            size={size}
            rotation={[0, ((Math.PI * 2) / PROJECTS.length) * i, 0]}
            setHoverCarousel={setHover}
            drag={drag}
          />
        ))}
      </group>
    </group>
  );
}

const ASPECT_RATIO = 1.4;

function Project({
  project: { name, url, image },
  size,
  setHoverCarousel,
  drag,
  ...props
}: {
  project: (typeof PROJECTS)[number];
  size: number;
  setHoverCarousel: (hover: boolean) => void;
  drag: boolean;
} & JSX.IntrinsicElements["group"]) {
  const { height } = useViewport();
  const [hover, setHover] = useState(false);
  useCursor(!drag && hover);

  return (
    <group {...props}>
      <group position={[0, 0, (PROJECTS.length * size) / 4]}>
        <Image
          // @ts-expect-error - material.side is not typed
          ref={(ref) => ref && (ref.material.side = DoubleSide)}
          url={image}
          scale={[size * ASPECT_RATIO, size]}
          onPointerEnter={() => setHoverCarousel(true)}
          onPointerLeave={() => setHoverCarousel(false)}
        />

        <Text
          scale={0.25}
          position={[0, -size * 0.5 - height * 0.05, 0]}
          onClick={() => window.open(url, "_blank")}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          material-side={FrontSide}
          material-color={hover ? COLORS.emerald500 : COLORS.slate100}
          font={calibre400}
        >
          {name}
        </Text>
      </group>
    </group>
  );
}

const PROJECTS = [
  {
    name: "Playpool",
    url: "https://playpool.vercel.app/",
    image: playpool,
  },
  {
    name: "Country Quiz",
    url: "https://country-quiz-eigu.vercel.app/",
    image: countryQuiz,
  },
  {
    name: "Traveler",
    url: "https://traveler-eigu.vercel.app/",
    image: traveler,
  },
  {
    name: "Keyboard Sniper",
    url: "https://keyboard-sniper.web.app/",
    image: keyboardSniper,
  },
] as const;
