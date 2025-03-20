"use client";

import { useParams, useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../../relayEnvironment";
import TokenGraph from "../../../components/TokenGraph";
import { useEffect, useState } from "react";

/**
 * GraphQL query to fetch token price data.
 */
const tokenPriceQuery = graphql`
  query pageTokenQuery($symbol: String!, $since: DateTime!, $till: DateTime!) {
    EVM(network: eth, dataset: combined) {
      DEXTrades(
        limit: { count: 10 }
        where: {
          Trade: {
            Buy: { Currency: { Symbol: { includesCaseInsensitive: $symbol } } }
          }
          Block: { Time: { since: $since, till: $till } }
        }
        orderBy: { ascendingByField: "Block_Time" }
        limitBy: { by: Block_Date, count: 1 }
      ) {
        Block {
          Time
          Date
        }
        Trade {
          Buy {
            Currency {
              Symbol
              Name
              SmartContract
            }
            Price
          }
        }
      }
    }
  }
`;

/**
 * Helper function to get the current date and previous month's date in ISO format.
 */
const getDateRange = () => {
  const currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0); // Reset time to midnight UTC

  const till = currentTime.toISOString();

  const prevTime = new Date(currentTime);
  prevTime.setMonth(prevTime.getMonth() - 1); // Move back 1 month
  prevTime.setHours(0, 0, 0, 0); // Reset time to midnight UTC

  return { since: prevTime.toISOString(), till };
};

/**
 * TokenPageContent Component: Fetches and displays token price data.
 */
const TokenPageContent: React.FC = () => {
  const params = useParams<{ tokenName: string }>();
  const searchParams = useSearchParams();

  const [symbol, setSymbol] = useState<string | null>("weth");
  const [isClient, setIsClient] = useState(false); // Track if running on client

  // Effect to update symbol from URL parameters
  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
    let urlSymbol = searchParams.get("token") ?? params.tokenName;
    if (urlSymbol) {
      urlSymbol = decodeURIComponent(urlSymbol)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setSymbol(urlSymbol);
    }
  }, [params.tokenName, searchParams]);

  // Get date range (since last month to today at midnight UTC)
  const { since, till } = getDateRange();

  // Fetch token price data
  const data = useLazyLoadQuery(
    tokenPriceQuery,
    { symbol, since, till },
    { fetchPolicy: "store-or-network" }
  );

  const prices = data?.EVM?.DEXTrades ?? [];

  if (!isClient || !symbol) {
    return (
      <p className="text-center text-gray-400 mt-4">Loading token data...</p>
    );
  }

  return (
    <div className="w-full h-full p-6 text-white">
      <h1 className="text-4xl font-bold text-center">{symbol} Price History</h1>
      {prices.length > 0 ? (
        <TokenGraph prices={prices} />
      ) : (
        <p className="text-center text-gray-400 mt-4">
          No price data available for {symbol}.
        </p>
      )}
    </div>
  );
};

/**
 * TokenPage Component: Wraps content in a Relay provider.
 */
const TokenPage: React.FC = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <TokenPageContent />
  </RelayEnvironmentProvider>
);

export default TokenPage;
