import React from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveIcon from "@mui/icons-material/Remove";

import { FormError } from "./FormError";

import type { Movie } from "types";

type MovieFormProps = {
  initialValues?: Movie;
  handleSubmit: (values: Movie) => void;
  isButtonLoading: boolean;
};

export const MovieForm = ({
  initialValues,
  handleSubmit,
  isButtonLoading,
}: MovieFormProps) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    director: Yup.string().required("Director is required"),
    actors: Yup.array()
      .of(Yup.string())
      .required("Should be at least one actor"),
    rating: Yup.number()
      .test("is-decimal", "Invalid decimal", (value) => {
        if (typeof value === "number") {
          const match = /^\d*\.{1}\d*$/.test(String(value));
          return match;
        }
        return false;
      })
      .required("Rating is required"),
    release_date: Yup.date().required("Release date is required"),
    genre: Yup.array()
      .of(Yup.string())
      .required("Should be at least one genre"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
  });

  return (
    <Box width="100%">
      <Formik
        initialValues={{
          title: initialValues?.title ?? "",
          director: initialValues?.director ?? "",
          actors: initialValues?.actors ?? [""],
          rating: initialValues?.rating ?? 0,
          release_date: initialValues?.release_date ?? "",
          genre: initialValues?.genre ?? [""],
          description: initialValues?.description ?? "",
          image: initialValues?.image ?? "",
        }}
        validationSchema={validationSchema}
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
              <FormError name="title" />

              <Typography fontWeight="bold">Director:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Director"
                name="director"
              />
              <FormError name="director" />

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
              <FormError name="actors" />

              <Typography fontWeight="bold">Rating:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Rating"
                name="rating"
                type="number"
              />
              <FormError name="rating" />

              <Typography fontWeight="bold">Release date:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Date"
                name="release_date"
                type="date"
              />
              <FormError name="release_date" />

              <Typography fontWeight="bold">Description:</Typography>
              <Field
                as={TextField}
                multiline
                variant="outlined"
                placeholder="Description"
                name="description"
              />
              <FormError name="description" />

              <Typography fontWeight="bold">Image link:</Typography>
              <Field
                as={TextField}
                variant="outlined"
                placeholder="Image"
                name="image"
              />
              <FormError name="image" />

              <LoadingButton
                loading={isButtonLoading}
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
