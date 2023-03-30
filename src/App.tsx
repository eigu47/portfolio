import { useControls, Leva } from "leva";

import Scene from "~/components/canvas/Scene";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  const { debugOn } = useControls("Debug", { debugOn: false });
  const isDebug =
    process.env.NODE_ENV === "development" ||
    new URLSearchParams(window.location.search).get("debug") != null;

  return (
    <>
      {!debugOn && <Navbar />}
      <Scene />
      <Hero />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      {!debugOn && <Layout />}
      <Leva hidden={!isDebug} />
    </>
  );
}
