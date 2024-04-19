import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FieldArray } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";

import { addMovie, editMovie } from "api";

import type { Movie } from "types";

type MovieFormProps = {
  initialValues?: Movie;
  handleClose: () => void;
};

export const MovieForm = ({ initialValues, handleClose }: MovieFormProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (newMovieData: Movie) =>
      initialValues
        ? editMovie(newMovieData, String(initialValues.id))
        : addMovie(newMovieData),
    onSuccess: () => handleClose(),
  });

  const handleSubmit = (values: any) => mutate(values);

  return (
    <Box width="100%">
      <Formik
        initialValues={{
          title: initialValues?.title ?? "",
          director: initialValues?.director ?? "",
          actors: initialValues?.actors ?? "",
          rating: initialValues?.rating ?? "",
          description: initialValues?.description ?? "",
          image: initialValues?.image ?? "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Box display="flex" flexDirection="column" gap="15px" width="100%">
              <Typography variant="h4">
                {initialValues ? "Edit the " : "Add a "}movie
              </Typography>
              <Typography fontWeight="bold">Title:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Title"
                name="title"
              />
              <Typography fontWeight="bold">Director:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Director"
                name="director"
              />
              <FieldArray
                name="actors"
                render={({ push, remove }) => (
                  <Box>
                    <Typography fontWeight="bold" mb="15px">
                      Actors:
                    </Typography>
                    <Box display="flex" flexDirection="column" gap="15px">
                      {values.actors.length
                        ? (values.actors as string[]).map(
                            (actor: string, index: number) => (
                              <Box
                                display="flex"
                                alignItems="center"
                                gap="5px"
                                width="100%"
                              >
                                <Field
                                  as={TextField}
                                  width="100%"
                                  variant="outlined"
                                  name={`actors.${index}`}
                                  required
                                />
                                <IconButton onClick={() => remove(index)}>
                                  <RemoveIcon />
                                </IconButton>
                              </Box>
                            )
                          )
                        : null}
                      <Button onClick={() => push("")}>Add an actor</Button>
                    </Box>
                  </Box>
                )}
              />
              <Typography fontWeight="bold">Rating:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Rating"
                name="rating"
              />
              <Typography fontWeight="bold">Description:</Typography>
              <Field
                as={TextField}
                multiline
                variant="outlined"
                placeholder="Description"
                name="description"
              />
              <Typography fontWeight="bold">Image link:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Image"
                name="image"
              />
              <LoadingButton
                loading={isPending}
                type="submit"
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
