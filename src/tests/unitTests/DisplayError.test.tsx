import { render, screen } from "@testing-library/react";
import DisplayError from "../../components/DisplayError"; // Adjust the path accordingly
import "@testing-library/jest-dom";

describe("DisplayError Component", () => {
  it("renders the error message correctly", () => {
    render(<DisplayError />);
    // Check if the error message is displayed
    expect(
      screen.getByText("Error loading data. Please try again.")
    ).toBeInTheDocument();
  });
});
