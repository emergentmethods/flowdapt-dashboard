"use client";

import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { PencilIcon } from "@heroicons/react/24/solid";
import StageFormModalContext from "./StageForm/StageFormModalContext";
import useDictionaries from "@/hooks/useDictionaries";
import { IWorkflowStageDefinition } from "./utils";

type HandleType = "source" | "target";

interface CustomHandleProps {
  type: HandleType;
  position: Position;
  id: string;
  isConnectable: boolean;
}

const CustomHandle: React.FC<CustomHandleProps> = ({ type, position, id, isConnectable }) => {
  const handleStyle: React.CSSProperties = {
    width: "50px",
    height: "25px",
    background: "transparent",
    border: "none",
    zIndex: 1,
    position: "absolute",
    [position === Position.Left || position === Position.Right ? "top" : "left"]: "50%",
    [position]: "-9px",
    transform:
      position === Position.Left || position === Position.Right
        ? "translateY(-50%)"
        : "translateX(-50%)",
  };

  const innerHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: "12px",
    height: "12px",
    backgroundColor: "#D3D3D3",
    borderRadius: "3px",
    [position === Position.Bottom ? "bottom" : "top"]: "3px",
    [position === Position.Right ? "right" : "left"]: "50%",
    transform:
      position === Position.Left || position === Position.Right
        ? "translateY(-50%)"
        : "translateX(-50%)",
  };

  switch (position) {
    case Position.Left:
    case Position.Right:
      handleStyle.top = "50%";
      handleStyle.transform = "translateY(-50%)";
      handleStyle[position] = "-9px"; // Adjust this value as needed
      innerHandleStyle.top = "50%";
      innerHandleStyle.transform = "translateY(-50%)";
      innerHandleStyle[position] = "3px";
      break;
    case Position.Top:
    case Position.Bottom:
      handleStyle.left = "50%";
      handleStyle.transform = "translateX(-50%)";
      handleStyle[position] = "-9px";
      innerHandleStyle.left = "50%";
      innerHandleStyle.transform = "translateX(-50%)";
      innerHandleStyle[position] = "3px";
      break;
  }

  return (
    <Handle
      type={type}
      position={position}
      id={id}
      isConnectable={isConnectable}
      data-testid={`node${position}Handle`}
      style={handleStyle}
    >
      <div style={innerHandleStyle} />
    </Handle>
  );
};

const StageNode = ({ data, isConnectable, id }: NodeProps<IWorkflowStageDefinition>) => {
  const dict = useDictionaries();
  const mapOn = data?.options?.map_on;
  const stageFormModalContext = React.useContext(StageFormModalContext);
  const { setProps } = stageFormModalContext || {};
  const resources = Object.keys(data.resources || {}).map(key => ({
    name: key,
    value: (data.resources || {})[key],
  }));

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <CustomHandle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <CustomHandle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
      />
      <CustomHandle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
      />
      <div className="card-body tooltip tooltip-info" data-tip={dict.stage.removeStageOrConnection}>
        <h2 className="card-title text-base">
          {data.name}
          <div className="badge badge-secondary" title="Type">
            {data.type}
          </div>
        </h2>
        <p className="truncate" title={`Target: ${data.target}`}>
          {data.target}
        </p>
        <div className="card-actions" title="Required Resources">
          {resources?.map(r => (
            <div key={r.name} className="badge badge-outline">
              {r.name}: {r.value}
            </div>
          ))}
        </div>

        {mapOn && (
          <p className="truncate" title={`${dict.stage["field_localOptions.mapOn"]}: ${mapOn}`}>
            <span className="text-secondary">{dict.stage["field_localOptions.mapOn"]}: </span>
            {mapOn}
          </p>
        )}
        <div className="card-actions justify-end">
          <button
            type="button"
            title="Edit"
            onClick={() =>
              setProps &&
              setProps({
                modalOpen: true,
                nodeId: id,
                values: data,
              })
            }
          >
            <label className="text-primary">
              <PencilIcon className="w-5 h-5" />
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StageNode;
