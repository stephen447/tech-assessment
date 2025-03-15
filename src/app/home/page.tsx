"use client";
import { useState } from "react";
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../relayEnvironment";

// Graph ql query for fetch th eprice of the 'popular' cryptos
const query = graphql`
  query pageCountriesQuery {
    countries {
      name
      capital
    }
  }
`;

const PopularCryptoList = () => {
  const data = useLazyLoadQuery(query, {});
  console.log();
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

const HomePage = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <PopularCryptoList />
  </RelayEnvironmentProvider>
);

export default HomePage;
