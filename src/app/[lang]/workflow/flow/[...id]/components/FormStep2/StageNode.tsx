"use client";

import { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";
import StageFormModalContext from "./StageForm/StageFormModalContext";
import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import useDictionaries from "@/hooks/useDictionaries";
import { IWorkflowStageDefinition } from "./utils";

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
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        isConnectable={isConnectable}
        data-testid="nodeTopHandle"
        className="w-10 h-10 bg-cyan-400"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
        data-testid="nodeLeftHandle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        data-testid="nodeBottomHandle"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        data-testid="nodeRightHandle"
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
