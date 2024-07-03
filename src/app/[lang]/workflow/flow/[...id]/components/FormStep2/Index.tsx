"use client";

import React from "react";
import { ReactFlowProvider } from "reactflow";
import MainFlow from "./MainFlow";
import { workflowDefinitionToReactFlow } from "./utils";
import { useFormContext } from "react-hook-form";
import { MainFormData } from "../FormSchema";

export interface IFormStep2Props {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
}

const FormStep2 = (props: IFormStep2Props) => {
  const { getValues } = useFormContext();
  const workflow = getValues();
  const { nodes, edges } = workflowDefinitionToReactFlow(workflow as MainFormData);
  return (
    <ReactFlowProvider>
      <MainFlow {...props} initialEdges={edges} initialNodes={nodes} />
    </ReactFlowProvider>
  );
};

export default FormStep2;
