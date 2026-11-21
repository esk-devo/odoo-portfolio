import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ClientsMarquee from "./components/ClientsMarquee";
import About from "./components/About";
import Experience from "./components/Experience";
import Expertise from "./components/Expertise";
import HowItConnects from "./components/HowItConnects";
import Plan from "./components/Plan";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

// How long the preloader stays when replayed by the theme toggle.
// The first load on refresh uses the default MIN_MS from Preloader.jsx.
const THEME_REPLAY_MIN_MS = 1200;

// Calls onChange whenever the "dark" class on <html> is added or removed,
// so no change is needed in ThemeToggle.jsx or Navbar.jsx.
function useThemeChange(onChange) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const root = document.documentElement;
    let wasDark = root.classList.contains("dark");

    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains("dark");
      if (isDark === wasDark) return;
      wasDark = isDark;
      onChangeRef.current();
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  // Always true on first render: the preloader shows on every refresh.
  const [showPreloader, setShowPreloader] = useState(true);
  const [runId, setRunId] = useState(0);
  const [minMs, setMinMs] = useState(undefined); // undefined = Preloader default

  const hidePreloader = useCallback(() => setShowPreloader(false), []);

  // New key = fresh mount = the animation restarts from the beginning.
  const replayPreloader = useCallback(() => {
    setMinMs(THEME_REPLAY_MIN_MS);
    setRunId((n) => n + 1);
    setShowPreloader(true);
  }, []);

  useThemeChange(replayPreloader);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatePresence>
        {showPreloader && (
          <Preloader key={`preloader-${runId}`} minMs={minMs} onDone={hidePreloader} />
        )}
      </AnimatePresence>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ClientsMarquee />
        <About />
        <Experience />
        <Expertise />
        <HowItConnects />
        <Plan />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}