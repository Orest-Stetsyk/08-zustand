'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NoteForm.module.css';

export type NoteFormValues = Pick<Note, 'title' | 'content' | 'tag'>;

interface NoteFormProps {
  onCancel: () => void;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
      onCancel();
    },
  });

  const handleSubmit = async (values: NoteFormValues) => {
    await mutateAsync(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Title
          <Field className={css.input} type="text" name="title" />
          <ErrorMessage className={css.error} name="title" component="p" />
        </label>

        <label className={css.label}>
          Content
          <Field className={css.textarea} as="textarea" name="content" />
          <ErrorMessage className={css.error} name="content" component="p" />
        </label>

        <label className={css.label}>
          Tag
          <Field className={css.select} as="select" name="tag">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage className={css.error} name="tag" component="p" />
        </label>

        <div className={css.actions}>
          <button type="button" onClick={onCancel} disabled={isPending}>
            Cancel
          </button>

          <button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}