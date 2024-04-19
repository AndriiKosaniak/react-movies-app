import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
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
import { fetchMovie, editMovie, addMovie, deleteMovie } from "api";
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
  const navigate = useNavigate();

  const {
    isPending,
    error,
    refetch,
    data: movie,
  } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovie(id),
  });

  const { mutate: addMutate, isPending: isAddPending } = useMutation({
    mutationFn: (newMovieData: Movie) => addMovie(newMovieData),
  });

  const { mutate: editMutate, isPending: isEditPending } = useMutation({
    mutationFn: (newMovieData: Movie) => editMovie(newMovieData, String(id)),
    onSuccess: () => refetch(),
  });

  const { mutate: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: () => deleteMovie(String(id)),
    onSuccess: () => navigate(routes.movies),
  });
  const { state, dispatch } = useMovieContext();

  const [isAddDialogOpened, setIsAddDialogOpened] = useState(false);
  const [isEditDialogOpened, setIsEditDialogOpened] = useState(false);
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const handleAddDialogOpen = () => setIsAddDialogOpened(true);
  const handleAddDialogClose = () => {
    setIsAddDialogOpened(false);
  };

  const handleEditDialogOpen = () => setIsEditDialogOpened(true);
  const handleEditDialogClose = () => {
    setIsEditDialogOpened(false);
  };
  const handleDeleteDialogOpen = () => setIsDeleteDialogOpened(true);
  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpened(false);
  };

  const handleEditMovieSubmit = (values: Movie) => {
    editMutate(values);
    handleEditDialogClose();
  };

  const handleAddMovieSubmit = (values: Movie) => {
    addMutate(values);
    handleAddDialogClose();
  };

  const handleDeleteMovieSubmit = () => {
    deleteMutate();
    handleDeleteDialogClose();
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
        {movie.actors.length && (
          <Box display="flex" flexWrap="wrap" gap="5px">
            <Typography>Actors:</Typography>
            {movie.actors.map((actor) => (
              <Typography key={actor} fontWeight="bold">
                {actor};
              </Typography>
            ))}
          </Box>
        )}
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
        <MovieForm
          handleSubmit={handleAddMovieSubmit}
          isButtonLoading={isAddPending}
        />
      </Dialog>
      <Dialog open={isEditDialogOpened} onClose={handleEditDialogClose}>
        <MovieForm
          initialValues={movie}
          handleSubmit={handleEditMovieSubmit}
          isButtonLoading={isEditPending}
        />
      </Dialog>
      <Dialog open={isDeleteDialogOpened} onClose={handleDeleteDialogClose}>
        <DeleteMovieConfirmation
          handleSubmit={handleDeleteMovieSubmit}
          handleCancel={handleDeleteDialogClose}
          isButtonLoading={isDeletePending}
        />
      </Dialog>
    </Box>
  );
};
