"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import { NodeProps } from "reactflow";

type CircleNodeProps = {
  label: string;
  backgroundColor: string;
};

const StartNode = ({ data, isConnectable }: NodeProps<CircleNodeProps>) => {
  const { label, backgroundColor } = data;

  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-gray-800 ${backgroundColor}`}
    >
      {label}
      <Handle
        data-testid="startNodeBottomHandle"
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
      <Handle
        data-testid="startNodeRightHandle"
        type="source"
        position={Position.Right}
        id="r"
        isConnectable={isConnectable}
      />
      <Handle
        data-testid="startNodeLeftHandle"
        type="source"
        position={Position.Left}
        id="l"
        isConnectable={isConnectable}
      />
      <Handle
        data-testid="startNodeTopHandle"
        type="source"
        position={Position.Top}
        id="t"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default StartNode;
