"use client";

import { useEffect } from "react";

const ThemeInitializer: React.FC = () => {
  useEffect(() => {
    const savedTheme: string | null = localStorage.getItem("theme");
    const prefersDark: boolean = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme: string = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return null;
};

export default ThemeInitializer;
