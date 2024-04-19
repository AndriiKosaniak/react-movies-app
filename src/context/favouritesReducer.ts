import type { Movie } from "types";

export type FavouritesContextState = {
  favouriteMovies: Movie[];
};

export const initialState: FavouritesContextState = {
  favouriteMovies: [],
};

export const favouritesReducer = (
  state: FavouritesContextState,
  action: { type: string; payload: Movie }
) => {
  if (action.type === "toggleFavouriteMovie") {
    const movieIndex = state.favouriteMovies.findIndex(
      (movie) => movie.id === action.payload.id
    );
    if (movieIndex !== -1) {
      // Movie already exists in favourites, remove it
      return {
        ...state,
        favouriteMovies: [
          ...state.favouriteMovies.slice(0, movieIndex),
          ...state.favouriteMovies.slice(movieIndex + 1),
        ],
      };
    } else {
      // Movie does not exist in favourites, add it
      return {
        ...state,
        favouriteMovies: [...state.favouriteMovies, action.payload],
      };
    }
  }
  return state;
};
