import { Edge, Node } from "reactflow";

export interface IMainFlowProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

export const getInitialEmptyNode = () => {
  const initialNodes: Node[] = [
    {
      id: Date.now().toString(),
      data: { backgroundColor: "bg-base-200", label: "Start" },
      position: { x: 100, y: 100 },
      type: "start",
      deletable: false,
    },
  ];

  return initialNodes;
};
