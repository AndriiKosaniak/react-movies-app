import React from "react";
import { Formik, Form, Field } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type SearchInputProps = {
  handleSubmit: (searchQuery: string) => void;
};

export const SearchInput = ({ handleSubmit }: SearchInputProps) => {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={({ search }) => {
        handleSubmit(search);
      }}
    >
      <Form>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            marginY: "20px",
          }}
        >
          <Field
            as={TextField}
            variant="outlined"
            placeholder="Search for a movie..."
            name="search"
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};
