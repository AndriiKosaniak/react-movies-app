import React from "react";
import { useMutation } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

import { deleteMovie } from "api";

type DeleteMovieConfirmationProps = {
  movieId: number;
  handleClose: () => void;
};

export const DeleteMovieConfirmation = ({
  movieId,
  handleClose,
}: DeleteMovieConfirmationProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteMovie(String(movieId)),
    onSuccess: () => handleClose(),
  });

  const handleDelete = () => mutate();

  return (
    <Box>
      <Typography variant="h2">Are you sure?</Typography>
      <Box mt={5}>
        <LoadingButton
          onClick={handleDelete}
          loading={isPending}
          variant="contained"
          sx={{ marginRight: "10px" }}
        >
          Yes, delete this movie
        </LoadingButton>
        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Box>
  );
};
