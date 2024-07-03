"use client";

import useDictionaries from "@/hooks/useDictionaries";
import { LanguageDictType } from "@/i18n/dictionaries";
import { getErrorMessage, removeNumbersBetweenDots } from "@/lib/util";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface IInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  type?: HTMLInputTypeAttribute | undefined;
  label?: string;
  namespace: keyof LanguageDictType;
}

function InputText<T extends FieldValues>(props: IInputProps<T>) {
  const dict = useDictionaries();
  const { register, errors, fieldName, label, type, namespace } = props;

  const errorField = getErrorMessage(errors, fieldName);
  // @ts-expect-error
  const labelValue = dict[namespace][`field_${removeNumbersBetweenDots(fieldName)}`] || label;

  return (
    <div className="m-0 p-0">
      <label className="label" htmlFor={fieldName}>
        <span className="label-text">{labelValue}</span>
      </label>
      <input
        id={fieldName}
        {...register(fieldName)}
        className={`input input-bordered w-full ${errorField && "input-error"}`}
        type={type}
      />
      {errorField && (
        <label className="label">
          {errorField && <span className="label-text-alt text-error">{errorField}</span>}
        </label>
      )}
    </div>
  );
}

export default InputText;
