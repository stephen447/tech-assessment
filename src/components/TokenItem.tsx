"use client";
import { useRouter } from "next/navigation";
import React from "react";

// Types
type Trade = {
  Trade: {
    Currency: {
      Symbol: string;
      Name: string;
    };
    current_price: number | null;
  };
};

interface TokenItemProps {
  trade: Trade;
}

const TokenItem: React.FC<TokenItemProps> = ({ trade }) => {
  const router = useRouter();

  /**
   * Redirects to the token page when the token item is clicked
   */
  const handleClick = () => {
    router.push(
      `/token/${trade.Trade.Currency.Name.toLowerCase()}?token=${trade.Trade.Currency.Symbol.toLowerCase()}`
    );
  };

  return (
    <button
      onClick={handleClick}
      className="p-4 bg-gray-800 rounded-lg flex justify-between items-center shadow-md border-white border-2 w-full text-left hover:bg-gray-700 transition"
    >
      <div>
        <h2 className="text-lg font-semibold">{trade.Trade.Currency.Name}</h2>
        <p className="text-sm text-gray-400">{trade.Trade.Currency.Symbol}</p>
      </div>
      <p className="text-green-400 font-bold">
        $
        {trade.Trade.current_price
          ? trade.Trade.current_price.toFixed(2)
          : "N/A"}
      </p>
    </button>
  );
};

export default TokenItem;
