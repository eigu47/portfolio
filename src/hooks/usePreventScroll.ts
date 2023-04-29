import { useEffect, useRef } from "react";

export default function usePreventScroll() {
  const prevent = useRef(false);

  function preventScroll(e: TouchEvent) {
    prevent.current && e.preventDefault();
  }

  useEffect(() => {
    document.addEventListener("touchmove", preventScroll, { passive: false });
    return () => document.removeEventListener("touchmove", preventScroll);
  }, []);

  return prevent;
}
