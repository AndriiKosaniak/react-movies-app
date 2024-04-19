import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useIsMobile } from "hooks";

type RedirectButtonProps = {
  route: string;
  buttonText: string;
};

export const RedirectButton = ({ route, buttonText }: RedirectButtonProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return isMobile ? (
    <IconButton onClick={() => navigate(route)}>
      <ArrowBackIcon />
    </IconButton>
  ) : (
    <Button onClick={() => navigate(route)}>{buttonText}</Button>
  );
};
