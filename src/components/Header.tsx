"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import dynamic from "next/dynamic";

interface HeaderProps {
  title: string;
}

// Dynamically import your client component
const ThemeInitializer = dynamic(() => import("./ThemeInitialiser"), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Set initial theme after component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const theme = savedTheme || (prefersDark ? "dark" : "light");

    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode === null) return;
    const isDark = !darkMode;
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark); // Update dark mode state
  };

  // Sync localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode === null) return; // Wait until state is initialized
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header
      className="flex items-center justify-between p-4 bg-background_light dark:bg-background_dark shadow-lg border-b-4 border-border_light dark:border-border_dark  h-[10%]"
      role="banner"
    >
      <ThemeInitializer />
      {/* Logo with aria-label for better accessibility */}
      <Link
        href="/"
        className="flex-shrink-0 focus:ring-4"
        aria-label="Click to go to homepage"
      >
        <Logo size={50} />
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold flex-grow text-center">{title}</h1>

      {/* Empty div removed, flex properties adjusted for alignment */}
      <button
        onClick={toggleDarkMode}
        className="focus:ring-4 border-2 border-border_light dark:border-border_dark rounded-lg p-2 hover:bg-background_light dark:hover:bg-background_dark transition"
      >
        {darkMode ? "Dark" : "Light"} Mode
      </button>
      <div className="w-12"></div>
    </header>
  );
};

export default Header;
