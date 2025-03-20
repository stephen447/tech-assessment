"use client";
import { useSearchParams } from "next/navigation";
import { graphql, useLazyLoadQuery } from "react-relay";
import TokenItem from "./TokenItem";
import { useEffect, useState } from "react";

const searchQuery = graphql`
  query SearchResultsQuery($coinName: String!) {
    EVM(network: eth) {
      DEXTradeByTokens(
        where: {
          Trade: { Currency: { Name: { includesCaseInsensitive: $coinName } } }
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

const SearchResults = () => {
  const searchParams = useSearchParams();
  const coinName = searchParams.get("query");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = useLazyLoadQuery(
    searchQuery,
    { coinName },
    { fetchPolicy: "store-or-network" }
  );

  if (!isClient) {
    return (
      <p className="flex items-center text-4xl h-[100%] text-center justify-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold text-center">Search Results</h2>
      <p className="text-lg text-center text-gray-400">
        Results for "{coinName}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.EVM?.DEXTradeByTokens?.length > 0 ? (
          data.EVM.DEXTradeByTokens.map((trade, index) => (
            <div key={index}>
              <TokenItem trade={trade} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
