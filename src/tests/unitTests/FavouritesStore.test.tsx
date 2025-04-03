import { favoritesStore } from "../../FavoritesStore";
describe("FavoritesStore", () => {
  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "[]"), // Mock returning an empty list
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it("initializes with an empty list if localStorage is empty", () => {
    const store = favoritesStore;
    expect(store.favorites).toEqual([]);
  });

  it("initialises with list from local storage", () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([{ name: "Bitcoin", symbol: "BTC" }])
    );
    const store = favoritesStore;
    expect(store.favorites).toEqual([]);
  });

  it("adds a favorite token correctly", () => {
    const token = { name: "Bitcoin", symbol: "BTC" };
    favoritesStore.addFavorite(token);

    expect(favoritesStore.favorites.length).toBe(1);
    expect(favoritesStore.favorites[0]).toMatchObject(token);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "favorites",
      JSON.stringify(favoritesStore.favorites)
    );
  });

  it("does not add a duplicate favorite", () => {
    const token = { name: "Bitcoin", symbol: "BTC" };
    favoritesStore.addFavorite(token);
    favoritesStore.addFavorite(token); // Try adding again

    expect(favoritesStore.favorites.length).toBe(1); // Should still be 1
  });

  it("removes a favorite token correctly", () => {
    const token = { name: "Bitcoin", symbol: "BTC" };
    favoritesStore.addFavorite(token);
    favoritesStore.removeFavorite(token.name);

    expect(favoritesStore.favorites.length).toBe(0);
    expect(localStorage.setItem).toHaveBeenCalledWith("favorites", "[]");
  });

  it("returns true if a token is a favorite", () => {
    const token = { name: "Ethereum", symbol: "ETH" };
    favoritesStore.addFavorite(token);

    expect(favoritesStore.checkIfFavorite("Ethereum")).toBe(true);
    expect(favoritesStore.checkIfFavorite("Bitcoin")).toBe(false);
  });
});
