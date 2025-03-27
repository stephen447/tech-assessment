"use client";
import { useRouter } from "next/navigation";
import React from "react";

// Types
type Trade = {
  Trade?: {
    Currency?: {
      Symbol?: string | null;
      Name?: string | null;
    } | null;
    current_price?: number | null;
  } | null;
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
    const name = trade.Trade?.Currency?.Name?.toLowerCase() || "unknown";
    const symbol = trade.Trade?.Currency?.Symbol?.toLowerCase() || "unknown";

    router.push(`/token/${name}?token=${symbol}`);
  };

  return (
    <button
      onClick={handleClick}
      className="p-4 bg-primary_light dark:bg-primary_dark rounded-lg flex justify-between items-center shadow-md border-border_light dark:border-border_dark border-2 w-full text-left hover:bg-background_light dark:hover:bg-background_dark transition focus:ring-4"
      aria-label={`View details for ${trade?.Trade?.Currency?.Name} (${trade?.Trade?.Currency?.Symbol})`}
    >
      <div>
        <h2 className="text-lg font-semibold">
          {trade?.Trade?.Currency?.Name}
        </h2>
        <p className="text-sm text-gray-200">
          {trade?.Trade?.Currency?.Symbol}
        </p>
      </div>
      <p className="text-green-400 font-bold">
        $
        {trade?.Trade?.current_price
          ? trade.Trade.current_price.toFixed(2)
          : "N/A"}
      </p>
    </button>
  );
};

export default TokenItem;
