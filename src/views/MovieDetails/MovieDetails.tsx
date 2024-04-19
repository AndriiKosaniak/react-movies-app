import React, { useState } from "react";
import { useParams, redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useMovieContext } from "context";
import { fetchMovie } from "api";
import { routes } from "router";
import {
  Header,
  DeleteMovieConfirmation,
  MovieForm,
  Rating,
  AddNewMovieButton,
  RedirectButton,
} from "components";

import type { Movie } from "types";

export const MovieDetails = () => {
  const { id } = useParams();

  const {
    isPending,
    error,
    refetch,
    data: movie,
  } = useQuery<Movie>({
    queryKey: ["movieList"],
    queryFn: () => fetchMovie(id),
  });

  const { state, dispatch } = useMovieContext();

  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const handleAddDialogOpen = () => setIsAddDialogOpened(true);
  const handleAddDialogClose = () => {
    setIsAddDialogOpened(false);
    refetch();
  };

  const handleEditDialogOpen = () => setIsEditDialogOpened(true);
  const handleEditDialogClose = () => {
    setIsEditDialogOpened(false);
    refetch();
  };
  const handleDeleteDialogOpen = () => setIsDeleteDialogOpened(true);
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpened(false);
    redirect(routes.movies);
  };

  if (isPending)
    return (
      <Stack>
        <CircularProgress size={100} />
      </Stack>
    );

  if (error) return <div>Error: {error.message}</div>;

  const isMovieAlreaddyAddedToFavourites = state.favouriteMovies.find(
    (favourite) => favourite.id === movie.id
  );

  return (
    <Box>
      <Header
        left={
          <RedirectButton route={routes.movies} buttonText="Go to all movies" />
        }
        right={<AddNewMovieButton handleClick={handleAddDialogOpen} />}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          gap: "5px",
        }}
      >
        <Box component="img" src={movie.image} />
        <Typography variant="h3">{movie.title}</Typography>
        <Rating ratingScore={movie.rating} />
        <Typography>{movie.description}</Typography>
        <Box display="flex" gap="5px">
          <Typography>Director:</Typography>
          <Typography fontWeight="bold">{movie.director}</Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap="5px">
          <Typography>Actors:</Typography>
          {movie.actors.map((actor) => (
            <Typography key={actor} fontWeight="bold">
              {actor};
            </Typography>
          ))}
        </Box>
        <Box>
          <IconButton
            onClick={() =>
              dispatch({ type: "toggleFavouriteMovie", payload: movie })
            }
          >
            {isMovieAlreaddyAddedToFavourites ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={handleEditDialogOpen}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Dialog open={isAddDialogOpened} onClose={handleAddDialogClose}>
        <MovieForm handleClose={handleAddDialogClose} />
      </Dialog>
      <Dialog open={isEditDialogOpened} onClose={handleEditDialogClose}>
        <MovieForm initialValues={movie} handleClose={handleEditDialogClose} />
      </Dialog>
      <Dialog open={isDeleteDialogOpened} onClose={handleDeleteDialogClose}>
        <DeleteMovieConfirmation
          movieId={movie.id}
          handleClose={handleDeleteDialogClose}
        />
      </Dialog>
    </Box>
  );
};
