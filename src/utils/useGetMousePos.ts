import { useEffect, useRef } from "react";

export default function useGetMousePos() {
  const mousePos = useRef({ x: 0, y: 0 });

  function mouseMove(e: MouseEvent) {
    mousePos.current = {
      x: e.pageX / document.documentElement.clientWidth,
      y: e.pageY / document.documentElement.clientHeight,
    };
  }

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return mousePos;
}

// const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
// function mouseMove(e: MouseEvent) {
//   setMousePos({
//     x: e.pageX / document.documentElement.clientWidth,
//     y: e.pageY / document.documentElement.clientHeight,
//   });
// }
