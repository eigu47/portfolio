import { useControls } from "leva";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import DebugOverlay from "~/components/canvas/DebugOverlay";

export default function Layout() {
  const { debugOn } = useControls({ debugOn: false });

  if (debugOn) return <DebugOverlay />;
  return (
    <>
      <div className="fixed bottom-0 mx-12 hidden flex-col gap-6 after:mx-auto after:mt-2 after:block after:h-20 after:w-[1px] after:bg-slate-300 sm:flex">
        {SOCIALS.map(({ name, href, icon }) => (
          <a key={name} href={href} target="_blank" rel="noreferrer">
            {icon({
              className:
                "block h-8 w-8 stroke-slate-300 transition hover:-translate-y-0.5 hover:fill-emerald-400 focus:-translate-y-0.5 focus:fill-emerald-400",
            })}
          </a>
        ))}
      </div>

      <div className="fixed bottom-0 right-0 mx-12 hidden after:mx-auto after:mt-6 after:block after:h-20 after:w-[1px] after:bg-slate-300 sm:block">
        <a
          className="font-mono text-sm tracking-wider transition hover:-translate-y-0.5 hover:text-emerald-400 focus:-translate-y-0.5 focus:text-emerald-400"
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
