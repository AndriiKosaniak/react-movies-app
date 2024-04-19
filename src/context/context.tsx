import React, { createContext, useContext, useReducer } from "react";

import { favouritesReducer, initialState } from "./favouritesReducer";

import type { ReactNode, Dispatch } from "react";

import type { Movie } from "types";
import type { FavouritesContextState } from "./favouritesReducer";

type MoviesContextType = {
  state: FavouritesContextState;
  dispatch: Dispatch<{ type: string; payload: Movie }>;
};

export const MoviesContext = createContext<MoviesContextType>({
  state: initialState,
  dispatch: () => null,
});

export const useMovieContext = () => useContext(MoviesContext);

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

// connect store with localStorage
// write toggle instead of add/remove methods
