import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import { AddNewMovieButton, Header, MovieForm } from "components";
import { SingleMoviePreview } from "./SingleMoviePreview";
import { fetchMovies } from "api";

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

  console.log("Movies:", movies);

  const [titleSearch, setTitleSearch] = useState("");
  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);

  const handleAddDialogOpen = () => setIsAddDialogOpened(true);
  const handleAddDialogClose = () => {
    setIsAddDialogOpened(false);
    refetch();
  };

  const SearchInput = () => {
    return (
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(values) => {
          setTitleSearch(values.search);
        }}
      >
        <Form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              marginY: "20px",
            }}
          >
            <Field
              as={TextField}
              variant="outlined"
              placeholder="Search for a movie..."
              name="search"
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>
        </Form>
      </Formik>
    );
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
        center={<SearchInput />}
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
        <MovieForm handleClose={handleAddDialogClose} />
      </Dialog>
    </Box>
  );
};
