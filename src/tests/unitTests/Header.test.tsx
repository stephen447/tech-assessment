import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

jest.mock("../../components/Logo", () => {
  const Logo = () => <div data-testid="logo">Logo</div>;
  Logo.displayName = "Logo";
  return Logo;
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
      "flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg border-b-4 border-white"
    );
  });
});
