import { render, screen } from "@testing-library/react";
import HomePage from "../../app/home/page";
import "@testing-library/jest-dom"; // Import to extend Jest matchers

// List of tests for the home page component
// Test if the component renders correctly
test("renders home page", () => {
  render(<HomePage />);
  const header = screen.getByText(/test/i);
  console.log(header); // Logs the header element for inspection
  expect(header).toBeInTheDocument();
});
// Test that 5 most common cryptos are displayed - will have to mock the graph ql api call to bit query
// Test that the load more button works correctly
// Test that the search bar works correctly
