import { useState } from "react";

import { useControls } from "leva";

import useGetScrollPos from "~/utils/useGetScrollPos";

const NAVITEMS = [
  {
    name: "Hello",
    href: "#",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Contact",
    href: "#contact",
  },
  {
    name: "Resume",
    href: "#resume",
  },
];

export default function Navbar() {
  const { debugOn } = useControls({ debugOn: false });

  const [showMenu, setShowMenu] = useState(false);
  const scrollPos = useGetScrollPos();

  if (debugOn) return null;

  return (
    <>
      <nav
        className={`fixed top-0 z-10 w-full bg-slate-900/80 shadow-lg backdrop-blur duration-200 sm:translate-y-0 sm:transition-none ${
          showMenu ? "" : "-translate-y-[calc(100%-80px)]"
        }`}
      >
        <ul
          className={`container mx-auto my-6 flex flex-col items-center gap-10 text-slate-300 duration-200 sm:translate-y-0 sm:flex-row sm:transition-none ${
            showMenu ? "" : "-translate-y-[80px]"
          }`}
        >
          {NAVITEMS.map(({ name, href }, i) => (
            <li key={name} className="first:grow">
              <a
                className={`relative p-3 after:absolute after:bottom-1 after:right-1/2 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:bg-emerald-400 after:transition hover:text-white hover:after:scale-x-100 focus:text-white focus:after:scale-x-100 ${
                  scrollPos >= i && scrollPos < i + 1 ? "after:scale-x-100" : ""
                }`}
                href={href}
                onClick={() => setShowMenu(false)}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="fixed right-3 top-3 z-10 p-3 text-slate-300 sm:hidden"
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
