import type { Movie } from "types";

const baseApiURL = "http://localhost:3000/movies/";

export const fetchMovies = () => fetch(baseApiURL).then((res) => res.json());

export const fetchMovie = (id?: string) =>
  fetch(baseApiURL + id).then((res) => res.json());

export const editMovie = (movie: Movie, id: string) =>
  fetch(baseApiURL + id, {
    method: "PUT",
    body: JSON.stringify(movie),
  }).then((res) => res.json());

export const deleteMovie = (id: string) =>
  fetch(baseApiURL + id, {
    method: "DELETE",
  }).then((res) => res.json());

export const addMovie = (movie: Movie) =>
  fetch(baseApiURL, {
    method: "POST",
    body: JSON.stringify(movie),
  }).then((res) => res.json());
