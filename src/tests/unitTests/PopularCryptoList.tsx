import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import PopularCryptoList from "../../components/PopularCryptoList";
import { useRouter } from "next/navigation";
import { act } from "@testing-library/react";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

afterEach(cleanup);

describe("PopularCryptoList Component", () => {
  it("renders a list of popular cryptocurrencies", async () => {
    const mockEnvironment = createMockEnvironment();

    // Mock the router implementation if necessary
    useRouter.mockImplementation(() => ({
      // Add router methods and properties as needed
    }));

    render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <PopularCryptoList />
      </RelayEnvironmentProvider>
    );

    // Mock the GraphQL response
    act(() => {
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          EVM() {
            return {
              DEXTradeByTokens: [
                {
                  Trade: {
                    Currency: { Symbol: "BTC", Name: "Bitcoin" },
                    current_price: 45000,
                  },
                  volume_usd: 1000000,
                  unique_traders: 500,
                  trade_count: 1000,
                },
                {
                  Trade: {
                    Currency: { Symbol: "ETH", Name: "Ethereum" },
                    current_price: 3000,
                  },
                  volume_usd: 500000,
                  unique_traders: 300,
                  trade_count: 800,
                },
              ],
            };
          },
        })
      );
    });

    screen.debug();

    // Use waitFor to handle asynchronous state updates
    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("BTC")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
      expect(screen.getByText("ETH")).toBeInTheDocument();
    });
  });
});
