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

// Individual item in the favorites list
const FavouriteItem: React.FC<FavouriteItemProps> = ({ token, onRemove }) => {
  return (
    <div className="flex flex-wrap justify-between items-center p-4 min-w-[200px] min-h-[80px] bg-primary_light dark:bg-primary_dark rounded-lg shadow-md border border-border_light dark:border-border_dark w-full md:min-w-[300px]">
      <div className="text-left flex-1 min-w-[150px]">
        <h2 className="text-base md:text-lg font-semibold">{token.name}</h2>
        <p className="text-sm md:text-base">{token.symbol}</p>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(token.id)}
          className="ml-4 p-2 text-xs md:text-sm bg-red-500 text-white rounded-lg hover:bg-red-700 transition min-w-[70px] md:min-w-[90px]"
          aria-label={`Remove ${token.name} from favorites`}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default FavouriteItem;
