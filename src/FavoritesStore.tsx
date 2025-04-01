import { makeAutoObservable } from "mobx";

interface Token {
  id: string;
  name: string;
  symbol: string;
}

class FavoritesStore {
  favorites: Token[] = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
    },
  ];

  constructor() {
    makeAutoObservable(this);
    console.log("Favorites store initialized", this.favorites);
  }

  addFavorite(token: Token) {
    if (!this.favorites.find((t) => t.id === token.id)) {
      this.favorites.push(token);
    }
  }

  removeFavorite(id: string) {
    console.log("Removing favorite with id: ", id);
    this.favorites = this.favorites.filter((token) => token.id !== id);
  }

  checkIfFavorite(name: string) {
    return this.favorites.some((token) => token.name === name);
  }
}

export const favoritesStore = new FavoritesStore();
