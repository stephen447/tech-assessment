"use client";
import React from "react";
import { favoritesStore } from "../../FavoritesStore";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import FavouriteItem from "../../components/FavouriteItem";

// This page displays the user's favorite tokens
const FavoritesPage: React.FC = observer(() => {
  // Check if the favorites list is empty, if so, display no favorites
  if (favoritesStore.favorites.length === 0) {
    return (
      <div>
        <Header title="Favourites" />
        <p className="text-3xl p-4 text-center" data-testid="no-favorites">
          No favorites added yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header title="Favourites" />
      <div>
        {favoritesStore.favorites.map((token) => (
          <div key={token.id} className="flex justify-between items-center m-2">
            <FavouriteItem
              token={token}
              onRemove={() => favoritesStore.removeFavorite(token.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default FavoritesPage;
