import { createContext } from "react";
import React from "react";
import { StageFormData } from "./utils";

export interface IStageFormModalContextProps {
  nodeId?: string;
  modalOpen: boolean;
  values?: StageFormData;
}

export interface IStageFormModalContext {
  props: IStageFormModalContextProps;
  setProps: React.Dispatch<React.SetStateAction<IStageFormModalContextProps>>;
}

// FIXME: verify eslint rule to allow context naming convention
// eslint-disable-next-line @typescript-eslint/naming-convention
const StageFormModalContext = createContext<IStageFormModalContext | null>(null);

export default StageFormModalContext;
