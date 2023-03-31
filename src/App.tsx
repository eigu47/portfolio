import Scene from "~/components/canvas/Scene";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Scene />
      <Hero />
      <div className="h-screen" />
      <div className="h-screen" />
      <div className="h-screen" />
      <Layout />
    </>
  );
}
