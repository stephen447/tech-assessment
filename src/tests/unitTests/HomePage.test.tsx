import { render, screen, fireEvent } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { createMockEnvironment } from "relay-test-utils";
import HomePage from "../../app/page";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking the PopularCryptoList to ensure it renders correctly (Separate unit tests for this component)
jest.mock("../../components/PopularTokenList", () => ({
  __esModule: true,
  default: () => <div>Popular Cryptos Mocked</div>,
}));

describe("Home Page unit tests", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("Renders Homepage with the Header and search bar", () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <HomePage />
      </RelayEnvironmentProvider>
    );

    expect(screen.getByText(/Crypto Sphere/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search cryptocurrency/i)
    ).toBeInTheDocument();
  });

  it("redirects to search page when a search is performed", () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <HomePage />
      </RelayEnvironmentProvider>
    );

    const input = screen.getByPlaceholderText(/Search cryptocurrency/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Bitcoin" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/search?query=Bitcoin");
  });
});
