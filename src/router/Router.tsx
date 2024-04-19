import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { MovieList, MovieDetails } from "views";
import { routes } from "./routes";

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.movies} element={<MovieList />} />
      <Route path={routes.movie} element={<MovieDetails />} />

      <Route path="*" element={<Navigate to={routes.movies} />} />
    </Routes>
  );
};
