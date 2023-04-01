import { useEffect, useState } from "react";

export default function useGetMousePos() {
  const [mousePos, setMousePos] = useState({ pageX: 0, pageY: 0 });

  function mouseMove({ pageX, pageY }: MouseEvent) {
    setMousePos({ pageX, pageY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return {
    ...mousePos,
    x: mousePos.pageX / document.documentElement.clientWidth,
    y: mousePos.pageY / document.documentElement.clientHeight,
  };
}
