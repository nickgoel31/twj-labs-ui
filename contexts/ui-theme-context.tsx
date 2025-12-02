"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Theme } from "@/twj-lib/types";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  initialTheme = "modern",
  children,
}: {
  initialTheme?: Theme;
  children: React.ReactNode;
}) {
  // --------------------------------------------------
  // ✔ Load from localStorage lazily (React 19 recommended)
  // --------------------------------------------------
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ui-theme") as Theme | null;
      return saved || initialTheme;
    }
    return initialTheme;
  });

  // --------------------------------------------------
  // ✔ Sync theme → HTML + localStorage
  // --------------------------------------------------
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ui-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}

