"use client";
import { useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import TokenItem from "./TokenItem";
import React, { useEffect, useState, Suspense } from "react";
import { SearchResultsQuery } from "./__generated__/SearchResultsQuery.graphql";
import LoadingSpinner from "./LoadingSpinner";
import DisplayError from "./DisplayError";

// Define the GraphQL query
const searchQuery = graphql`
  query SearchResultsQuery($tokenName: String!, $since: DateTime!) {
    EVM(network: eth) {
      DEXTradeByTokens(
        where: {
          Trade: { Currency: { Name: { includesCaseInsensitive: $tokenName } } }
          Block: { Time: { since: $since } }
        }
        limit: { count: 20 }
        orderBy: { descendingByField: "Trade_current_price_maximum" }
      ) {
        Trade {
          Currency {
            Name
            Symbol
            SmartContract
          }
          current_price: PriceInUSD(maximum: Block_Time)
        }
        volume_usd: sum(of: Trade_Side_AmountInUSD)
        trade_count: count
      }
    }
  }
`;

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const tokenName: string = searchParams.get("query") || "";
  const [isClient, setIsClient] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const todayMidnightUTC = new Date();
  todayMidnightUTC.setUTCHours(0, 0, 0, 0);
  const todayISO = todayMidnightUTC.toISOString();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use the generated type from Relay
  const data = useLazyLoadQuery<SearchResultsQuery>(
    searchQuery,
    { tokenName, since: todayISO }, // Pass today's date
    { fetchPolicy: "store-or-network" }
  );

  // Use effect to implement some error handling
  useEffect(() => {
    if (data?.EVM?.DEXTradeByTokens) {
      setError(false); // Reset error on success
    } else {
      setError(true); // Set error if no data
    }
  }, [data]);

  // Error handling
  if (error) {
    return (
      <div className="w-full h-full p-6 ">
        <DisplayError />
      </div>
    );
  }

  // Loading state
  if (!isClient) {
    return (
      <div className="w-full h-full bg-background_light dark:bg-background_dark shadow-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[77%] bg-background_light dark:bg-background_dark p-4">
      <p className="text-lg text-center text-gray-400">
        Results for {tokenName}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.EVM?.DEXTradeByTokens?.length ? (
          data.EVM.DEXTradeByTokens.map((trade, index) =>
            trade && trade.Trade ? ( // Ensure trade and trade.Trade exist
              <div key={index}>
                <TokenItem trade={trade} />
              </div>
            ) : null
          )
        ) : (
          <p
            className="text-center text-3xl text-gray-500 p-4 rounded-lg ml-auto mr-auto col-span-1 md:col-span-2 lg:col-span-3"
            role="alert"
          >
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

const SearchResultsWithSuspense: React.FC = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <SearchResults />
  </Suspense>
);

export default SearchResultsWithSuspense;
