import { render, screen, waitFor } from "@testing-library/react";
import TokenPageContent from "../../components/TokenPageContent";
import { useLazyLoadQuery } from "react-relay";
import { useParams, useSearchParams } from "next/navigation";
import { TokenPageContentQuery } from "../../components/__generated__/TokenPageContentQuery.graphql";
//import TokenGraph from "./TokenGraph";
//import DisplayError from "./DisplayError";

// Mock the necessary imports
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-relay", () => ({
  useLazyLoadQuery: jest.fn(),
}));

jest.mock("../../components/TokenGraph", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked TokenGraph</div>),
}));

jest.mock("../../components/DisplayError", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked DisplayError</div>),
}));

describe("TokenPageContent", () => {
  const mockSearchParams = {
    get: jest.fn(),
  };

  const mockParams = {
    tokenName: "test-token",
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Mock `useParams` to return a valid token name
    (useParams as jest.Mock).mockReturnValue({ tokenName: "Test Token" });

    // Mock `useSearchParams` to return a mock searchParams object
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("tt"), // Simulating no token parameter in the query string
    });
  });

  it("should render the token price graph when data is available", async () => {
    // Mock searchParams and params

    // Mock useLazyLoadQuery response
    const mockData = {
      EVM: {
        DEXTrades: [
          {
            Block: {
              Date: "2025-02-27",
              Time: "2025-02-27T00:00:11Z",
            },
            Trade: {
              Buy: {
                Currency: {
                  Name: "Wrapped Ether",
                  SmartContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                  Symbol: "WETH",
                },
                Price: 2375.5407204197295,
              },
            },
          },
          {
            Block: {
              Date: "2025-02-28",
              Time: "2025-02-28T00:00:11Z",
            },
            Trade: {
              Buy: {
                Currency: {
                  Name: "Wrapped Ether",
                  SmartContract: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                  Symbol: "WETH",
                },
                Price: 6049.809378996922,
              },
            },
          },
        ],
      },
    };

    (useLazyLoadQuery as jest.Mock).mockReturnValue(mockData);
    render(<TokenPageContent />);

    // Verify that the token name is rendered correctly
    expect(screen.getByText("Test Token")).toBeInTheDocument();
  });

  it("should render a message when no price data is available", async () => {
    // Ensure the mock is set before rendering
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTrades: [],
      },
    });

    render(<TokenPageContent />);

    expect(
      screen.getByText("No price data available for TT.")
    ).toBeInTheDocument();
  });

  it("should render a message when no price data is available", async () => {
    // Ensure the mock is set before rendering
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EFM: {
        DEXTrades: [],
      },
    });

    render(<TokenPageContent />);

    expect(screen.getByText("Mocked DisplayError")).toBeInTheDocument();
  });

  it("Testing when no url params are passed", async () => {
    (useParams as jest.Mock).mockReturnValue({});

    // Mock `useSearchParams` to return a mock searchParams object
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTrades: [],
      },
    });

    render(<TokenPageContent />);
    expect(
      screen.getByText("No price data available for WETH.")
    ).toBeInTheDocument();
  });
  it("Testing when no search params are passed", async () => {
    (useParams as jest.Mock).mockReturnValue({});

    // Mock `useSearchParams` to return a mock searchParams object
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(null),
    });
    (useLazyLoadQuery as jest.Mock).mockReturnValue({
      EVM: {
        DEXTrades: [],
      },
    });

    render(<TokenPageContent />);
    expect(
      screen.getByText("No price data available for WETH.")
    ).toBeInTheDocument();
  });
});
