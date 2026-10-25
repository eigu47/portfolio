import { useEffect } from "react";

import ContactLinks from "~/components/ContactLinks";
import Navbar from "~/components/Navbar";
import { siteContent } from "~/content";

export default function StaticPage() {
  useEffect(() => {
    document.documentElement.classList.add("static-mode");
    return () => document.documentElement.classList.remove("static-mode");
  }, []);

  return (
    <div className="min-h-dvh pb-28 sm:pb-0">
      <header>
        <Navbar />
      </header>
      <main>
        <section
          className="mx-auto block max-w-6xl grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] gap-[10vw] px-5 pt-28 pb-8 sm:grid sm:min-h-dvh sm:px-12 sm:pt-28"
          id="about"
          aria-labelledby="static-hero-title"
        >
          <div className="min-h-[75vh] pt-[5vh] sm:min-h-auto">
            <p className="text-accent text-sx font-mono font-medium tracking-widest uppercase">
              {siteContent.hero.greeting}
            </p>
            <h1
              id="static-hero-title"
              className="text-text-hi mt-5 text-[clamp(3.75rem,17vw,6rem)] leading-[0.85] font-light tracking-tighter sm:text-[clamp(3.75rem,10vw,8rem)]"
            >
              {siteContent.hero.name}
            </h1>
            <p className="text-accent mt-6 text-2xl">{siteContent.hero.role}</p>
            <p className="mt-10 text-xl leading-[1.35] whitespace-pre-line">
              {siteContent.about}
            </p>
            <p className="text-text-lo mt-6 font-mono text-sm tracking-wide">
              the scene is off. the work is here.
            </p>
          </div>
          <section
            id="projects"
            className="pt-0 sm:pt-[10vh]"
            aria-labelledby="static-projects"
          >
            <div className="mb-8 flex items-baseline gap-6">
              <h2
                id="static-projects"
                className="text-text-hi text-[clamp(1.875rem,3vw,3rem)] font-light tracking-tighter"
              >
                selected work
              </h2>
            </div>
            <ul className="list-none">
              {siteContent.projects.map((project, index) => (
                <li
                  className="border-hairline border-t last:border-b"
                  key={project.name}
                >
                  <a
                    className="text-text-lo grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 no-underline"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span
                      className="text-accent font-mono text-xs font-medium tracking-widest uppercase"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <strong className="text-text-hi text-xl font-normal">
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
      <footer
        className="border-hairline text-text-faint fixed right-0 bottom-0 left-0 z-10 gap-4 border-t bg-overlay-strong p-4 font-mono text-xs tracking-widest uppercase backdrop-blur-md"
        id="contact"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <div className="flex gap-4">
            <ContactLinks
              iconClassName="text-text-lo text-xl"
              includeIds={false}
              iconAriaHidden
            />
          </div>
          <a className="text-accent no-underline" href={siteContent.mail.href}>
            {siteContent.mail.label}
          </a>
        </div>
      </footer>
    </div>
  );
}
