import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { useLazyLoadQuery } from "react-relay";
import SearchResults from "../../components/SearchResults";
import RelayEnvironment from "../../app/relayEnvironment";

type Currency = {
  Symbol: string;
  Name: string | null | undefined;
};

type Trade = {
  Currency: Currency | null | undefined;
  current_price: number;
};

// Define the type for the `TokenItem` component props
type TokenItemProps = {
  trade?: {
    Trade: Trade;
  };
};

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("react-relay", () => ({
  graphql: jest.fn(),
  useLazyLoadQuery: jest.fn(),
}));

jest.mock("../../components/TokenItem", () => {
  const TokenItem = ({ trade }: TokenItemProps) => (
    <div data-testid="token-item">
      {trade?.Trade?.Currency?.Name || "No Data"}
    </div>
  );
  TokenItem.displayName = "TokenItem";
  return TokenItem;
});

describe("SearchResults Component", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => "Ethereum"),
    });
  });

  test("renders search results correctly", () => {
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTradeByTokens: [
          {
            Trade: {
              Currency: { Name: "Ethereum", Symbol: "ETH" },
              current_price: 3500,
            },
            volume_usd: 1000000,
            trade_count: 500,
          },
        ],
      },
    });

    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchResults />
      </RelayEnvironmentProvider>
    );

    expect(screen.getByText("Results for Ethereum")).toBeInTheDocument();
    expect(screen.getByTestId("token-item")).toHaveTextContent("Ethereum");
  });

  test("renders 'No results' if query returns nothing", () => {
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: { DEXTradeByTokens: [] },
    });

    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchResults />
      </RelayEnvironmentProvider>
    );

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });
  test("no search parameters passed", () => {
    // Mock useSearchParams to return empty value for search query
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => ""),
    });

    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchResults />
      </RelayEnvironmentProvider>
    );

    // Check if "No results found" is displayed when there are no search parameters
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  test("Error message displays correctly when data not passed correctly", () => {
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTraByTokens: [
          {
            Trade: {
              Currency: { Name: "Ethereum", Symbol: "ETH" },
              current_price: 3500,
            },
            volume_usd: 1000000,
            trade_count: 500,
          },
        ],
      },
    });

    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchResults />
      </RelayEnvironmentProvider>
    );

    expect(
      screen.getByText("Error loading data. Please try again.")
    ).toBeInTheDocument();
  });

  test("Nothing displayed when there is an error with the data", () => {
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTradeByTokens: [
          {
            Tre: {
              Currency: { Name: "Ethereum", Symbol: "ETH" },
              current_price: 3500,
            },
            volume_usd: 1000000,
            trade_count: 500,
          },
        ],
      },
    });

    render(
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SearchResults />
      </RelayEnvironmentProvider>
    );

    expect(screen.queryByText("Ethereum")).not.toBeInTheDocument();
  });
});
