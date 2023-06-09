import { useState } from "react";

import { useControls } from "leva";

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
            <li key={i} className="first:grow">
              <a
                className={`relative p-3 capitalize after:absolute after:bottom-1 after:right-1/2 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:bg-emerald-400 after:transition hover:text-white hover:after:scale-x-100 ${
                  scrollPage === i ? "after:scale-x-100" : ""
                }`}
                href={href}
                target={id === "resume" ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
              >
                {i === 0 ? "hello" : id}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="fixed right-2 top-0 z-10 p-3 sm:hidden"
        aria-label={showMenu ? "Close menu" : "Open menu"}
        onClick={() => setShowMenu((state) => !state)}
      >
        <HamburgerIcon
          className={`absolute duration-300 ${
            showMenu
              ? "rotate-[360deg] scale-0 opacity-0"
              : "scale-100 opacity-100"
          }`}
        />
        <CloseIcon
          className={`duration-300 ${
            showMenu
              ? "scale-100 opacity-100"
              : "-rotate-[360deg] scale-0 opacity-0"
          }`}
        />
      </button>
    </>
  );
}

function HamburgerIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="32px"
      width="32px"
      {...props}
    >
      <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
    </svg>
  );
}

function CloseIcon(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="32px"
      width="32px"
      {...props}
    >
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
    </svg>
  );
}
