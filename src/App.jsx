import React from "react";
import AmbientBackground from "./components/ui/AmbientBackground";
import CursorGlow from "./components/ui/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientsMarquee from "./components/ClientsMarquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Expertise from "./components/Expertise";
import HowItConnects from "./components/HowItConnects";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientsMarquee />
        <About />
        <Experience />
        <Expertise />
        <HowItConnects />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
