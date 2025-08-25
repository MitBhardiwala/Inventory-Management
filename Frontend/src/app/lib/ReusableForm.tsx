"use client";
import { Field, Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";

import { FormikProps } from "formik";
import { CreateProductType } from "./definitions";

interface Field {
  name: string;
  type: string;
  label?: string | undefined;
  accept?: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  targetField?: string | undefined;
  text?: string | undefined;
  format?: string;
  showSelected?: boolean;
}

interface ReusableFormProps {
  title: string;
  initialValues: CreateProductType;
  validationSchema: object;
  onSubmit: (
    values: CreateProductType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  fields: Field[];
  submitButtonText: string;
  className?: string;
}

const ReusableForm = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  className = "flex flex-col justify-center items-center gap-5 w-full max-w-2xl",
}: ReusableFormProps) => {
  const renderField = (field: Field, formikProps: FormikProps<any>) => {
    const { errors, touched } = formikProps;
    const isError = touched[field.name] && Boolean(errors[field.name]);
    const helperText = touched[field.name] && errors[field.name];

    return (
      <Field
        key={field.name}
        as={TextField}
        name={field.name}
        type={field.type}
        label={field.label}
        variant="outlined"
        fullWidth
        error={isError}
        helperText={helperText as string}
      />
    );
  };

  return (
    <div className={className}>
      <p className="text-3xl">{title}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form className="flex flex-col gap-3 w-[60%]">
              {fields.map((field) => renderField(field, formikProps))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {submitButtonText}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReusableForm;
