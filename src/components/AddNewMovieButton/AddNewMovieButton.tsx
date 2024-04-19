import React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import { useIsMobile } from "hooks";

type AddNewMovieButtonProps = {
  handleClick: () => void;
};

export const AddNewMovieButton = ({ handleClick }: AddNewMovieButtonProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <IconButton onClick={handleClick}>
      <AddIcon />
    </IconButton>
  ) : (
    <Button variant="contained" onClick={handleClick} sx={{ width: "100%" }}>
      Add new movie
    </Button>
  );
};
