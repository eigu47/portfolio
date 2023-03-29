export default function Layout() {
  return (
    <>
      <div className="fixed bottom-0 mx-12 hidden after:mx-auto after:mt-6 after:block after:h-20 after:w-[1px] after:bg-slate-300 sm:block">
        <a
          className="block h-6 w-6 stroke-slate-300 transition hover:-translate-y-0.5 hover:stroke-emerald-400 focus:-translate-y-0.5 focus:stroke-emerald-400"
          href="https://github.com/eigu47"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
        </a>
      </div>

      <div className="fixed bottom-0 right-0 mx-12 hidden after:mx-auto after:mt-6 after:block after:h-20 after:w-[1px] after:bg-slate-300 sm:block">
        <a
          className="font-mono text-sm tracking-wider text-slate-300 transition hover:-translate-y-0.5 hover:text-emerald-400 focus:-translate-y-0.5 focus:text-emerald-400"
          style={{ writingMode: "vertical-rl" }}
          href="mailto:pablo.eiguchi@gmail.com"
        >
          pablo.eiguchi@gmail.com
        </a>
      </div>
    </>
  );
}

function GithubIcon() {
  return (
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
  );
}
