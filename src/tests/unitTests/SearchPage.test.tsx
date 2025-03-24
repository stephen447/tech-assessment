import { render, screen } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../../app/relayEnvironment";
import SearchPage from "../../app/search/page";

// Mocking SearchResults component
jest.mock("../../app/search/page", () => {
  const MockSearchPage = () => (
    <div data-testid="search-results">SearchResults</div>
  );
  MockSearchPage.displayName = "SearchPage"; // Set the display name here
  return MockSearchPage;
});

describe("SearchPage Component", () => {
  test("renders the SearchResults component inside Relay provider", () => {
    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchPage />
      </RelayEnvironmentProvider>
    );

    expect(screen.getByTestId("search-results")).toBeInTheDocument();
  });
});
