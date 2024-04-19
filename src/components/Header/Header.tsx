import React from "react";
import Box from "@mui/material/Box";

import type { ReactNode } from "react";

type HeaderProps = {
  left?: ReactNode;
  center?: ReactNode;
  right: ReactNode;
};

export const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <Box display="flex" alignItems="center" gap="15px">
      <Box flex={1}>{left}</Box>
      <Box flex={4}>{center}</Box>
      <Box flex={1}>{right}</Box>
    </Box>
  );
};
