import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

const Form = ({ onSubmit, children }) => {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
