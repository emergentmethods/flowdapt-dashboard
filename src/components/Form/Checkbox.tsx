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
}

function Checkbox<T extends FieldValues>(props: IInputProps<T>) {
  const dict = useDictionaries();
  const { register, errors, fieldName, label, namespace } = props;

  const errorField = getErrorMessage(errors, fieldName);
  // @ts-expect-error
  const labelValue = dict[namespace][`field_${removeNumbersBetweenDots(fieldName)}`] || label;

  return (
    <div className="m-0 p-0">
      <label className="label cursor-pointer text-left" htmlFor={fieldName}>
        <input
          id={fieldName}
          type="checkbox"
          {...register(fieldName)}
          className={`checkbox ${errorField && "input-error"}`}
        />
        <span className="label-text text-left ml-3 flex-1">{labelValue}</span>
        {errorField && <span className="label-text-alt text-error">{errorField}</span>}
      </label>
    </div>
  );
}

export default Checkbox;
