import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { createMockEnvironment } from "relay-test-utils";
import HomePage from "../../app/page";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking the PopularCryptoList to ensure it renders correctly
jest.mock("../../components/PopularCryptoList", () => ({
  __esModule: true,
  default: () => <div>Popular Cryptos Mocked</div>, // Temporary mocked version
}));

describe("HomePage", () => {
  let mockEnvironment: any;
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the homepage with a search bar", () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <HomePage />
      </RelayEnvironmentProvider>
    );

    expect(screen.getByText(/Crypto Hub/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search cryptocurrency/i)
    ).toBeInTheDocument();
  });

  describe("HomePage", () => {
    it("redirects to search page when a search is performed", () => {
      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });

      render(<HomePage />);

      const input = screen.getByPlaceholderText(/Search cryptocurrency/i);
      const button = screen.getByText(/Search/i);

      fireEvent.change(input, { target: { value: "Bitcoin" } });
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/search?query=Bitcoin");
    });
  });
});
