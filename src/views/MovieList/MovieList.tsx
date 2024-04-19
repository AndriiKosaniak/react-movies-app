import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";

import { AddNewMovieButton, Header, MovieForm, SearchInput } from "components";
import { SingleMoviePreview } from "./SingleMoviePreview";
import { addMovie, fetchMovies } from "api";

import type { Movie } from "types";

export const MovieList = () => {
  const {
    isPending,
    error,
    refetch,
    data: movies,
  } = useQuery<Movie[]>({
    queryKey: ["movieList"],
    queryFn: () => fetchMovies(),
  });

  const { mutate: addMutate, isPending: isAddPending } = useMutation({
    mutationFn: (newMovieData: Movie) => addMovie(newMovieData),
    onSuccess: () => refetch(),
  });

  const [titleSearch, setTitleSearch] = useState("");
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);

  const handleAddDialogOpen = () => setIsAddDialogOpened(true);
  const handleAddDialogClose = () => {
    setIsAddDialogOpened(false);
    refetch();
  };

  const handleAddMovieSubmit = (values: Movie) => {
    addMutate(values);
    handleAddDialogClose();
  };

  const handleSearchSubmit = (searchQuery: string) => {
    setTitleSearch(searchQuery);
  };

  if (isPending)
    return (
      <Stack>
        <CircularProgress size={100} />
      </Stack>
    );

  if (error) return <div>Error: {error.message}</div>;

  const filteredMovies = titleSearch
    ? movies.filter((movie) =>
        movie.title
          .toLocaleLowerCase()
          .includes(titleSearch.toLocaleLowerCase())
      )
    : movies;

  return (
    <Box>
      <Header
        center={<SearchInput handleSubmit={handleSearchSubmit} />}
        right={<AddNewMovieButton handleClick={handleAddDialogOpen} />}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginY: "20px",
        }}
      >
        {filteredMovies?.map((movie) => (
          <SingleMoviePreview key={movie.id} movie={movie} />
        ))}
      </Box>
      <Dialog open={isAddDialogOpened} onClose={handleAddDialogClose}>
        <MovieForm handleSubmit={handleAddMovieSubmit} isButtonLoading={isAddPending} />
      </Dialog>
    </Box>
  );
};
