import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ContextWrapper } from "context";
import { theme } from "theme";
import { MoviesPageLayout } from "layouts";

const queryClient = new QueryClient();

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <MoviesPageLayout />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
