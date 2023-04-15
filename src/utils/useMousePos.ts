import { useEffect, useState } from "react";

export default function useMousePos() {
  const [mousePos, setMousePos] = useState({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
  });

  function mouseMove({ clientX, clientY, pageX, pageY }: MouseEvent) {
    setMousePos({ clientX, clientY, pageX, pageY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return {
    client: { x: mousePos.clientX, y: mousePos.clientY },
    page: { x: mousePos.pageX, y: mousePos.pageY },
    relative: {
      x: mousePos.pageX / window.innerWidth,
      y: mousePos.pageY / window.innerHeight,
    },
    coords: {
      x: (mousePos.clientX / window.innerWidth) * 2 - 1,
      y: -(mousePos.clientY / window.innerHeight) * 2 + 1,
    },
  };
}
