import { render } from "@testing-library/react";
import ThemeInitializer from "../../components/ThemeInitialiser";

beforeEach(() => {
  // Mock localStorage
  const mockLocalStorage = (function () {
    let store: { [key: string]: string } = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });

  // Mock matchMedia
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)", // Simulate dark mode as default
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
});

describe("ThemeInitializer", () => {
  it("applies dark theme from localStorage", () => {
    // Mock localStorage value to "dark"
    localStorage.setItem("theme", "dark");

    render(<ThemeInitializer />);

    // Verify that dark theme is applied by checking the document class
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies light theme from localStorage", () => {
    // Mock localStorage value to "light"
    localStorage.setItem("theme", "light");

    render(<ThemeInitializer />);

    // Verify that light theme is applied by checking the document class
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
