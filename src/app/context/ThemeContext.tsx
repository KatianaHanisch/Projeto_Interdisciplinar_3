"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const ThemeContext = createContext<any>("");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeValue, setThemeValue] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = sessionStorage.getItem("mode");
      return storedTheme || "light";
    } else {
      return "light";
    }
  });

  const toggleTheme = () => {
    const newTheme = themeValue === "light" ? "dark" : "light";
    setThemeValue(newTheme);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("mode", newTheme);
    }
  };

  const contextValue = {
    themeValue,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
