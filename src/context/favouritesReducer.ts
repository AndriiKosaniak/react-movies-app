import type { Movie } from "types";
import xorBy from "lodash/xorBy";

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
  //
  if (action.type === "toggleFavouriteMovie") {
    const { favouriteMovies } = state;
    const { payload } = action;

    const updatedFavouriteMovies = xorBy(favouriteMovies, [payload], "id");
    return {
      ...state,
      favouriteMovies: updatedFavouriteMovies,
    };
  }
  return state;
};
