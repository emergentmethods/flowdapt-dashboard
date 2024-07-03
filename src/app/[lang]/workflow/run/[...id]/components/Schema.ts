import { LanguageDictType } from "@/i18n/dictionaries";
import * as yup from "yup";

function isValidJson(json: string | undefined | null): boolean {
  if (!json) {
    return true;
  }
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

export const getSchema = (dict: LanguageDictType) => {
  const schema = yup
    .object({
      workflowName: yup.string().required(),
      payload: yup.string().test("is-json", dict.workflow.field_payloadInvalidJson, isValidJson),
      wait: yup.boolean(),
    })
    .required();
  return schema;
};
