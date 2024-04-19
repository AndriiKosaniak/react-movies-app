import React, { createContext, useContext, useEffect, useReducer } from "react";

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

const loadStateFromLocalStorage = () => {
  try {
    const storedState = localStorage.getItem("context");
    return storedState ? JSON.parse(storedState) : initialState;
  } catch (error) {
    return initialState;
  }
};

export const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    favouritesReducer,
    loadStateFromLocalStorage()
  );

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(state));
  }, [state]);

  return (
    <MoviesContext.Provider value={{ state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
