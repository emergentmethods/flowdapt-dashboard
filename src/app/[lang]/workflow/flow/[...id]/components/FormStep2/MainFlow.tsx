"use client";

import ReactFlow, { Controls, Background, BackgroundVariant } from "reactflow";
import "reactflow/dist/style.css";
import { getDropdownItems, nodeTypes } from "./utils";
import useMainFlow from "./useMainFlow";
import useDictionaries from "@/hooks/useDictionaries";
import DropdownPageActions from "@/components/DropdownPageActions";
import { useRouter } from "next/navigation";
import AddStageForm from "./StageForm/Index";
import useModal from "@/hooks/useModal";
import { IFormStep2Props } from "./Index";
import { IMainFlowProps } from "../utils";
import StageFormModalContext, {
  IStageFormModalContextProps,
} from "./StageForm/StageFormModalContext";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function Flow(props: IMainFlowProps & IFormStep2Props) {
  const { initialNodes, initialEdges, setFormStep } = props;
  const [serverError, setServerError] = React.useState<string>("");

  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    defaultEdgeOptions,
    setNodes,
    onLayout,
    goBack,
    save,
  } = useMainFlow({
    initialNodes,
    initialEdges,
    setFormStep,
    setServerError,
  });

  const dict = useDictionaries();

  const router = useRouter();
  const [stageFormModalDataProps, setStageFormModalDataProps] =
    React.useState<IStageFormModalContextProps>({
      modalOpen: false,
    });

  const { ModalComponent, openModal, closeModal } = useModal();
  React.useEffect(() => {
    if (stageFormModalDataProps.modalOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [stageFormModalDataProps.modalOpen, openModal, closeModal]);

  const dropdownItems = getDropdownItems(dict, router, onLayout, goBack, save);

  return (
    <StageFormModalContext.Provider
      value={{
        props: stageFormModalDataProps,
        setProps: setStageFormModalDataProps,
      }}
    >
      <ModalComponent title={dict.stage.modalAddStageTitle}>
        <AddStageForm setNodes={setNodes} />
      </ModalComponent>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={defaultEdgeOptions}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <div className="flex z-10 absolute p-5">
            <div className="flex-none">
              <button
                type="button"
                className="btn btn-outline btn-accent btn-xs"
                onClick={() => setStageFormModalDataProps({ modalOpen: true })}
              >
                {dict.workflow.flowAddStage}
              </button>
              {serverError && (
                <div className="alert alert-error shadow-lg max-w-[80vw] overflow-auto overflow-wrap break-word">
                  <div>
                    <button type="button" title="Edit" onClick={() => setServerError("")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span>{serverError}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="grow" />
          </div>

          <div className="absolute top-0 right-0 z-10 p-5">
            <DropdownPageActions
              dropdownItems={dropdownItems}
              actionElement={<Cog6ToothIcon className="h-6 w-6" />}
            />
          </div>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </StageFormModalContext.Provider>
  );
}
