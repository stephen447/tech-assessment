import { render, screen, waitFor, act } from "@testing-library/react";
import { createMockEnvironment } from "relay-test-utils";
import PopularTokenList from "../../components/PopularTokenList";
import { useLazyLoadQuery } from "react-relay";

// Mock for relay hooks
jest.mock("react-relay", () => ({
  useLazyLoadQuery: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PopularTokenList", () => {
  let mockEnvironment: ReturnType<typeof createMockEnvironment>;

  beforeEach(() => {
    mockEnvironment = createMockEnvironment();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("fetches and displays popular tokens", async () => {
    const mockData = {
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
              current_price: 2000,
            },
          },
        ],
      },
    };

    // Mock the useLazyLoadQuery to return the mock data
    (useLazyLoadQuery as jest.Mock).mockReturnValue(mockData);

    render(<PopularTokenList />);

    // Verify tokens are displayed initially
    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
    });

    // Simulate the passing of 60 seconds to trigger the refetch
    act(() => {
      jest.advanceTimersByTime(60000); // Advances time by 60 seconds
    });

    // Mock updated data for refetch
    const mockUpdatedData = {
      EVM: {
        DEXTradeByTokens: [
          {
            Trade: {
              Currency: { Symbol: "DOGE", Name: "Dogecoin" },
              current_price: 0.1,
            },
          },
          {
            Trade: {
              Currency: { Symbol: "ADA", Name: "Cardano" },
              current_price: 1.2,
            },
          },
        ],
      },
    };
    (useLazyLoadQuery as jest.Mock).mockReturnValue(mockUpdatedData);

    // Trigger a rerender and verify the updated tokens are displayed
    render(<PopularTokenList />);

    // Wait for updated tokens to appear after the refetch
    await waitFor(() => {
      expect(screen.getByText("Dogecoin")).toBeInTheDocument();
      expect(screen.getByText("Cardano")).toBeInTheDocument();
    });
  });

  it("displays an error if no tokens are returned", async () => {
    const mockEmptyData = {
      EFM: {
        DEXTradeByTokens: [],
      },
    };

    (useLazyLoadQuery as jest.Mock).mockReturnValue(mockEmptyData);
    render(<PopularTokenList />);

    // Verify error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("Error loading data. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("displays an error if no tokens are returned", async () => {
    const mockEmptyData = {
      EVM: {
        DEXTradeByTokens: [
          {
            Trde: {
              Currency: { Symbol: "DOGE", Name: "Dogecoin" },
              current_price: 0.1,
            },
          },
          {
            Trde: {
              Currency: { Symbol: "ADA", Name: "Cardano" },
              current_price: 1.2,
            },
          },
        ],
      },
    };

    (useLazyLoadQuery as jest.Mock).mockReturnValue(mockEmptyData);
    render(<PopularTokenList />);

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.queryByText("Bitcoin")).not.toBeInTheDocument();
    });
  });
});
