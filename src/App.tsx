import Hero from "~/components/Hero";
import Layout from "~/components/Layout";
import Navbar from "~/components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="h-screen" />
      <Layout />
    </>
  );
}
