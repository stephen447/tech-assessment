"use client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./relayEnvironment";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import PopularTokenList from "../components/PopularTokenList";
import Header from "../components/Header";

/**
 * Main App component
 */
const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  /**
   * Handles the search form submission
   * @param e Form event
   * @returns void
   * */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <div className="w-full h-[100%] text-white shadow-lg">
        {/* Header */}
        <Header title="Crypto Hub" />
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="p-4 flex justify-center">
          <input
            type="text"
            placeholder="Search cryptocurrency..."
            className="p-2 rounded-lg text-black w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>

        {/* Crypto List */}
        {/* <Suspense> */}
        <PopularTokenList />
        {/* </Suspense> */}
      </div>
    </RelayEnvironmentProvider>
  );
};

export default App;
