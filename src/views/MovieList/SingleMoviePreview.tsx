import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { routes } from "router";
import { Rating } from "components";

import type { Movie } from "types";

type SingleMoviePreviewProps = { movie: Movie };

export const SingleMoviePreview = ({ movie }: SingleMoviePreviewProps) => {
  return (
    <Link
      href={routes.movies + `/${movie.id}`}
      underline="none"
      color="inherit"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        padding: "10px",
        border: "1px solid black",
        borderRadius: "20px",

        width: "400px",
      }}
    >
      <Box component="img" src={movie.image} width="220px" />
      <Rating ratingScore={movie.rating} />
      <Typography variant="h4">{movie.title}</Typography>
    </Link>
  );
};
