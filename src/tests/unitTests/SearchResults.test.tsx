import { render, screen } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { useLazyLoadQuery } from "react-relay";
import SearchResults from "../../components/SearchResults";
import RelayEnvironment from "../../app/relayEnvironment";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("react-relay", () => ({
  graphql: jest.fn(),
  useLazyLoadQuery: jest.fn(),
}));

jest.mock("../../components/TokenItem", () => ({ trade }) => (
  <div data-testid="token-item">{trade?.Trade?.Currency?.Name}</div>
));

describe("SearchResults Component", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn(() => "Ethereum"),
    });
  });

  //   test("renders the loading state before data is fetched", () => {
  //     (useLazyLoadQuery as jest.Mock).mockReturnValue(null);

  //     render(
  //       <RelayEnvironmentProvider environment={RelayEnvironment}>
  //         <SearchResults />
  //       </RelayEnvironmentProvider>
  //     );

  //     expect(screen.getByText("Loading...")).toBeInTheDocument();
  //   });

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

    expect(screen.getByText('Results for "Ethereum"')).toBeInTheDocument();
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
});
