"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainFormData, getSchema } from "./FormSchema";
import FormStep1 from "./FormStep1/Index";
import MainFormButtons from "./MainFormButtons";
import FormStep2 from "./FormStep2/Index";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import useDictionaries from "@/hooks/useDictionaries";
import { z } from "zod";
import { WorkflowResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";
import { FLOWDAPT_API_VERSION } from "@/lib/util";

interface IMainFormProps {
  workflow: WorkflowResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"];
}
const MainForm = (props: IMainFormProps) => {
  const { workflow } = props;

  const [formStep, setFormStep] = React.useState(1);
  const dict = useDictionaries();
  const schema = getSchema(dict);
  type schemaType = z.infer<typeof schema>;

  const methods = useForm<MainFormData & schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...workflow,
      group: workflow?.metadata?.annotations?.group,
    },
  });

  const onSubmit = () => {
    if (formStep === 1) {
      setFormStep(2);
    }
  };
  const pageTitle = workflow?.metadata?.name
    ? dict.workflow.editWorkflow
    : dict.workflow.createWorkflow;

  return (
    <FormProvider {...methods}>
      {formStep === 1 && (
        <Container>
          <PageHeader title={pageTitle} />
          <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4">
            <FormStep1 />
            <MainFormButtons formStep={formStep} setFormStep={setFormStep} />
          </form>
        </Container>
      )}
      {formStep === 2 && (
        <>
          <FormStep2 {...props} setFormStep={setFormStep} />
        </>
      )}
    </FormProvider>
  );
};

export default MainForm;
