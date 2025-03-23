"use client";
import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../relayEnvironment";
import SearchResults from "../../components/SearchResults";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const SearchPage: React.FC = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Header title="Search Results" />
    <SearchResults />
    <Footer />
  </RelayEnvironmentProvider>
);

export default SearchPage;
