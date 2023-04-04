import Scene from "~/components/canvas/Scene";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";
import { PAGES } from "~/utils/store";

export default function App() {
  return (
    <>
      <Navbar />
      <Scene />
      {PAGES.map((page, i) => (
        <section key={i} id={page.id} className="h-screen" />
      ))}
      <Layout />
    </>
  );
}
