import { render, screen, fireEvent } from "@testing-library/react";
import { favoritesStore } from "../../FavoritesStore";
import FavoritesPage from "../../app/favourites/page";

// Mock the FavouriteItem component to isolate the test from its implementation
jest.mock("../../components/FavouriteItem", () => ({
  __esModule: true,
  default: ({
    token,
    onRemove,
  }: {
    token: { id: string; name: string };
    onRemove: () => void;
  }) => (
    <div>
      <span data-testid={`favorite-${token.id}`}>{token.name}</span>
      <button onClick={onRemove} data-testid={`remove-${token.id}`}>
        Remove
      </button>
    </div>
  ),
}));

// Mock the FavoritesStore
jest.mock("../../FavoritesStore", () => ({
  favoritesStore: {
    favorites: [],
    removeFavorite: jest.fn(),
  },
}));

describe("FavoritesPage", () => {
  beforeEach(() => {
    // Reset the store and mock functions before each test
    favoritesStore.favorites = [];
    // favoritesStore.removeFavorite.mockClear();
  });

  it("renders 'No favorites added yet' when the favorites list is empty", () => {
    render(<FavoritesPage />);

    const noFavoritesMessage = screen.getByTestId("no-favorites");
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it("renders a list of favorite items when favorites exist", () => {
    favoritesStore.favorites = [
      { id: "1", name: "Bitcoin" },
      { id: "2", name: "Ethereum" },
    ];

    render(<FavoritesPage />);

    expect(screen.getByTestId("favorite-1")).toHaveTextContent("Bitcoin");
    expect(screen.getByTestId("favorite-2")).toHaveTextContent("Ethereum");
  });

  it("removes a favorite item when the remove button is clicked", () => {
    favoritesStore.favorites = [
      { id: "1", name: "Bitcoin" },
      { id: "2", name: "Ethereum" },
    ];

    render(<FavoritesPage />);

    // Click remove button for the first favorite
    const removeButton = screen.getByTestId("remove-1");
    fireEvent.click(removeButton);

    // Ensure the removeFavorite method was called with the correct ID
    expect(favoritesStore.removeFavorite).toHaveBeenCalledWith("Bitcoin");
  });
});
