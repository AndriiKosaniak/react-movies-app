import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";

type DeleteMovieConfirmationProps = {
  handleSubmit: () => void;
  handleCancel: () => void;
  isButtonLoading: boolean;
};

export const DeleteMovieConfirmation = ({
  handleSubmit,
  handleCancel,
  isButtonLoading,
}: DeleteMovieConfirmationProps) => {
  return (
    <Box>
      <Typography variant="h2">Are you sure?</Typography>
      <Box mt={5}>
        <LoadingButton
          onClick={handleSubmit}
          loading={isButtonLoading}
          variant="contained"
          sx={{ marginRight: "10px" }}
        >
          Yes, delete this movie
        </LoadingButton>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};
