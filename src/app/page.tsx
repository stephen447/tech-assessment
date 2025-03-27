"use client";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import RelayEnvironment from "./relayEnvironment";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import PopularTokenList from "../components/PopularTokenList";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";

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
      <div className="w-full min-h-[100%] shadow-lg">
        {/* Header */}
        <Header title="Crypto Sphere" />
        <div className="min-h-[77vh]">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="p-4 flex justify-center">
            <label htmlFor="search-input" className="sr-only">
              Search for a cryptocurrency
            </label>
            <input
              type="text"
              placeholder="Search cryptocurrency..."
              className="p-2 rounded-lg text-black w-80 focus:ring-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Enter a cryptocurrency name to search"
            />
            <button
              type="submit"
              role="button"
              aria-label="Click to search for a cryptocurrency"
              className="ml-2 bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition focus:ring-4"
            >
              Search
            </button>
          </form>

          {/* Crypto List */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <LoadingSpinner />
              </div>
            }
          >
            <PopularTokenList />
          </Suspense>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </RelayEnvironmentProvider>
  );
};

export default App;
