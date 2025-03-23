import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer"; // Adjust the import path as needed
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the heading 'Follow Me'", () => {
    render(<Footer />);
    expect(screen.getByText("Follow Me")).toBeInTheDocument();
  });

  it("renders three social media links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
  });

  it("contains the correct social media links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Visit my GitHub profile")).toHaveAttribute(
      "href",
      "https://github.com/stephen447"
    );
    expect(screen.getByLabelText("Visit my LinkedIn Profile")).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/stephen-byrne-b4729321b/"
    );
    expect(screen.getByLabelText("Visit my Personal Website")).toHaveAttribute(
      "href",
      "https://stephenbyrne.onrender.com/"
    );
  });
});
