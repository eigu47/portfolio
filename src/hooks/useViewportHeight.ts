import { useEffect } from "react";

export default function useViewportHeight() {
  useEffect(() => {
    const viewport = window.visualViewport;
    const updateHeight = () => {
      const height = viewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${height}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    viewport?.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      viewport?.removeEventListener("resize", updateHeight);
    };
  }, []);
}
