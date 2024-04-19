import React from "react";
import Box from "@mui/material/Box";
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

type RatingProps = {
  ratingScore: number;
};

export const Rating = ({ ratingScore }: RatingProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StarRateIcon />
      <Typography>{ratingScore}</Typography>
    </Box>
  );
};
