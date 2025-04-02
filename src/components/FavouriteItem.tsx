"use client";
import React from "react";

// Types
type Token = {
  id: string;
  name: string;
  symbol: string;
};

interface FavouriteItemProps {
  token: Token;
  onRemove?: (id: string) => void; // Optional remove function
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({ token, onRemove }) => {
  /**
   * Redirects to the token page when the token item is clicked
   */
  const handleClick = () => {
    // router.push(`/token/${token.id}`);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-primary_light dark:bg-primary_dark rounded-lg shadow-md border border-border_light dark:border-border_dark w-full">
      <button
        onClick={handleClick}
        className="text-left flex-1"
        aria-label={`View details for ${token.name}`}
      >
        <h2 className="text-lg font-semibold">{token.name}</h2>
        <p className="text-sm text-gray-200">{token.symbol}</p>
      </button>

      {onRemove && (
        <button
          onClick={() => onRemove(token.id)}
          className="ml-4 p-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
          aria-label={`Remove ${token.name} from favorites`}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default FavouriteItem;
