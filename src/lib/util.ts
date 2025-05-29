import { LanguageDictType, Locale } from "@/i18n/dictionaries";
import { FlowdaptSDK } from "@emergentmethods/flowdapt-ts-sdk";
import jsyaml from "js-yaml";

/**
 * Parses a YAML string to a JSON object of the specified type.
 *
 * @param yamlString - The YAML string to parse.
 * @returns The parsed object.
 */
export function parseYamlToJson<T>(yamlString: string): T {
  const parsedObject: T = jsyaml.load(yamlString) as T;
  return parsedObject;
}

/**
 * Parses a YAML string to a JSON object.
 *
 * @param yamlString - The YAML string to parse.
 * @returns The parsed object.
 */
export function parseYamlToJsonWithoutType(yamlString: string) {
  const parsedObject = jsyaml.load(yamlString);
  return parsedObject;
}

export const isValidYaml = (yamlString?: string) => {
  if (!yamlString) {
    return true;
  }
  try {
    jsyaml.load(yamlString);
    return true;
  } catch (e) {
    return false;
  }
};

export const yamlNoReferencesTest = (value?: string) => {
  if (!value) {
    return true;
  }
  const referencePattern = /\$ref{/;
  return !referencePattern.test(value);
};

/**
 * Converts an object to a YAML string.
 * Optionally, it can convert the keys of the object to snake case before conversion.
 *
 * @param object - The input object.
 * @returns The YAML string.
 */
export function parseJsonToYaml<T>(object: T): string {
  const yamlString: string = jsyaml.dump(object);
  return yamlString;
}

/**
 * Extracts the language from the provided Flowdapt.IPageParams object.
 * If the language is not present, defaults to 'en' (English).
 * @param props - The object containing page parameters.
 * @returns The language code as a Locale type, for example, 'en-US'.
 */
export const getLanguage = (props: Flowdapt.IPageParams) => {
  const { lang } = props.params || {};
  if (lang) {
    return lang as Locale;
  } else {
    return "en" as Locale;
  }
};

/**
 * Creates and returns a Configuration object with a predefined basePath.
 * Useful for initializing API clients with a consistent configuration.
 * @returns The created Configuration object with the basePath set.
 */
export const getClient = () => {
  const baseUrl = process.env.API_BASE_URL || "http://localhost:8080";
  const flowdaptSDKClient = new FlowdaptSDK({
    baseUrl,
  });

  return flowdaptSDKClient;
};

export type FLOWDAPT_API_VERSION = "latest";

/**
 * Returns a comparison function for sorting an array of objects by the specified property.
 *
 * @typeparam T - The type of the objects in the array to be sorted.
 * @param property - The name of the property to sort the objects by.
 * @param order - The order of sorting: 'asc' (ascending) or 'desc' (descending). Defaults to 'asc'.
 * @returns A comparison function to be used with `Array.prototype.sort()`.
 *
 * @example
 * const data = [
 *   { name: 'John', age: 30 },
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 35 },
 * ];
 *
 * const sortedByName = data.sort(sortByProperty<{ name: string; age: number }>('name'));
 * const sortedByAgeDescending = data.sort(sortByProperty<{ name: string; age: number }>('age', 'desc'));
 */
export const sortByProperty = <T>(property: keyof T, order: "asc" | "desc" = "asc") => {
  return (a: T, b: T): number => {
    const aValue = a[property];
    const bValue = b[property];

    if (typeof aValue === "string" && typeof bValue === "string") {
      if (aValue.toLowerCase() < bValue.toLowerCase()) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue.toLowerCase() > bValue.toLowerCase()) {
        return order === "asc" ? 1 : -1;
      }
    } else {
      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      }
    }

    return 0;
  };
};

/**
 * Closes the active DaisyUI dropdown menu by removing focus from the active element.
 * This function is used to close an open dropdown when the user interacts with elements outside the dropdown.
 */
export const closeDaisyUIDropdown = () => {
  const elem = document.activeElement;
  if (elem) {
    // @ts-ignore
    elem?.blur();
  }
};

/**
 * Removes the numbers between dots in a given string.
 *
 * @param input - The input string with numbers between dots.
 * @returns The modified string with numbers between dots removed.
 */
export const removeNumbersBetweenDots = (input: string): string => {
  const pattern = /\.\d+\./g;
  return input.replace(pattern, ".");
};

