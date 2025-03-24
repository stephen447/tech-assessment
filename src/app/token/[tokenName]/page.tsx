"use client";
import { useParams, useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../../relayEnvironment";
import TokenGraph from "../../../components/TokenGraph";
import { Suspense, useMemo, useState, useEffect } from "react";
import { pageTokenQuery } from "./__generated__/pageTokenQuery.graphql";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Header from "../../../components/Header";
import DisplayError from "../../../components/DisplayError";

/**
 * GraphQL query to fetch token price data for the last month.
 */
const tokenPriceQuery = graphql`
  query pageTokenQuery(
    $tokenSymbol: String!
    $since: DateTime!
    $till: DateTime!
  ) {
    EVM(network: eth, dataset: combined) {
      DEXTrades(
        limit: { count: 30 }
        where: {
          Trade: {
            Buy: {
              Currency: { Symbol: { includesCaseInsensitive: $tokenSymbol } }
            }
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
 * @returns An object with `since` and `till` keys containing the dates.
 */
const getDateRange = () => {
  const currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0);
  const till = currentTime.toISOString();

  const prevTime = new Date(currentTime);
  prevTime.setMonth(prevTime.getMonth() - 1);
  prevTime.setHours(0, 0, 0, 0);
  const since = prevTime.toISOString();

  return { since, till };
};

/**
 * Helper function to format token names properly.
 * @param tokenName - The token name to format.
 * @returns The formatted token name.
 */
const formatTokenName = (tokenName: string): string => {
  const decoded = decodeURIComponent(tokenName);
  return decoded
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * TokenPageContent Component: Fetches and displays token price data.
 */
const TokenPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ tokenName: string }>();
  const { since, till } = useMemo(() => getDateRange(), []);

  // Compute `tokenSymbol` dynamically
  const tokenSymbol = useMemo(() => {
    const symbol = searchParams.get("token") ?? params.tokenName;
    return symbol ? decodeURIComponent(symbol).toUpperCase() : "WETH";
  }, [searchParams, params.tokenName]);

  const tokenName = useMemo(
    () => formatTokenName(params.tokenName),
    [params.tokenName]
  );

  const [error, setError] = useState<boolean>(false);
  //eslint-disable-next-line
  const [tokenPriceData, setTokenPriceData] = useState<any>([]);

  // Fetch token price data with lazy load query
  const data = useLazyLoadQuery<pageTokenQuery>(
    tokenPriceQuery,
    { tokenSymbol, since, till },
    { fetchPolicy: "store-or-network" }
  );

  // Update state once data is available
  useEffect(() => {
    if (data?.EVM?.DEXTrades) {
      setTokenPriceData(data.EVM.DEXTrades);
      setError(false); // Reset error on success
    } else {
      setError(true); // Set error if no data
    }
  }, [data]);

  if (error) {
    return (
      <div className="w-full h-full p-6 text-white">
        <DisplayError />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[77%] p-6 text-white">
      <h1 className="text-4xl font-bold text-center">{tokenName}</h1>
      {tokenPriceData.length > 0 ? (
        <TokenGraph prices={tokenPriceData} />
      ) : (
        <p className="text-center text-gray-400 mt-4" role="alert">
          No price data available for {tokenSymbol}.
        </p>
      )}
    </div>
  );
};

/**
 * TokenPage Component: Wraps content in a Relay provider and error handling.
 */
const TokenPage: React.FC = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      }
    >
      <Header title="Price History" />
      <TokenPageContent />
    </Suspense>
  </RelayEnvironmentProvider>
);

export default TokenPage;
