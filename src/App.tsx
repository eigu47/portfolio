import Scene from "~/components/canvas/Scene";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";
import { PAGES } from "~/utils/config";

export default function App() {
  return (
    <>
      <Navbar />
      <Scene />
      {PAGES.map(({ id }) => (
        <section
          key={id}
          id={id}
          className="w-full snap-start snap-always"
          style={{ height: `${document.documentElement.clientHeight}px` }}
        />
      ))}
      <Layout />
    </>
  );
}
