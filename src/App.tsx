import Scene from "~/components/canvas/Scene";
import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Scene />
      {/* <Hero /> */}
      <div id="#" className="h-screen" />
      <div id="about" className="h-screen" />
      <div id="projects" className="h-screen" />
      <div id="contact" className="h-screen" />
      <Layout />
    </>
  );
}
