import * as yup from "yup";
import { IWorkflowStageDefinition } from "../utils";

type LocalStageDefinition = {
  localResources?: Array<{ name: string; value: string }>;
  localOptions?: { mapOn: string };
};
export type StageFormData = IWorkflowStageDefinition & LocalStageDefinition;

function parseBytes(s: string | number): number | null {
  const byteSizes: { [key: string]: number } = {
    kb: 10 ** 3,
    mb: 10 ** 6,
    gb: 10 ** 9,
    tb: 10 ** 12,
    pb: 10 ** 15,
    kib: 2 ** 10,
    mib: 2 ** 20,
    gib: 2 ** 30,
    tib: 2 ** 40,
    pib: 2 ** 50,
    b: 1,
    "": 1,
  };

  if (typeof s === "number") {
    return s;
  }

  let sCopy = s.replace(" ", "").toLowerCase();

  // If not any numeric character, prepend '1'
  if (!/\d/.test(sCopy)) {
    sCopy = "1" + sCopy;
  }

  // Split number and unit
  const groups = sCopy.match(/(\d+(?:\.\d+)?)([a-z]*)/);

  if (!groups) {
    return null;
  }

  const [, nStr, unit] = groups;
  const n = parseFloat(nStr);
  const multiplier = byteSizes[unit];

  if (multiplier === undefined) {
    return null;
  }

  return n * multiplier;
}

function validateLocalResource(value: { name: string; value: string }) {
  const { name } = value;

  const floatPattern = /^[-+]?(\d+\.?\d*|\.\d+)$/;

  // If name == "memory", value can be a float or a byte pattern
  if (name === "memory") {
    const parsedValue = parseBytes(value.value);
    return parsedValue !== null;
  }
  // If name != "memory", value can only be a float
  else {
    return floatPattern.test(value.value);
  }
}

export const schema = yup
  .object({
    type: yup.string(),
    target: yup.string().required(),
    name: yup.string().required(),
    description: yup.string(),
    version: yup.string(),
    dependsOn: yup.array(yup.string()),
    options: yup.object(),
    resources: yup.object(),
    localResources: yup.array(
      yup
        .object({
          name: yup.string().required(),
          value: yup.string().required(),
        })
        .test(
          "localResources-value-test",
          "Invalid value: if name is 'memory', value can be a float or a byte pattern (like 5gb, 5kb, etc). Otherwise, only a float value is accepted.",
          validateLocalResource
        )
    ),
  })
  .required();

// type "simple" or "parameter"
export const stageTypeOptions = [
  {
    label: "Simple",
    value: "simple",
  },
  {
    label: "Parameter",
    value: "parameter",
  },
];

export const getCurrentValues = (values?: StageFormData) => {
  if (!values) {
    const returnData: StageFormData = {
      type: "simple",
      target: "",
      name: "",
      description: "",
      version: "",
      depends_on: [],
      options: {},
      localResources: [],
      resources: {},
      priority: null,
    };
    return returnData;
  } else {
    values.localOptions = values.options?.map_on ? { mapOn: values.options.map_on } : undefined;
    const resourcesData = values.resources || {};
    values.localResources =
      Object.keys(resourcesData).map(r => {
        // @ts-ignore
        return { name: r, value: resourcesData[r] };
      }) ?? [];
    return values;
  }
};
