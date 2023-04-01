import { useEffect, useState } from "react";

export default function useGetScrollPos() {
  const [scrollY, setScrollY] = useState(0);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollPos = scrollY / document.documentElement.clientHeight;
  const scrollPage = Math.floor(scrollPos);

  return { scrollY, scrollPos, scrollPage };
}
