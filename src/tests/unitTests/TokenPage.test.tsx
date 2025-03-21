import { render, screen, waitFor } from "@testing-library/react";
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import TokenPage from "../../app/token/[tokenName]/page"; // Adjust the path accordingly
import "@testing-library/jest-dom";
import { useParams, useSearchParams } from "next/navigation";

// Mocking the next/navigation hooks to avoid issues with missing context
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock ResizeObserver for Recharts (as it's used by recharts)
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("TokenPage Component", () => {
  let mockEnvironment;

  beforeEach(() => {
    // Create a mock Relay environment before each test
    mockEnvironment = createMockEnvironment();

    // Mock `useParams` to return a valid token name
    (useParams as jest.Mock).mockReturnValue({ tokenName: "ethereum" });

    // Mock `useSearchParams` to return a mock searchParams object
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null), // Simulating no token parameter in the query string
    });
  });

  it("displays loading state while fetching data", async () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <TokenPage />
      </RelayEnvironmentProvider>
    );

    // Check that the loading state message appears
    expect(screen.getByText("Loading token data...")).toBeInTheDocument();
  });

  it("renders token price data when available", async () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <TokenPage />
      </RelayEnvironmentProvider>
    );

    // Mock a GraphQL response with token price data
    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        EVM: () => ({
          DEXTrades: [
            {
              Block: { Time: "2025-03-10", Date: "2025-03-10" },
              Trade: {
                Buy: {
                  Currency: { Symbol: "ETH", Name: "Ethereum" },
                  Price: 3000,
                },
              },
            },
          ],
        }),
      })
    );

    // Wait for the data to load and check if it's rendered
    await waitFor(() => {
      expect(screen.getByText("Ethereum Price History")).toBeInTheDocument();
      expect(screen.getByText("3000")).toBeInTheDocument(); // Expect to see price 3000
    });
  });

  it("renders a message when no price data is available", async () => {
    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <TokenPage />
      </RelayEnvironmentProvider>
    );

    // Mock an empty GraphQL response with no price data
    mockEnvironment.mock.resolveMostRecentOperation((operation) =>
      MockPayloadGenerator.generate(operation, {
        EVM: () => ({
          DEXTrades: [],
        }),
      })
    );

    // Wait for the component to render and check the fallback message
    await waitFor(() => {
      expect(
        screen.getByText("No price data available for WETH.")
      ).toBeInTheDocument();
    });
  });
});
