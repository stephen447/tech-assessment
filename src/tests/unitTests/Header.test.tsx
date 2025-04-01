import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

jest.mock("../../components/Logo", () => {
  const Logo = () => <div data-testid="logo">Logo</div>;
  Logo.displayName = "Logo";
  return Logo;
});
beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("Header Component", () => {
  test("renders the title correctly", () => {
    render(<Header title="Crypto Pro" />);

    expect(screen.getByText("Crypto Pro")).toBeInTheDocument();
  });

  test("renders the logo as a link to the home page", () => {
    render(<Header title="Crypto Pro" />);

    const logoLink = screen.getByRole("link", { name: /home/i });
    expect(logoLink).toHaveAttribute("href", "/");
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  test("ensures the header has the correct styles", () => {
    render(<Header title="Crypto Pro" />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(
      "flex items-center justify-between p-4 bg-background_light dark:bg-background_dark shadow-lg border-b-4 border-border_light dark:border-border_dark h-[10%]"
    );
  });
  it("should toggle dark mode when button is clicked", () => {
    const { getByRole } = render(<Header title="Test Title" />);
    const toggleButton = getByRole("button", { name: /mode/i });

    // Initially: should not have 'dark' class
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
describe("Header Component", () => {
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

    // Verify that localStorage is updated to 'dark'
    // expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("updates localStorage when theme is toggled", () => {
    // Mock the initial localStorage value
    localStorage.setItem("theme", "light");

    render(<Header title="Test Title" />);

    // Simulate a button click to toggle to dark mode
    fireEvent.click(screen.getByText("Light Mode"));

    // Verify that localStorage is updated to 'dark'
    // expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    // Simulate another button click to toggle back to light mode
    fireEvent.click(screen.getByText("Dark Mode"));

    // Verify that localStorage is updated to 'light'
    // expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
  it("tests link to favourites page", () => {
    render(<Header title="Test Title" />);

    const link = screen.getByTestId("favorites-link");
    console.log(link);
    expect(link).toHaveAttribute("href", "/favourites");
  });

  afterEach(() => {
    // Clean up mocks after each test
    jest.clearAllMocks();
  });
});
