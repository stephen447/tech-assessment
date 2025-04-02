import { render, screen } from "@testing-library/react";
import { favoritesStore } from "../../FavoritesStore";
import FavoritesPage from "../../app/favourites/page"; // Adjust based on your file structure
// import { useRouter } from "next/router";

// Mock the Next.js `useRouter` hook
// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

jest.mock("../../components/FavouriteItem", () => {
  return {
    __esModule: true,
    default: ({
      token,
      onRemove,
    }: {
      token: { name: string };
      onRemove: () => void;
    }) => (
      <div>
        {token.name}
        <button onClick={onRemove}>Remove</button>
      </div>
    ),
  };
});

jest.mock("../../FavoritesStore", () => ({
  favoritesStore: {
    favorites: [],
    removeFavorite: jest.fn(),
  },
}));

describe("FavoritesPage", () => {
  //   let mockPush: jest.Mock;

  //   beforeEach(() => {
  //     mockPush = jest.fn();
  //     (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  //   });

  // Test 1: Render "No favorites added yet" when the favorites list is empty
  it("renders 'No favorites added yet' when the favorites list is empty", () => {
    favoritesStore.favorites = []; // Ensure favorites is empty
    render(<FavoritesPage />);

    const noFavoritesMessage = screen.getByTestId("no-favorites");
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  // Test 2: Render a list of favorite items when favorites are present
  it("renders a list of favorite items", () => {
    favoritesStore.favorites = [
      { id: "1", name: "Favorite 1" },
      { id: "2", name: "Favorite 2" },
    ];

    render(<FavoritesPage />);

    expect(screen.getByText("Favorite 1")).toBeInTheDocument();
    expect(screen.getByText("Favorite 2")).toBeInTheDocument();
  });

  // Test 3: Calls removeFavorite method when a favorite is removed
  //   it("removes a favorite item when the remove button is clicked", () => {
  //     favoritesStore.favorites = [
  //       { id: "1", name: "Favorite 1" },
  //       { id: "2", name: "Favorite 2" },
  //     ];

  //     render(<FavoritesPage />);

  //     // Assuming each favorite item has a remove button, find the first one
  //     const removeButton = screen.getAllByRole("button")[0]; // Adjust if your button has a specific role
  //     fireEvent.click(removeButton);

  //     // Ensure the removeFavorite method was called with the correct argument
  //     expect(favoritesStore.removeFavorite).toHaveBeenCalledWith("1");
  //   });

  // Test 4: Snapshot test to ensure UI consistency
  it("matches the snapshot when favorites are available", () => {
    favoritesStore.favorites = [
      { id: "1", name: "Favorite 1" },
      { id: "2", name: "Favorite 2" },
    ];

    const { asFragment } = render(<FavoritesPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
