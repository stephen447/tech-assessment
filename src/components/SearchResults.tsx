"use client";
import { useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import TokenItem from "./TokenItem";
import React, { useEffect, useState } from "react";
import { SearchResultsQuery } from "./__generated__/SearchResultsQuery.graphql";
import LoadingSpinner from "./LoadingSpinner";

const searchQuery = graphql`
  query SearchResultsQuery($tokenName: String!) {
    EVM(network: eth) {
      DEXTradeByTokens(
        where: {
          Trade: { Currency: { Name: { includesCaseInsensitive: $tokenName } } }
          Block: { Time: { since: "2025-03-01T00:00:00Z" } }
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use the generated type from Relay
  const data = useLazyLoadQuery<SearchResultsQuery>(
    searchQuery,
    { tokenName: tokenName },
    { fetchPolicy: "store-or-network" }
  );

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-900 text-white shadow-lg">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-gray-900 text-white p-4">
      <p className="text-lg text-center text-gray-400">
        Results for "{tokenName}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.EVM?.DEXTradeByTokens?.length ? (
          data.EVM.DEXTradeByTokens.map((trade, index) => (
            <div key={index}>
              <TokenItem trade={trade} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400" role="alert">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
