import { Leva } from "leva";

import Scene from "~/components/canvas/Scene";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  const isDebug =
    new URLSearchParams(window.location.search).get("debug") != null;

  return (
    <>
      <Navbar />
      <Scene />
      <Hero />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <Layout />
      <Leva hidden={!isDebug} />
    </>
  );
}
