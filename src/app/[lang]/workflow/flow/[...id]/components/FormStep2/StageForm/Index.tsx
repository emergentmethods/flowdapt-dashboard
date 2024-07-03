"use client";

import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Node } from "reactflow";
import InputText from "@/components/Form/InputText";
import useDictionaries from "@/hooks/useDictionaries";
import RequiredResourcesField from "./RequiredResourcesField";
import Select from "@/components/Form/Select";
import { v4 as uuidv4 } from "uuid";
import StageFormModalContext from "./StageFormModalContext";
import { StageFormData, getCurrentValues, schema, stageTypeOptions } from "./utils";
import { IWorkflowStageDefinition } from "../utils";

interface IAddStageFormProps {
  setNodes: (value: SetStateAction<Node[]>) => void;
}
const AddStageForm = (props: IAddStageFormProps) => {
  const { setNodes } = props;
  const dict = useDictionaries();
  const stageFormModalContext = React.useContext(StageFormModalContext);
  const currentValues = getCurrentValues(stageFormModalContext?.props?.values);
  const nodeId: string | undefined = stageFormModalContext?.props?.nodeId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StageFormData>({
    //@ts-ignore
    resolver: yupResolver(schema),
    defaultValues: currentValues,
  });
  const onCancel = () => {
    stageFormModalContext?.setProps({ modalOpen: false });
  };

  const onSubmit = (data: StageFormData) => {
    const { localResources, localOptions, ...values } = data;

    const finalValues: IWorkflowStageDefinition = {
      ...values,
    };
    finalValues.resources = {};
    if (localResources && data.localResources) {
      //@ts-ignore
      data.localResources.forEach(element => {
        // @ts-ignore
        finalValues.resources[element.name] = element.value;
      });
      // finalValues.resources = data.resources.map(r => r.name + "=" + r.value);
    }
    if (localOptions) {
      finalValues.options = { map_on: data.localOptions?.mapOn };
    }

    if (!nodeId) {
      // get new uuid
      const uid = uuidv4();
      const newNode: Node<IWorkflowStageDefinition> = {
        id: uid,
        data: finalValues,
        position: { x: 300, y: 300 },
        type: "custom",
      };
      setNodes(nds => nds.concat(newNode));
    } else {
      // update existing node
      setNodes(nds =>
        nds.map(nd => {
          if (nd.id === nodeId) {
            nd.data = finalValues;
          }
          return nd;
        })
      );
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 px-4">
      <InputText errors={errors} fieldName="name" namespace="stage" register={register} />
      <InputText errors={errors} fieldName="target" namespace="stage" register={register} />
      <Select
        errors={errors}
        fieldName="type"
        options={stageTypeOptions}
        namespace="stage"
        register={register}
      />
      <InputText
        errors={errors}
        fieldName="localOptions.mapOn"
        namespace="stage"
        register={register}
      />

      <RequiredResourcesField control={control} register={register} errors={errors} />
      <div className="modal-action">
        <div className="flex justify-end space-x-4">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            {dict.global.cancel}
          </button>
          <button type="submit" className="btn btn-primary">
            {nodeId ? dict.global.edit : dict.global.add}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddStageForm;
