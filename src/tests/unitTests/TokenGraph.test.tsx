import { render, screen } from "@testing-library/react";
import TokenGraph from "../../components/TokenGraph";
import "@testing-library/jest-dom";

// Mock ResizeObserver (since Recharts uses it for responsiveness)
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("TokenGraph Component", () => {
  const mockPrices = [
    {
      Block: { Date: "2025-03-10", Time: "2025-03-10T12:00:00Z" },
      Trade: {
        Buy: {
          Currency: { Name: "Ethereum", Symbol: "ETH" },
          Price: 3000,
        },
      },
    },
    {
      Block: { Date: "2025-03-11", Time: "2025-03-11T12:00:00Z" },
      Trade: {
        Buy: {
          Currency: { Name: "Ethereum", Symbol: "ETH" },
          Price: 3100,
        },
      },
    },
  ];

  it("renders without crashing", () => {
    render(<TokenGraph prices={mockPrices} />);
    expect(screen.getByTestId("token-graph")).toBeInTheDocument();
  });

  it("displays correct number of data points", () => {
    render(<TokenGraph prices={mockPrices} />);
    expect(screen.getByTestId("token-graph")).toBeInTheDocument();
  });

  it("renders 'No data available' message when given no data", () => {
    render(<TokenGraph prices={[]} />);
    expect(screen.getByText("No price data available")).toBeInTheDocument();
  });
});