/**
 * Retrieves the error message for a given field name from the errors object.
 *
 * @param errors - The errors object containing nested properties and messages.
 * @param fieldName - The name of the field to retrieve the error message for.
 * @returns The error message for the specified field, or an empty string if not found.
 */
export const getErrorMessage = (errors: unknown, fieldName: string): string => {
  const fieldSegments = fieldName.split(".");
  let currentObject = errors;
  let errorMessage = "";

  for (const segment of fieldSegments) {
    // @ts-expect-error
    currentObject = currentObject?.[segment];

    if (!currentObject) {
      break;
    }

    if (typeof currentObject === "object" && "message" in currentObject) {
      errorMessage = currentObject.message as string;
      break;
    }
  }

  return errorMessage;
};

/**
 * Defines the structure of a validation error.
 */
type ValidationError = {
  /** The location of the error, typically includes the path to the field in error. */
  loc: string[];
  /** The error message. */
  msg: string;
  /** The type of validation error (e.g. 'required', 'min', 'max'). */
  type: string;
};

/**
 * Defines the structure of multiple validation errors.
 */
type ValidationErrors = {
  /** An array of validation error details or a string containing error message. */
  detail?: ValidationError[] | string;
  message?: string;
};

/**
 * Function to generate a friendly error message string from provided validation errors.
 *
 * @param errors - The object containing validation errors.
 * @param dict - The i18n dictionary object.
 * @returns A user-friendly error message string.
 */
export function generateFriendlyErrorMessage(
  errors: ValidationErrors,
  dict: LanguageDictType
): string {
  let errorMessage = dict.global.listErrorMessage;
  console.log("errors", errors);
  if (!errors?.detail) {
    return errors?.message || errors.toString();
  }
  if (typeof errors?.detail === "string") {
    return errors.detail;
  }
  for (const error of errors.detail) {
    const field = error.loc.slice(-1)[0]; // Get the last element in the 'loc' array as the field name
    const message = error.msg;
    errorMessage += `- ${field}: ${message}\n`;
  }

  return errorMessage;
}

/**
 * Formats an ISO string into a more human-friendly format.
 *
 * @param dateString - The ISO string to be formatted.
 * @param formatType - Determines the output format. It can be "date", "time" or "datetime".
 * "date" returns only the date in a friendly format.
 * "time" returns only the time in a friendly format.
 * "datetime" returns both date and time in a friendly format.
 * @param locale - An optional parameter to specify the locale format, defaults to 'en-US'.
 *
 * @returns The date in the specified friendly format.
 *
 * @example
 * // Returns "June 27, 2023"
 * formatDate("2023-06-27T13:38:56.651722", "date");
 * // Returns "1:38:56 PM"
 * formatDate("2023-06-27T13:38:56.651722", "time");
 * // Returns "June 27, 2023, 1:38:56 PM"
 * formatDate("2023-06-27T13:38:56.651722", "datetime");
 * // Returns "27. Juni 2023, 13:38:56" for German locale
 * formatDate("2023-06-27T13:38:56.651722", "datetime", 'de-DE');
 */
export function formatDate(
  dateString?: string | null,
  formatType: "date" | "time" | "datetime" = "date",
  locale?: string,
  stringIsUTC = true
): string {
  if (!dateString) {
    return "";
  }
  if (stringIsUTC && !dateString.endsWith("Z")) {
    dateString += "Z";
  }
  const date = new Date(dateString);

  switch (formatType) {
    case "date":
      return new Intl.DateTimeFormat(locale).format(date);
    case "time":
      return new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(date);
    case "datetime":
      return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeStyle: "medium" }).format(
        date
      );
    default:
      throw new Error(`Unknown format type: ${formatType}`);
  }
}

export const urlToFileName = (url: string, appendString = ""): string => {
  return (
    url
      .replaceAll("/", "-")
      .replaceAll(":", "-")
      .replaceAll("?", "-")
      .replaceAll("=", "-")
      .replaceAll("&", "-") + appendString
  );
};

export const epochNanoToJSDate = (epochNano: number): Date => {
  const epochMilli = epochNano / 1e6; // Convert nanoseconds to milliseconds
  return new Date(epochMilli); // Create a new Date object with the milliseconds
};
