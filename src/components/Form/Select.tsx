"use client";

import useDictionaries from "@/hooks/useDictionaries";
import { LanguageDictType } from "@/i18n/dictionaries";
import { getErrorMessage, removeNumbersBetweenDots } from "@/lib/util";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface IInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
  label?: string;
  namespace: keyof LanguageDictType;
  options?: { value: string; label: string }[];
}

function Select<T extends FieldValues>(props: IInputProps<T>) {
  const dict = useDictionaries();
  const { register, errors, fieldName, label, options, namespace } = props;

  const errorField = getErrorMessage(errors, fieldName);
  // @ts-expect-error
  const labelValue = dict[namespace][`field_${removeNumbersBetweenDots(fieldName)}`] || label;

  return (
    <div>
      <label className="label" htmlFor={fieldName}>
        <span className="label-text">{labelValue}</span>
      </label>
      <select
        id={fieldName}
        className={`select select-bordered w-full ${errorField && "input-error"}`}
        title={labelValue}
        {...register(fieldName)}
      >
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorField && (
        <label className="label">
          {errorField && <span className="label-text-alt text-error">{errorField}</span>}
        </label>
      )}
    </div>
  );
}

export default Select;
