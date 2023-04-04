import { useEffect, useState } from "react";

import { type PAGES } from "~/utils/store";
import { type IndexUnion } from "~/utils/types";

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

  const scrollPos = scrollY / document.documentElement.clientHeight;
  const scrollPage = Math.floor(scrollPos) as IndexUnion<typeof PAGES>;

  return {
    scrollY,
    scrollPos,
    scrollPage,
    scrollDown,
  };
}
