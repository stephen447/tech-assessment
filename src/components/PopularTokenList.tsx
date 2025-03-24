"use client";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useState, useEffect } from "react";
import TokenItem from "./TokenItem";
import LoadingSpinner from "./LoadingSpinner";
import DisplayError from "./DisplayError";
import { PopularTokenListQuery } from "./__generated__/PopularTokenListQuery.graphql";

// GraphQL query to fetch popular cryptocurrencies
const query = graphql`
  query PopularTokenListQuery {
    EVM(network: eth) {
      DEXTradeByTokens(
        where: {
          Block: { Time: { since: "2025-03-16T00:00:00Z" } }
          Trade: { AmountInUSD: { gt: "1000" } }
        }
        orderBy: { descendingByField: "trade_count" }
        limit: { count: 20 }
      ) {
        Trade {
          Currency {
            Symbol
            Name
            SmartContract
          }
          current_price: PriceInUSD(maximum: Block_Time)
        }
        volume_usd: sum(of: Trade_AmountInUSD)
        unique_traders: uniq(of: Trade_Buyer)
        trade_count: count
      }
    }
  }
`;

const PopularTokenList: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [fetchKey, setFetchKey] = useState<number>(0);

  useEffect(() => {
    setIsClient(true);
    const intervalId = setInterval(() => {
      setFetchKey((prevKey) => prevKey + 1);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetching the data - forcing to get from network every time for most accurate data
  const data = useLazyLoadQuery<PopularTokenListQuery>(
    query,
    {},
    { fetchKey, fetchPolicy: "store-or-network" }
  );

  // Display loading spinner while fetching
  if (!isClient) {
    return (
      <div className="w-full h-[77%] bg-gray-900 text-white shadow-lg">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if data exists and render the token list
  if (!data?.EVM?.DEXTradeByTokens) {
    return (
      <div className="h-[77%]">
        <DisplayError />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[77%] bg-gray-900 text-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.EVM?.DEXTradeByTokens?.map((trade, index) => {
          if (!trade || !trade.Trade) return null;

          return (
            <div key={index}>
              <TokenItem trade={trade} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTokenList;
