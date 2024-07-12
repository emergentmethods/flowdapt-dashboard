"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

type HandleType = "source" | "target";

interface CustomHandleProps {
  type: HandleType;
  position: Position;
  id: string;
  isConnectable: boolean;
}

const CustomHandle = (props: CustomHandleProps) => {
  const { type, position, id, isConnectable } = props;
  const handleStyle: React.CSSProperties = {
    width: "36px",
    height: "18px",
    background: "transparent",
    border: "none",
    zIndex: 1,
    position: "absolute",
  };

  const innerHandleStyle: React.CSSProperties = {
    position: "absolute",
    width: "12px",
    height: "12px",
    backgroundColor: "#D3D3D3",
    borderRadius: "3px",
  };

  switch (position) {
    case Position.Left:
    case Position.Right:
      handleStyle.top = "50%";
      handleStyle.transform = "translateY(-50%)";
      handleStyle[position] = "-9px";
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
      data-testid={`startNode${position}Handle`}
      style={handleStyle}
    >
      <div style={innerHandleStyle} />
    </Handle>
  );
};

type CircleNodeProps = {
  label: string;
  backgroundColor: string;
};

const StartNode = ({ data, isConnectable }: NodeProps<CircleNodeProps>) => {
  const { label, backgroundColor } = data;

  return (
    <div
      className={`w-24 h-24 rounded-full flex items-center justify-center border-2 border-gray-800 ${backgroundColor} relative`}
    >
      {label}
      <CustomHandle type="source" position={Position.Top} id="t" isConnectable={isConnectable} />
      <CustomHandle type="source" position={Position.Left} id="l" isConnectable={isConnectable} />
      <CustomHandle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
      <CustomHandle type="source" position={Position.Right} id="r" isConnectable={isConnectable} />
    </div>
  );
};

export default StartNode;
