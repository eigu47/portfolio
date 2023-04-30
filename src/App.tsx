import { Suspense } from "react";

import Scene from "~/components/canvas/Scene";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import Navbar from "~/components/Navbar";
import { PAGES } from "~/utils/config";

export default function App() {
  return (
    // <Suspense fallback={<Loading />}>
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
    // </Suspense>
  );
}
