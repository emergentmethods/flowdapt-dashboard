"use client";

import * as yup from "yup";
import useDictionaries from "@/hooks/useDictionaries";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getSchema } from "./Schema";
import { useRouter } from "next/navigation";
import FlowdaptCodeMirror from "@/components/Form/CodeMirror";
import { FLOWDAPT_API_VERSION, generateFriendlyErrorMessage } from "@/lib/util";
import Checkbox from "@/components/Form/Checkbox";
import { useState } from "react";
import ResultWorkflowRun from "./ResultWorkflowRun";
import { runWorkflow } from "../../../server-actions";
import { WorkflowRunReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

interface IMainFormProps {
  workflowName: string;
}

const MainForm = (props: IMainFormProps) => {
  const { workflowName } = props;
  const dict = useDictionaries();
  const router = useRouter();
  const schema = getSchema(dict);
  type RunWorkflowForm = yup.InferType<typeof schema>;
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [workflowResult, setWorkflowResult] = useState<
    WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | undefined
  >();
  const showForm = !isRunning && !workflowResult && !errorMessage;

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    register,
  } = useForm<RunWorkflowForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      workflowName: workflowName,
      wait: true,
    },
  });

  const onSubmit = async (data: RunWorkflowForm) => {
    setIsRunning(true);
    setErrorMessage("");
    setWorkflowResult(undefined);

    try {
      const returnData = await runWorkflow({
        identifier: data.workflowName,
        input: data.payload,
        wait: data.wait,
      });
      setWorkflowResult(returnData);
      setErrorMessage("");
    } catch (error) {
      //@ts-expect-error
      const serverError = generateFriendlyErrorMessage(error, dict);
      setErrorMessage(serverError);
    } finally {
      setIsRunning(false);
    }
  };
  const cancel = () => {
    router.push("/workflow");
  };

  if (showForm) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Checkbox fieldName="wait" namespace="workflow" errors={errors} register={register} />
        <FlowdaptCodeMirror
          setValue={setValue}
          getValues={getValues}
          fieldName="payload"
          namespace="workflow"
          errors={errors}
          language="json"
          height="300px"
        />
        <div className="mt-6">
          <button type="button" className="btn btn-secondary mt-2 mr-3" onClick={cancel}>
            {dict.global.cancel}
          </button>
          <button className="btn btn-primary mt-2" type="submit">
            {dict.global.run}
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <ResultWorkflowRun
        dict={dict}
        errorMessage={errorMessage}
        result={workflowResult}
        isRunning={isRunning}
        setErrorMessage={setErrorMessage}
        setIsRunning={setIsRunning}
        setWorkflowResult={setWorkflowResult}
      />
    );
  }
};

export default MainForm;
