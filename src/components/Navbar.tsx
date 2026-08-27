import { useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { PiFilePdfDuotone } from "react-icons/pi";

import useScrollPos from "~/hooks/useScrollPos";
import { PAGES } from "~/utils/config";
import { useDebugStore } from "~/utils/debugStore";

export default function Navbar() {
  const debugOn = useDebugStore((state) => state.debugOn);
  const [showMenu, setShowMenu] = useState(false);
  const { scrollPage } = useScrollPos();

  if (debugOn) return null;
  return (
    <>
      <nav
        className={`chrome fixed top-0 z-10 w-full duration-200 sm:translate-y-0 sm:transition-none ${
          showMenu ? "" : "-translate-y-[calc(100%-56px)]"
        }`}
      >
        <ul
          className={`container mx-auto my-6 flex flex-col items-center gap-10 duration-200 sm:translate-y-0 sm:flex-row sm:transition-none ${
            showMenu ? "" : "-translate-y-[56px]"
          }`}
        >
          {PAGES.map(({ id, href }, i) => (
            <li key={i} className="relative flex gap-10 first:grow">
              <a
                className={`interactive after:bg-accent hover:text-text-hi relative p-3 capitalize after:absolute after:right-1/2 after:bottom-1 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:transition hover:after:scale-x-100 ${
                  scrollPage === i ? "after:scale-x-100" : ""
                }`}
                href={href}
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
                // id={id || "home"}
              >
                {i === 0 ? "hello" : id}
              </a>

              {i === PAGES.length - 1 && (
                <a
                  className="interactive absolute -right-16 bottom-2 sm:relative sm:right-0 sm:-bottom-2"
                  href="/resume"
                  target="_blank"
                  aria-label="Resume"
                  id="pdf"
                >
                  <PiFilePdfDuotone className="hover:fill-accent h-8 w-8 duration-200" />
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="interactive fixed top-0 right-2 z-10 p-3 sm:hidden"
        aria-label={showMenu ? "Close menu" : "Open menu"}
        onClick={() => setShowMenu((state) => !state)}
      >
        <BiMenuAltRight
          className={`absolute h-8 w-8 duration-300 ${
            showMenu
              ? "scale-0 rotate-[360deg] opacity-0"
              : "scale-100 opacity-100"
          }`}
        />
        <IoClose
          className={`h-8 w-8 duration-300 ${
            showMenu
              ? "scale-100 opacity-100"
              : "scale-0 -rotate-[360deg] opacity-0"
          }`}
        />
      </button>
    </>
  );
}
