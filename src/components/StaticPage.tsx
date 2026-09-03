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
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mx-auto max-w-5xl px-6 pt-32 pb-24">
        <section aria-labelledby="static-hero" className="min-h-[70vh]">
          <h1 id="static-hero" className="text-text-hi text-6xl font-medium">
            {siteContent.hero.name}
          </h1>
          <p className="text-accent mt-4 text-2xl">{siteContent.hero.role}</p>
          <p className="mt-8 text-2xl">{siteContent.about}</p>
        </section>
        <section aria-labelledby="static-projects" className="py-24">
          <h2 id="static-projects" className="text-text-hi text-3xl">
            Personal projects
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteContent.projects.map((project) => (
              <li key={project.name}>
                <a
                  className="interactive glass rounded-surface border-hairline hover:text-accent block border p-6 text-xl"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="static-contact" className="py-24">
          <h2 id="static-contact" className="text-text-hi text-3xl">
            Contact
          </h2>
          <a
            className="text-accent mt-8 inline-block text-xl"
            href="mailto:pablo.eiguchi@gmail.com"
          >
            pablo.eiguchi@gmail.com
          </a>
        </section>
      </main>
      {onRetry && (
        <button className="text-accent mx-auto mb-12 block" onClick={onRetry}>
          Try again
        </button>
      )}
      <footer className="container mx-auto flex gap-6 px-6 pb-12">
        {socials.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
          >
            <Icon className="h-8 w-8" />
          </a>
        ))}
      </footer>
    </>
  );
}
