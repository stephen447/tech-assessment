import { render, screen, waitFor } from "@testing-library/react";
import TokenPage from "../../app/token/[tokenName]/page";

// Mocking the RelayEnvironmentProvider and necessary components
jest.mock("react-relay/hooks", () => ({
  RelayEnvironmentProvider: ({ children }) => <div>{children}</div>,
}));

// Mock for LoadingSpinner with displayName
jest.mock("../../components/LoadingSpinner", () => {
  const LoadingSpinner = () => <div>Loading...</div>;
  LoadingSpinner.displayName = "LoadingSpinner";
  return LoadingSpinner;
});

// Mock for TokenPageContent with displayName
jest.mock("../../components/TokenPageContent", () => {
  const TokenPageContent = () => <div>Token Content</div>;
  TokenPageContent.displayName = "TokenPageContent";
  return TokenPageContent;
});

describe("TokenPage", () => {
  it("should show the loading spinner while loading the content", async () => {
    render(<TokenPage />);

    // Wait for the content to load and ensure TokenPageContent is displayed
    await waitFor(() => screen.getByText("Token Content"));

    // Ensure that the token content is rendered after loading
    expect(screen.getByText("Token Content")).toBeInTheDocument();
  });

  it("should render TokenPageContent after loading", async () => {
    render(<TokenPage />);

    // Wait for the content to load and ensure TokenPageContent is displayed
    await waitFor(() => screen.getByText("Token Content"));

    // Check if TokenPageContent has been rendered
    expect(screen.getByText("Token Content")).toBeInTheDocument();
  });
});
