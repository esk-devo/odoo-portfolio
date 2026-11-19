import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Light is the default; the OS setting is ignored. Dark mode = `.dark` class on <html>.
const ThemeContext = createContext({ theme: "light", toggleTheme: () => {}, toggle: () => {}, setTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark" || stored === "light") return stored;
    } catch {}
    return "light";
  });

  const firstRef = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", theme); } catch {}
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#111827" : "#F8FAFC");

    if (!firstRef.current) {
      root.classList.add("theme-switching");
      const t = setTimeout(() => root.classList.remove("theme-switching"), 260);
      return () => clearTimeout(t);
    }
    firstRef.current = false;
  }, [theme]);

  const toggle = () => setThemeState((t) => (t === "dark" ? "light" : "dark"));
  const setTheme = (t) => setThemeState(t === "dark" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: toggle, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
