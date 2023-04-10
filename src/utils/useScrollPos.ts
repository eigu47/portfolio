import { useEffect, useState } from "react";

import { type PAGES } from "~/utils/store";
import { type ValidIndex } from "~/utils/types";

export default function useScrollPos() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDown, setScrollDown] = useState(true);

  function handleScroll() {
    setScrollY((prev) => {
      setScrollDown(window.scrollY > prev);
      return window.scrollY;
    });
  }

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollPos = scrollY / window.innerHeight;
  // TODO - make it dynamic based on pages
  const scrollPage = Math.floor(scrollPos) as ValidIndex<typeof PAGES>;

  return {
    scrollY,
    scrollPos,
    scrollPage,
    scrollDown,
  };
}
