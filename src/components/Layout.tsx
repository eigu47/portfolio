import { useControls } from "leva";

import DebugOverlay from "~/components/canvas/DebugOverlay";

export default function Layout() {
  const { debugOn } = useControls({ debugOn: false });

  if (debugOn) return <DebugOverlay />;

  return (
    <>
      <div className="fixed bottom-0 mx-12 hidden flex-col gap-6 after:mx-auto after:mt-2 after:block after:h-20 after:w-[1px] after:bg-slate-300 sm:flex">
        {SOCIALS.map(({ name, href, icon }) => (
          <a
            key={name}
            className="block h-6 w-6 stroke-slate-300 transition hover:-translate-y-0.5 hover:stroke-emerald-400 focus:-translate-y-0.5 focus:stroke-emerald-400"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>GitHub</title>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pablo-mart%C3%ADn-eiguchi-34b874239/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>LinkedIn</title>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
];
