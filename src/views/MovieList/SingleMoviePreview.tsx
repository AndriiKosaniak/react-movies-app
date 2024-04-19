import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { routes } from "router";
import { Rating } from "components";

import type { Movie } from "types";

type SingleMoviePreviewProps = { movie: Movie };

export const SingleMoviePreview = ({ movie }: SingleMoviePreviewProps) => {
  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <Box
      component={Link}
      to={routes.movies + `/${movie.id}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        padding: "10px",
        border: "1px solid black",
        borderRadius: "20px",

        width: "400px",
        textDecoration: "none",
        color: "black",
        textAlign: "center",
      }}
    >
      <Box component="img" src={movie.image} width="220px" />
      <Rating ratingScore={movie.rating} />
      <Typography variant="h4">{movie.title}</Typography>
      <Typography>{releaseDate}</Typography>
    </Box>
  );
};
