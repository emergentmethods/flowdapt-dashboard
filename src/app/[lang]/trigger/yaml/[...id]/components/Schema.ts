import { LanguageDictType } from "@/i18n/dictionaries";
import { isValidYaml, yamlNoReferencesTest } from "@/lib/util";
import * as yup from "yup";

export type FormConfigFromYamlData = {
  uid: string | undefined;
  yaml: string;
};

export const getSchema = (dict: LanguageDictType) => {
  const schema = yup
    .object({
      uid: yup.string(),
      yaml: yup
        .string()
        .required()
        .test("valid-yaml", dict.trigger.field_configYamlInvalid, isValidYaml)
        .test(
          "no-references",
          dict.trigger.field_triggerYamlNoReferencesError,
          yamlNoReferencesTest
        ),
    })
    .required();
  return schema;
};
