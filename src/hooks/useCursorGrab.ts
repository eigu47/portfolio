import { useState } from "react";

import { useCursor } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";

import usePreventScroll from "~/hooks/usePreventScroll";

export default function useCursorGrab() {
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const prevent = usePreventScroll();

  useCursor(hover, "grab");
  useCursor(drag, "grabbing", hover ? "grab" : "auto");

  const bind = useGesture({
    onPointerEnter: () => setHover(true),
    onPointerLeave: () => setHover(false),
    onDrag: ({ down }) => {
      prevent.current = down;
      setDrag(down);
    },
  });

  return bind() as JSX.IntrinsicElements["group"];
}
