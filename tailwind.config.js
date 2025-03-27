/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // For Next.js App Router
    "./pages/**/*.{js,jsx,ts,tsx}", // For Next.js Pages Router
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary_light: "#838383",
        secondary_light: "#838383",
        background_light: "#CCCCCC",
        border_light: "#111827",
        text_light: "#111827",

        primary_dark: "#1f2937",
        secondary_dark: "#6B7280",
        background_dark: "#111827",
        border_dark: "#FFFFFF",
        text_dark: "#FFFFFF",

        accent: "#10B981",
      },
    },
  },
  plugins: [],
};
