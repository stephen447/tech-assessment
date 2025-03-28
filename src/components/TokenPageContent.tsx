"use client";
import { useParams, useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import TokenGraph from "./TokenGraph";
import { useMemo, useState, useEffect } from "react";
import { TokenPageContentQuery } from "./__generated__/TokenPageContentQuery.graphql";
import DisplayError from "./DisplayError";

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
 * GraphQL query to fetch token price data for the last month.
 */
const tokenPriceQuery = graphql`
  query TokenPageContentQuery(
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
 * TokenPageContent Component: Fetches and displays token price data.
 */
const TokenPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ tokenName: string }>();
  const { since, till } = useMemo(() => getDateRange(), []);

  // Compute `tokenSymbol` dynamically
  const tokenSymbol = useMemo(() => {
    const symbol = searchParams.get("token") ?? params.tokenName ?? "weth";
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
  const data = useLazyLoadQuery<TokenPageContentQuery>(
    tokenPriceQuery,
    { tokenSymbol, since, till },
    { fetchPolicy: "store-or-network" }
  );
  console.log("data", data);

  // Update state once data is available
  useEffect(() => {
    if (data?.EVM?.DEXTrades) {
      console.log("success");
      setTokenPriceData(data.EVM.DEXTrades);
      setError(false); // Reset error on success
    } else {
      console.log("error");
      setError(true); // Set error if no data
    }
  }, [data]);

  if (error) {
    return (
      <div className="w-full h-full p-6 ">
        <DisplayError />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[77%] p-6 ">
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

export default TokenPageContent;
