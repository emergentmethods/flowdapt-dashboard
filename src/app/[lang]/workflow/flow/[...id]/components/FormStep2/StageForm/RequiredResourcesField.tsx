import InputText from "@/components/Form/InputText";
import { useFieldArray, Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { StageFormData } from "./utils";
import useDictionaries from "@/hooks/useDictionaries";

interface IRequiredResourcesFieldProps {
  control: Control<StageFormData, unknown>;
  register: UseFormRegister<StageFormData>;
  errors: FieldErrors<StageFormData>;
}

const RequiredResourcesField = (props: IRequiredResourcesFieldProps) => {
  const { control, register, errors } = props;
  const dict = useDictionaries();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "localResources",
  });

  return (
    <div>
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300" />
      </div>
      <label className="label">
        <span className="label-text font-bold">{"Required Resources"}</span>
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-row mt-0 pt-0">
          <div className="flex-grow">
            <InputText
              errors={errors}
              fieldName={`localResources.${index}.name`}
              namespace="stage"
              register={register}
            />
          </div>
          <div className="flex-grow">
            <InputText
              errors={errors}
              fieldName={`localResources.${index}.value`}
              namespace="stage"
              register={register}
            />
          </div>
          <div className="flex flex-grow justify-end items-end">
            <button
              type="button"
              className="btn btn-sm btn-secondary m-0"
              onClick={() => remove(index)}
            >
              {dict.global.delete}
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-sm mt-2"
        onClick={() => append({ name: "threads", value: "5" })}
      >
        {dict.global.add}
      </button>
    </div>
  );
};

export default RequiredResourcesField;
