import { render, screen, waitFor } from "@testing-library/react";
import TokenPage from "../../app/token/[tokenName]/page";

// Mocking the RelayEnvironmentProvider and necessary components
jest.mock("react-relay/hooks", () => ({
  RelayEnvironmentProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("../../components/LoadingSpinner", () => () => <div>Loading...</div>);
jest.mock("../../components/TokenPageContent", () => () => (
  <div>Token Content</div>
));

describe("TokenPage", () => {
  it("should show the loading spinner while loading the content", async () => {
    render(<TokenPage />);
    // Wait for the component to finish loading
    await waitFor(() => screen.getByText("Token Content"));

    // Ensure that the token content is rendered after loading
    expect(screen.getByText("Token Content")).toBeInTheDocument();
  });

  it("should render TokenPageContent after loading", async () => {
    render(<TokenPage />);

    // After Suspense resolves, check that TokenPageContent is rendered
    await waitFor(() => screen.getByText("Token Content"));
    expect(screen.getByText("Token Content")).toBeInTheDocument();
  });
});
