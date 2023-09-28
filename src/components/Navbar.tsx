import { useState } from "react";

import { useControls } from "leva";
import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { PiFilePdfDuotone } from "react-icons/pi";

import useScrollPos from "~/hooks/useScrollPos";
import { PAGES } from "~/utils/config";

export default function Navbar() {
  const { debugOn } = useControls({ debugOn: false });
  const [showMenu, setShowMenu] = useState(false);
  const { scrollPage } = useScrollPos();

  if (debugOn) return null;
  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-full bg-slate-900/80 shadow-lg backdrop-blur duration-200 sm:translate-y-0 sm:transition-none ${
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
                className={`relative p-3 capitalize after:absolute after:bottom-1 after:right-1/2 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:bg-emerald-400 after:transition hover:text-white hover:after:scale-x-100 ${
                  scrollPage === i ? "after:scale-x-100" : ""
                }`}
                href={href}
                // target={id === "resume" ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
              >
                {i === 0 ? "hello" : id}
              </a>

              {i === PAGES.length - 1 && (
                <button className="absolute -right-16 bottom-3 sm:relative sm:inset-0">
                  <a href="/resume" target="_blank">
                    <PiFilePdfDuotone className="h-8 w-8 duration-200 hover:fill-emerald-400" />
                  </a>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="fixed right-2 top-0 z-10 p-3 sm:hidden"
        aria-label={showMenu ? "Close menu" : "Open menu"}
        onClick={() => setShowMenu((state) => !state)}
      >
        <BiMenuAltRight
          className={`absolute h-8 w-8 duration-300 ${
            showMenu
              ? "rotate-[360deg] scale-0 opacity-0"
              : "scale-100 opacity-100"
          }`}
        />
        <IoClose
          className={`h-8 w-8 duration-300 ${
            showMenu
              ? "scale-100 opacity-100"
              : "-rotate-[360deg] scale-0 opacity-0"
          }`}
        />
      </button>
    </>
  );
}
