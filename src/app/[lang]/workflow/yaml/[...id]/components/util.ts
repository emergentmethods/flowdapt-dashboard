import { generateFriendlyErrorMessage, parseYamlToJsonWithoutType } from "@/lib/util";
import { FormWorkflowFromYamlData } from "./Schema";
import { UseFormSetError } from "react-hook-form";
import { LanguageDictType } from "@/i18n/dictionaries";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { saveWorkflow } from "../../../server-actions";

interface IOnSubmit {
  router: AppRouterInstance;
  showMessage: (msg: string) => void;
  setError: UseFormSetError<FormWorkflowFromYamlData>;
  dict: LanguageDictType;
}

export const onSubmit = (params: IOnSubmit) => {
  const { router, showMessage, setError, dict } = params;

  return async (data: FormWorkflowFromYamlData) => {
    // const flowdaptSDK = getClient();
    try {
      const definition = parseYamlToJsonWithoutType(data.yaml);

      if (definition) {
        try {
          await saveWorkflow(definition, data.uid);
          showMessage(data.uid ? dict.global.editedMessage : dict.global.createdMessage);
          router.push("/workflow");
          router.refresh();
        } catch (e) {
          //@ts-expect-error
          const details = await e?.response?.json();
          if (!details) {
            setError("yaml", { message: `Error: ${e?.toString()}` });
          } else {
            const errorMessage = generateFriendlyErrorMessage(details, dict);
            setError("yaml", { message: errorMessage });
          }
        }
      }
    } catch (e) {
      //@ts-expect-error
      setError("yaml", { message: `Error parsing yaml: ${e.toString()}` });
    }
  };
};

interface ICancel {
  router: AppRouterInstance;
}
export const cancelPage = (params: ICancel) => {
  const { router } = params;
  return () => {
    router.push("/workflow");
  };
};