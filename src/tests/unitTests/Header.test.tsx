import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

// Mock the logo
jest.mock("../../components/Logo", () => {
  const Logo = () => <div data-testid="logo">Logo</div>;
  Logo.displayName = "Logo";
  return Logo;
});

beforeEach(() => {
  //  reset the localStorage before each test and remove the dark class
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("Header Component", () => {
  test("renders the title correctly", () => {
    render(<Header title="Crypto Sphere" />);
    expect(screen.getByText("Crypto Sphere")).toBeInTheDocument();
  });

  test("renders the logo as a link to the home page", () => {
    render(<Header title="Crypto Sphere" />);
    const logoLink = screen.getByRole("link", { name: /home/i });
    expect(logoLink).toHaveAttribute("href", "/");
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  test("ensures the header has the correct styles", () => {
    render(<Header title="Crypto Sphere" />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(
      "flex items-center justify-between p-3 md:p-4 bg-background_light dark:bg-background_dark shadow-lg border-b-4 border-border_light dark:border-border_dark min-h-[60px] md:min-h-[80px]"
    );
  });

  it("should toggle dark mode when button is clicked", () => {
    //
    const { getByRole } = render(<Header title="Test Title" />);
    const toggleButton = getByRole("button", { name: /mode/i });

    //  It should be light by default
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(toggleButton).toHaveTextContent("Light");

    // Click to activate dark mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(toggleButton).toHaveTextContent("Dark");

    // Click again to deactivate dark mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(toggleButton).toHaveTextContent("Light");
  });
});
describe("Header Component - local storage", () => {
  // Mock localStorage methods before each test
  beforeEach(() => {
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

    // Add mocked localStorage to the window object
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });

  it("sets the theme based on localStorage or prefers-color-scheme", () => {
    // Mock the initial localStorage value
    localStorage.setItem("theme", "dark");

    render(<Header title="Test Title" />);

    // Ensure dark theme is applied
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles between dark and light modes when the button is clicked", () => {
    // Mock the initial localStorage value
    localStorage.setItem("theme", "light");

    render(<Header title="Test Title" />);

    // Initial state should be light mode
    expect(screen.getByText("Light Mode")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Simulate a button click to toggle to dark mode
    fireEvent.click(screen.getByText("Light Mode"));

    // After clicking the button, the theme should change to dark
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("tests link to favourites page", () => {
    render(<Header title="Test Title" />);
    const link = screen.getByTestId("favorites-link");
    expect(link).toHaveAttribute("href", "/favourites");
  });

  afterEach(() => {
    // Clean up mocks after each test
    jest.clearAllMocks();
  });
});
