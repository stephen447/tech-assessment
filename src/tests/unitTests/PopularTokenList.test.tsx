import { render, screen, waitFor, act } from "@testing-library/react";
import { RelayEnvironmentProvider } from "react-relay";
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils";
import PopularTokenList from "../../components/PopularTokenList"; // Adjust path as needed

jest.mock("../../components/PopularTokenList", () => {
  return ({ trade }: { trade?: any }) => (
    <div data-testid="token-item">
      {trade?.Trade?.Currency?.Name || "No Data"}
    </div>
  );
});

describe("PopularTokenList", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderComponent = () => {
    return render(
      <RelayEnvironmentProvider environment={mockEnvironment}>
        <PopularTokenList />
      </RelayEnvironmentProvider>
    );
  };

  it("renders loading state initially", () => {
    renderComponent();
    expect(screen.getByRole("status")).toBeInTheDocument(); // Assuming LoadingSpinner has role="status"
  });

  it("fetches and displays popular tokens", async () => {
    renderComponent();

    // Mock GraphQL response
    await act(async () => {
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          EVM: {
            DEXTradeByTokens: [
              {
                Trade: {
                  Currency: { Symbol: "BTC", Name: "Bitcoin" },
                  current_price: 50000,
                },
              },
              {
                Trade: {
                  Currency: { Symbol: "ETH", Name: "Ethereum" },
                  current_price: 3000,
                },
              },
            ],
          },
        })
      );
    });

    // Verify tokens are displayed
    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
    });
  });

  it("re-fetches data every minute", async () => {
    renderComponent();

    // Mock the first response
    await act(async () => {
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          EVM: {
            DEXTradeByTokens: [
              {
                Trade: {
                  Currency: { Symbol: "BTC", Name: "Bitcoin" },
                  current_price: 50000,
                },
              },
            ],
          },
        })
      );
    });

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();

    // Fast-forward 60 seconds (1 minute)
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    // Mock the second response
    await act(async () => {
      mockEnvironment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, {
          EVM: {
            DEXTradeByTokens: [
              {
                Trade: {
                  Currency: { Symbol: "SOL", Name: "Solana" },
                  current_price: 120,
                },
              },
            ],
          },
        })
      );
    });

    // Verify the UI updates with new data
    await waitFor(() => {
      expect(screen.getByText("Solana")).toBeInTheDocument();
    });
  });
});
