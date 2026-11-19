import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggle: () => {}, setTheme: () => {} });

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
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("theme", theme); } catch {}
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0B0B1A" : "#F8FAFC");

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
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
