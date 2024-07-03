import { LanguageDictType } from "@/i18n/dictionaries";
import { FLOWDAPT_API_VERSION } from "@/lib/util";
import { WorkflowResourceCreateResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

// import * as yup from "yup";
import { z } from "zod";

function is_valid_uuid(uuid_string: string): boolean {
  // Use a simple regular expression to check UUID format
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  return uuidRegex.test(uuid_string);
}

function validate_name(value: string): boolean {
  const nameRegex = /^[A-Za-z0-9_-]+$/;
  if (!nameRegex.test(value)) {
    return false;
  }
  if (is_valid_uuid(value)) {
    return false;
  }
  return true;
}
export const getSchema = (dict: LanguageDictType) => {
  const schema = z.object({
    metadata: z.object({
      name: z
        .string()
        .refine(value => validate_name(value), dict.workflow["field_metadata.nameInvalid"]),
    }),
    group: z.string().optional(),
  });
  return schema;
};

export type MainFormData = WorkflowResourceCreateResponseDTOType[FLOWDAPT_API_VERSION]["data"];
