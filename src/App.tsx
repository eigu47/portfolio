import Scene from "~/components/canvas/Scene";
import { LOGOS } from "~/components/canvas/TechLogos";
import Layout from "~/components/Layout";
import LoadingScreen from "~/components/LoadingScreen";
import Navbar from "~/components/Navbar";
import StaticPage from "~/components/StaticPage";
import { siteContent } from "~/content";
import useViewportHeight from "~/hooks/useViewportHeight";
import { PAGES } from "~/utils/config";

export default function App() {
  const staticMode = shouldUseStaticPage();
  useViewportHeight();

  if (staticMode) return <StaticPage />;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Scene />
        <LoadingScreen />
        <div className="sr-only" aria-label="Portfolio content">
          <h1 className="tracking-[-0.02em]">{siteContent.hero.name}</h1>
          <p>{siteContent.hero.greeting}</p>
          <p>{siteContent.hero.role}</p>
          <p>{siteContent.about}</p>
          <h2 className="tracking-[-0.02em]">About</h2>
          <ul>
            {LOGOS.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>
          <h2 className="tracking-[-0.02em]">Personal projects</h2>
          <ul>
            {siteContent.projects.map((project) => (
              <li key={project.name}>
                <a href={project.url}>{project.name}</a>
              </li>
            ))}
          </ul>
          <h2 className="tracking-[-0.02em]">Contact</h2>
        </div>
        {PAGES.map(({ id }) => (
          <section
            key={id}
            id={id}
            className="w-full snap-start snap-always"
            style={{ height: "var(--app-vh, 100dvh)" }}
          />
        ))}
      </main>
      <footer>
        <Layout />
      </footer>
    </>
  );
}

function shouldUseStaticPage() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const canvas = document.createElement("canvas");
  return !canvas.getContext("webgl") && !canvas.getContext("webgl2");
}
