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
