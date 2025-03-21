"use client";
import { graphql, useLazyLoadQuery } from "react-relay";
import { useState, useEffect } from "react";
import TokenItem from "../components/TokenItem";

// GraphQL query to fetch popular cryptocurrencies
const query = graphql`
  query PopularCryptoListQuery {
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

// Trade type
type Trade = {
  Trade: {
    Currency: { Symbol: string; Name: string };
    current_price: number;
  };
};

const PopularCryptoList: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    setIsClient(true);

    // Set up interval to refetch data every 1 minute (60000 ms)
    const intervalId = setInterval(() => {
      setFetchKey((prevKey) => prevKey + 1);
    }, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetching the data - forcing to get from network every time for most accurate data
  const data = useLazyLoadQuery(
    query,
    {},
    { fetchKey, fetchPolicy: "network-only" }
  );

  if (!isClient) {
    return (
      <p className="flex items-center text-4xl h-[100%] text-center justify-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 text-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.EVM?.DEXTradeByTokens?.map((trade: Trade, index: number) => (
          <div key={index}>
            <TokenItem trade={trade} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCryptoList;
