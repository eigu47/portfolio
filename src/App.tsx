import Scene from "~/components/canvas/Scene";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";
import { PAGES } from "~/utils/store";

export default function App() {
  return (
    <>
      <Navbar />
      <Scene />
      {PAGES.map(({ id }, i) => (
        <section
          key={i}
          id={id}
          className="h-screen"
          // style={{ backgroundColor: i % 2 ? "black" : "white" }}
        />
      ))}
      <Layout />
    </>
  );
}
