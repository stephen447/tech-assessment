"use client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../relayEnvironment";
import SearchResults from "../../components/SearchResults";

const SearchPage = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <SearchResults />
  </RelayEnvironmentProvider>
);

export default SearchPage;
