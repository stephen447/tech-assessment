import { render, screen } from "@testing-library/react";
import Logo from "../../components/Logo"; // Adjust path accordingly
import "@testing-library/jest-dom";

describe("Logo Component", () => {
  it("renders the logo with default size", () => {
    render(<Logo />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "50");
    expect(logo).toHaveAttribute("height", "50");
  });

  it("renders the logo with custom size", () => {
    render(<Logo size={100} />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("width", "100");
    expect(logo).toHaveAttribute("height", "100");
  });
});
