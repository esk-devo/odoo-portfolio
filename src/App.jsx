import React from "react";
import AmbientBackground from "./components/ui/AmbientBackground";
import CursorGlow from "./components/ui/CursorGlow";
import Marquee from "./components/ui/Marquee";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Modules from "./components/Modules";
import Process from "./components/Process";
import Cases from "./components/Cases";
import FlowDiagram from "./components/FlowDiagram";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { siteData } from "./data/siteData";

export default function App() {
  const marqueeItems = siteData.skills.items;
  return (
    <div className="min-h-screen flex flex-col relative">
      <AmbientBackground />
      <CursorGlow />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Marquee items={marqueeItems} />
          </div>
        </div>
        <About />
        <Experience />
        <Services />
        <Skills />
        <Modules />
        <Process />
        <Cases />
        <FlowDiagram />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
