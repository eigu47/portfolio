import { useEffect, useState } from "react";

export default function useGetScrollPos() {
  const [scrollPos, setScrollPos] = useState(0);

  function handleScroll() {
    setScrollPos(window.scrollY / document.documentElement.clientHeight);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPos;
}
