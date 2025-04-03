"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react-lite";

interface HeaderProps {
  title: string;
}

// Dynamically import your client component
const ThemeInitializer = dynamic(() => import("./ThemeInitialiser"), {
  ssr: false,
});

const Header: React.FC<HeaderProps> = observer(({ title }) => {
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
    setDarkMode(isDark);
  };

  // Sync localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode === null) return; // Wait until state is initialized
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header
      className="flex items-center justify-between p-3 md:p-4 bg-background_light dark:bg-background_dark shadow-lg border-b-4 border-border_light dark:border-border_dark min-h-[60px] md:min-h-[80px]"
      role="banner"
    >
      <ThemeInitializer />

      {/* Logo */}
      <Link
        href="/"
        className="flex-shrink-0 focus:ring-4"
        aria-label="Click to go to homepage"
      >
        <Logo size={50} />
      </Link>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold flex-grow text-center">
        {title}
      </h1>

      {/* Favorites Button */}
      <Link
        href="/favourites"
        aria-label="View favorites"
        className="relative w-fit px-3"
        role="button"
        data-testid="favorites-link"
      >
        <FontAwesomeIcon
          icon={solidHeart}
          className="text-2xl md:text-3xl text-red-500 hover:text-red-700 transition cursor-pointer"
        />
      </Link>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="focus:ring-4 border-2 border-border_light dark:border-border_dark rounded-lg p-2 md:p-3 hover:bg-background_light dark:hover:bg-background_dark transition"
      >
        {darkMode ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
});

export default Header;
