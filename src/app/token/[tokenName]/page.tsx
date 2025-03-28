"use client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "../../relayEnvironment";
import { Suspense } from "react";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Header from "../../../components/Header";
import TokenPageContent from "../../../components/TokenPageContent";

/**
 * TokenPage Component: Wraps content in a Relay provider and error handling.
 */
const TokenPage: React.FC = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Header title="Price History" />
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner />
        </div>
      }
    >
      <TokenPageContent />
    </Suspense>
  </RelayEnvironmentProvider>
);

export default TokenPage;
