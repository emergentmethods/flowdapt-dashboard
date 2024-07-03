"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FlowdaptCodeMirror from "@/components/Form/CodeMirror";
import { configExample } from "./configExample";
import { FLOWDAPT_API_VERSION, parseJsonToYaml } from "@/lib/util";
import { useRouter } from "next/navigation";
import useDictionaries from "@/hooks/useDictionaries";
import { useMessage } from "@/context/MessageContext/Index";
import { FormConfigFromYamlData, getSchema } from "./Schema";
import { onSubmit, cancelPage } from "./util";
import { ConfigResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

interface IFormConfigFromYamlProps {
  uid?: string;
  config: ConfigResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | null;
}

const FormConfigFromYaml = (props: IFormConfigFromYamlProps) => {
  const { config, uid } = props;
  const dict = useDictionaries();
  const schema = getSchema(dict);

  const {
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm<FormConfigFromYamlData>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      yaml: uid && config ? parseJsonToYaml(config) : configExample,
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
        namespace="configs"
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

export default FormConfigFromYaml;
