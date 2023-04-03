import { useEffect, useState } from "react";

export default function useScrollPos() {
  const [scrollY, setScrollY] = useState(0);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollPos = scrollY / document.documentElement.clientHeight;

  return {
    scrollY,
    scrollPos,
    scrollPage: Math.floor(scrollY / document.documentElement.clientHeight),
  };
}
