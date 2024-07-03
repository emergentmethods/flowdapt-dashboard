"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FlowdaptCodeMirror from "@/components/Form/CodeMirror";
import { openMeteoWorkflowExample } from "./openMeteoWorkflowExample";
import { FLOWDAPT_API_VERSION, parseJsonToYaml } from "@/lib/util";
import { useRouter } from "next/navigation";
import useDictionaries from "@/hooks/useDictionaries";
import { useMessage } from "@/context/MessageContext/Index";
import { FormWorkflowFromYamlData, getSchema } from "./Schema";
import { onSubmit, cancelPage } from "./util";
import { WorkflowResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

interface IFormWorkflowFromYamlProps {
  uid?: string;
  workflow: WorkflowResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | null;
}

const FormWorkflowFromYaml = (props: IFormWorkflowFromYamlProps) => {
  const { workflow, uid } = props;
  const dict = useDictionaries();
  const schema = getSchema(dict);

  const {
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<FormWorkflowFromYamlData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      yaml: uid && workflow ? parseJsonToYaml(workflow) : openMeteoWorkflowExample,
      uid: uid,
    },
  });
  const { showMessage } = useMessage();
  const router = useRouter();

  const submitFunction = onSubmit({
    dict: dict,
    router: router,
    setError: setError,
    showMessage: showMessage,
  });

  const cancelFunction = cancelPage({
    router: router,
  });

  return (
    <form onSubmit={handleSubmit(submitFunction)}>
      <FlowdaptCodeMirror
        setValue={setValue}
        getValues={getValues}
        fieldName="yaml"
        namespace="workflow"
        errors={errors}
        language="yaml"
      />
      <div className="mt-6">
        <button type="button" className="btn btn-secondary mr-3" onClick={cancelFunction}>
          {dict.global.cancel}
        </button>
        <button className="btn btn-primary mt-2" type="submit">
          {uid ? dict.global.save : dict.global.add}
        </button>
      </div>
    </form>
  );
};

export default FormWorkflowFromYaml;
