import { useEffect } from "react";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import Navbar from "~/components/Navbar";
import { siteContent } from "~/content";

const socials = [
  { name: "Github", href: "https://github.com/eigu47", icon: AiFillGithub },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/eiguchipablo/",
    icon: AiFillLinkedin,
  },
];

export default function StaticPage({ onRetry }: { onRetry?: () => void }) {
  useEffect(() => {
    document.documentElement.classList.add("static-mode");
    return () => document.documentElement.classList.remove("static-mode");
  }, []);

  return (
    <div className="min-h-screen max-[700px]:pb-28">
      <header>
        <Navbar />
      </header>
      <main>
        <section
          className="mx-auto grid min-h-screen max-w-[1160px] grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] gap-[10vw] px-12 pt-[7.5rem] pb-8 max-[700px]:block max-[700px]:min-h-0 max-[700px]:px-5 max-[700px]:pt-28"
          id="about"
          aria-labelledby="static-hero-title"
        >
          <div className="pt-[3vh] max-[700px]:pt-20 max-[700px]:pb-32">
            <p className="text-accent font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase">
              {siteContent.hero.greeting}
            </p>
            <h1
              id="static-hero-title"
              className="text-text-hi mt-5 text-[clamp(3.7rem,9vw,8rem)] leading-[0.85] font-light tracking-[-0.06em] max-[700px]:text-[clamp(3.7rem,17vw,6rem)]"
            >
              {siteContent.hero.name}
            </h1>
            <p className="text-accent mt-6 text-[1.4rem]">
              {siteContent.hero.role}
            </p>
            <p className="mt-10 max-w-[31rem] text-[1.35rem] leading-[1.35] whitespace-pre-line">
              {siteContent.about}
            </p>
          </div>
          <section
            id="projects"
            className="pt-[13vh] max-[700px]:pt-0"
            aria-labelledby="static-projects"
          >
            <div className="mb-8 flex items-baseline gap-6">
              <h2
                id="static-projects"
                className="text-text-hi text-[clamp(1.7rem,3vw,2.8rem)] font-light tracking-[-0.04em]"
              >
                Selected work
              </h2>
            </div>
            <ul className="m-0 list-none p-0">
              {siteContent.projects.map((project, index) => (
                <li
                  className="border-hairline border-t last:border-b"
                  key={project.name}
                >
                  <a
                    className="text-text-lo grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-[1.15rem] no-underline"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span
                      className="text-accent font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <strong className="text-text-hi text-[1.35rem] font-normal">
                      {project.name}
                    </strong>
                    <span
                      className="text-text-faint text-xl"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
      {onRetry && (
        <button className="text-accent mx-auto mb-8 block" onClick={onRetry}>
          Try again
        </button>
      )}
      <footer
        className="border-hairline text-text-faint fixed right-0 bottom-0 left-0 z-10 flex items-center justify-between gap-6 border-t bg-[rgba(9,9,11,0.86)] px-[max(3rem,calc((100vw-1160px)/2))] py-4 font-mono text-[0.7rem] tracking-[0.08em] uppercase backdrop-blur-md max-[700px]:flex-wrap max-[700px]:gap-4 max-[700px]:px-5 max-[700px]:py-[0.9rem]"
        id="contact"
      >
        <div className="flex gap-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
            >
              <Icon className="text-text-lo text-xl" aria-hidden="true" />
            </a>
          ))}
        </div>
        <a
          className="text-accent no-underline"
          href="mailto:pablo.eiguchi@gmail.com"
        >
          pablo.eiguchi@gmail.com
        </a>
      </footer>
    </div>
  );
}
