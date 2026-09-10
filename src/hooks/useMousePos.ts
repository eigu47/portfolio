import { useEffect, useRef, useState } from "react";

type MousePosition = {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
};

const initialPosition: MousePosition = {
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
};

export default function useMousePos({ reactive = true } = {}) {
  const mousePos = useRef(initialPosition);
  const [, rerender] = useState(0);

  useEffect(() => {
    function mouseMove({ clientX, clientY, pageX, pageY }: MouseEvent) {
      mousePos.current = { clientX, clientY, pageX, pageY };
      if (reactive) rerender((value) => value + 1);
    }

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [reactive]);

  return {
    position: mousePos,
    client: { x: mousePos.current.clientX, y: mousePos.current.clientY },
    page: { x: mousePos.current.pageX, y: mousePos.current.pageY },
    relative: {
      x: mousePos.current.pageX / window.innerWidth,
      y: mousePos.current.pageY / window.innerHeight,
    },
    coords: {
      x: (mousePos.current.clientX / window.innerWidth) * 2 - 1,
      y: -(mousePos.current.clientY / window.innerHeight) * 2 + 1,
    },
  };
}
