"use client";

import InputText from "@/components/Form/InputText";
import React from "react";
import { useFormContext } from "react-hook-form";

const FormStep1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <InputText
        errors={errors}
        fieldName="metadata.name"
        namespace="workflow"
        register={register}
      />
      <InputText errors={errors} fieldName="group" namespace="workflow" register={register} />
    </>
  );
};

export default FormStep1;
