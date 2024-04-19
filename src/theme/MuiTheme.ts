import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {},
  components: {
    MuiStack: {
      styleOverrides: {
        root: {
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          width: "500px",
          maxWidth: "90%",
          padding: "24px 16px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: { width: "100%" },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { width: "100%" },
      },
    },
  },
});
