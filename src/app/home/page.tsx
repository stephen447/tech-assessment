"use client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../relayEnvironment";
import { useState, useEffect } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

const HomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p>Loading...</p>; // Avoids hydration mismatch
  }
  const query = graphql`
    query pagePopularCryptosQuery {
      ethereum {
        dexTrades(
          options: { limit: 5, desc: "tradeAmount" }
          quoteCurrency: { is: "0xdAC17F958D2ee523a2206206994597C13D831ec7" } # USDT
        ) {
          baseCurrency {
            symbol
            name
            address
          }
          tradeAmount(in: USD)
          trades: count
        }
      }
    }
  `;

  const PopularCryptoList = () => {
    const data = useLazyLoadQuery(query, {});

    return (
      <>
        <div>
          <h1>Bitcoin</h1>
          <p>Price</p>
        </div>

        <h1>Ethereum</h1>
        <h1>XRP</h1>
        <h1>Solana</h1>
        <h1>Cardano</h1>
      </>
    );
  };

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <PopularCryptoList />
    </RelayEnvironmentProvider>
  );
};

export default HomePage;
