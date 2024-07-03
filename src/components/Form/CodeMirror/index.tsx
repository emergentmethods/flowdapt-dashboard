"use client";
import useDictionaries from "@/hooks/useDictionaries";
import CodeMirror from "@uiw/react-codemirror";

import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from "@uiw/codemirror-theme-github";
import React, { useEffect } from "react";
import {
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormSetValue,
  PathValue,
  FieldErrors,
} from "react-hook-form";
import { LanguageDictType } from "@/i18n/dictionaries";
import { useTheme } from "next-themes";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import { StreamLanguage, LanguageSupport } from "@codemirror/language";

export type CodeMirrorLanguage = "javascript" | "json" | "yaml";
export interface IInputProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  label?: string;
  namespace: keyof LanguageDictType;
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  language: CodeMirrorLanguage;
  height?: string;
}

function FlowdaptCodeMirror<T extends FieldValues>(props: IInputProps<T>) {
  const dict = useDictionaries();
  const { theme } = useTheme();
  const isDark = theme === "flowdapt_dark";
  const { getValues, setValue, fieldName, namespace, errors, language, height = "600px" } = props;
  const [definedLanguage, setDefinedLanguage] = React.useState<LanguageSupport>(javascript());

  const onChange = React.useCallback(
    (value: PathValue<T, Path<T>>) => {
      setValue(fieldName, value);
    },
    [setValue, fieldName]
  );
  const errorField = (errors?.[fieldName]?.message || "") as string;

  useEffect(() => {
    switch (language) {
      case "javascript":
        setDefinedLanguage(javascript());
        break;
      case "json":
        setDefinedLanguage(json());
        break;
      case "yaml": {
        const yaml = new LanguageSupport(StreamLanguage.define(yamlMode.yaml));
        setDefinedLanguage(yaml);
        break;
      }
    }
  }, [language]);

  return (
    <div>
      <label className={`label`} htmlFor={fieldName}>
        <span className={`label-text ${errorField && "text-secondary"}`}>
          {/*@ts-expect-error*/}
          {dict[namespace][`field_${fieldName}`] || ""}
        </span>
      </label>
      <div className={`relative ${errorField ? "border-2 border-secondary" : ""}`}>
        <CodeMirror
          id={fieldName}
          value={getValues(fieldName) || ""}
          height={height}
          extensions={[definedLanguage]}
          onChange={onChange}
          theme={isDark ? vscodeDark : githubLight}
        />
      </div>
      {errorField && (
        <label className="label">
          {errorField && <span className="label-text-alt text-secondary">{errorField}</span>}
        </label>
      )}
    </div>
  );
}

export default FlowdaptCodeMirror;
