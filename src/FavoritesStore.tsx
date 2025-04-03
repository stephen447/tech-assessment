"use client";
import { makeAutoObservable } from "mobx";

interface Token {
  id: string;
  name: string;
  symbol: string;
}

class FavoritesStore {
  favorites: Token[] = [];

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    }
  }

  addFavorite(token: { name: string; symbol: string }) {
    if (!this.favorites.find((t) => t.name === token.name)) {
      //  Get highest id and increment by 1
      const id = Math.max(...this.favorites.map((t) => parseInt(t.id))) + 1;
      this.favorites.push({ id: id.toString(), ...token });
    }
    // Update the local storage
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  removeFavorite(name: string) {
    console.log("Removing favorite with id: ", name);
    this.favorites = this.favorites.filter((token) => token.name !== name);
    // Update the local storage
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  checkIfFavorite(name: string) {
    return this.favorites.some((token) => token.name === name);
  }
}

export const favoritesStore = new FavoritesStore();
