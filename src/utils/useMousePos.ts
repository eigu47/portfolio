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
    ...mousePos,
    posX: mousePos.pageX / document.documentElement.clientWidth,
    posY: mousePos.pageY / document.documentElement.clientHeight,
  };
}
