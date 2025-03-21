import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import TokenItem from "../../components/TokenItem";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("TokenItem Component", () => {
  const mockTrade = {
    Trade: {
      Currency: {
        Symbol: "BTC",
        Name: "Bitcoin",
      },
      current_price: 45000.25,
    },
  };

  it("renders the token name and symbol correctly", () => {
    render(<TokenItem trade={mockTrade} />);

    expect(screen.getByText("Bitcoin")).toBeInTheDocument();
    expect(screen.getByText("BTC")).toBeInTheDocument();
    expect(screen.getByText("$45000.25")).toBeInTheDocument();
  });

  it("navigates to the correct URL when clicked", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<TokenItem trade={mockTrade} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith("/token/bitcoin?token=btc");
  });

  it("displays 'N/A' if the current price is null", () => {
    const mockTradeNoPrice = {
      ...mockTrade,
      Trade: {
        ...mockTrade.Trade,
        current_price: null,
      },
    };

    render(<TokenItem trade={mockTradeNoPrice} />);
    expect(screen.getByText("$N/A")).toBeInTheDocument();
  });
});
