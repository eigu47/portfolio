import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import DebugOverlay from "~/components/canvas/DebugOverlay";
import { useDebugStore } from "~/utils/debugStore";

export default function Layout() {
  const debugOn = useDebugStore((state) => state.debugOn);

  if (debugOn) return <DebugOverlay />;
  return (
    <>
      <div className="chrome after:bg-text-lo fixed bottom-0 mx-12 hidden flex-col gap-6 p-4 after:mx-auto after:mt-2 after:block after:h-20 after:w-[1px] sm:flex">
        {SOCIALS.map(({ name, href, icon }) => (
          <a
            key={name}
            id={name}
            href={href}
            className="interactive"
            target="_blank"
            rel="noreferrer"
            aria-label={name}
          >
            {icon({
              className:
                "block h-8 w-8 stroke-text-lo transition hover:fill-accent focus:fill-accent",
            })}
          </a>
        ))}
      </div>

      <div className="chrome after:bg-text-lo fixed right-0 bottom-0 mx-12 hidden p-4 after:mx-auto after:mt-6 after:block after:h-20 after:w-[1px] sm:block">
        <a
          id="email"
          className="interactive hover:text-accent focus:text-accent font-mono text-sm tracking-wider"
          style={{ writingMode: "vertical-rl" }}
          href="mailto:pablo.eiguchi@gmail.com"
        >
          pablo.eiguchi@gmail.com
        </a>
      </div>
    </>
  );
}

const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/eigu47",
    icon: AiFillGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/eiguchipablo/",
    icon: AiFillLinkedin,
  },
];
