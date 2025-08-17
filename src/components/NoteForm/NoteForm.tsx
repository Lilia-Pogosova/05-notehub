import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { createNote, type  CreateNoteDto } from "../../services/noteService";
import { TAGS, type NoteTag, type Note } from "../../types/note";
import css from "./NoteForm.module.css";

interface Props {
  onClose: () => void;
}

type FormValues = CreateNoteDto;

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const schema = Yup.object({
  title: Yup.string().min(3, "Min 3").max(50, "Max 50").required("Required"),
  content: Yup.string().max(500, "Max 500"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(TAGS as readonly NoteTag[], "Invalid tag")
    .required("Required"),
});

export default function NoteForm({ onClose }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation<
    Note,
    AxiosError,
    FormValues
  >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    try {
      await mutateAsync(values);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || isPending}
            >
              Create note
            </button>
          </div>

          {error && <span className={css.error}>Failed to create note</span>}
        </Form>
      )}
    </Formik>
  );
}
