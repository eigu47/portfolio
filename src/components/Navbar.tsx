import { useState } from "react";

import { BiMenuAltRight } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { PiFilePdfDuotone } from "react-icons/pi";

import { siteContent } from "~/content";
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
        className={`border-hairline shadow-chrome fixed top-0 z-10 w-full border-b bg-[rgba(9,9,11,0.7)] backdrop-blur-[12px] backdrop-blur-md duration-200 sm:translate-y-0 sm:transition-none ${
          showMenu ? "" : "-translate-y-[calc(100%-56px)]"
        }`}
      >
        <ul
          className={`container mx-auto my-6 flex flex-col items-center gap-6 px-4 duration-200 sm:translate-y-0 sm:flex-row sm:gap-10 sm:px-6 sm:transition-none lg:px-8 ${
            showMenu ? "" : "-translate-y-[56px]"
          }`}
        >
          {PAGES.map(({ id, href }, i) => (
            <li key={i} className="relative flex gap-10 first:grow">
              <a
                className={`after:bg-accent hover:text-text-hi relative p-3 after:absolute after:right-1/2 after:bottom-1 after:h-[2px] after:w-4/6 after:origin-center after:translate-x-1/2 after:scale-x-0 after:transition hover:after:scale-x-100 ${
                  scrollPage === i ? "after:scale-x-100" : ""
                }`}
                href={href}
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
              >
                {i === 0 ? "hello" : id}
              </a>

              {i === PAGES.length - 1 && (
                <a
                  className="absolute -right-16 bottom-2 sm:relative sm:right-0 sm:-bottom-2"
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

          {showMenu && (
            <li className="flex w-full justify-between px-3 sm:hidden">
              <div className="flex gap-6">
                {siteContent.contacts.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    id={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                  >
                    <Icon className="stroke-text-lo hover:fill-accent focus:fill-accent h-6 w-6 transition hover:-translate-y-0.5 focus:-translate-y-0.5" />
                  </a>
                ))}
              </div>
              <a
                className="hover:text-accent focus:text-accent font-mono text-xs tracking-wider transition hover:-translate-y-0.5 focus:-translate-y-0.5"
                href={siteContent.mail.href}
                aria-label="Email"
                onClick={() => setShowMenu(false)}
              >
                {siteContent.mail.label}
              </a>
            </li>
          )}
        </ul>
      </nav>

      <button
        className="fixed top-0 right-2 z-[12] p-3 sm:hidden"
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
