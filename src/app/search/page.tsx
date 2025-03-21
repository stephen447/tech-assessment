import React from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../relayEnvironment";
import SearchResults from "../../components/SearchResults";

const SearchPage: React.FC = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <SearchResults />
  </RelayEnvironmentProvider>
);

export default SearchPage;
