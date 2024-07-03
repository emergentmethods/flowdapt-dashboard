import { Node, Edge, DefaultEdgeOptions, NodeTypes, Position } from "reactflow";
import dagre from "dagre";
import CustomNode from "./StageNode";
import StartNode from "./StartNode";
import { LanguageDictType } from "@/i18n/dictionaries";
import { ReactNode } from "react";

export type LayoutDirection = "TB" | "LR";
export type IWorkflowStageDefinition = {
  version: string;
  type: "simple" | "parameterized";
  target: string;
  name: string;
  description: string;
  options: Record<string, any>;
  depends_on: string[];
  resources: Record<string, any>;
  priority: number | null;
};
import { v4 as uuidv4 } from "uuid";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { WorkflowResourceCreateRequestDTOType } from "@emergentmethods/flowdapt-ts-sdk";
import { FLOWDAPT_API_VERSION } from "@/lib/util";

const getDefaultNodeSizes = (isStartNode: boolean) => {
  return isStartNode
    ? {
        width: 96,
        height: 96,
      }
    : {
        width: 450,
        height: 180,
      };
};

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: LayoutDirection = "TB",
  dagreGraph: dagre.graphlib.Graph<object>
): { nodes: Node[]; edges: Edge[] } => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, getDefaultNodeSizes(node.type === "start"));
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const updatedNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    const nodeSize = getDefaultNodeSizes(node.type === "start");
    const marginDefaultAutoLayout = 100;
    node.position = {
      x: nodeWithPosition.x - nodeSize.width / 2 + marginDefaultAutoLayout,
      y: nodeWithPosition.y - nodeSize.height / 2 + marginDefaultAutoLayout,
    };

    return node;
  });

  const updatedEdges = edges.map(edge => {
    const sourceNode = updatedNodes.find(node => node.id === edge.source);
    const targetNode = updatedNodes.find(node => node.id === edge.target);

    if (sourceNode && targetNode) {
      if (sourceNode.type === "start") {
        if (isHorizontal) {
          edge.sourceHandle = "r"; // Use the right handle id for the start node when horizontal
        } else {
          edge.sourceHandle = "b"; // Use the bottom handle id for the start node when vertical
        }
      } else {
        edge.sourceHandle = isHorizontal ? "right" : "bottom";
      }

      edge.targetHandle = isHorizontal ? "left" : "top";
    }

    return edge;
  });
  return { nodes: updatedNodes, edges: updatedEdges };
};

export const getFlowDefaults = (initialNodes: Node[], initialEdges: Edge[]) => {
  const defaultEdgeOptions: DefaultEdgeOptions = {
    animated: true,
  };

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeTypes: NodeTypes = {
    custom: CustomNode,
    start: StartNode,
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
    "TB",
    dagreGraph
  );

  return {
    initialNodes,
    initialEdges,
    defaultEdgeOptions,
    dagreGraph,
    nodeTypes,
    layoutedNodes,
    layoutedEdges,
  };
};

export const nodeTypes: NodeTypes = {
  custom: CustomNode,
  start: StartNode,
};

export const reactFlowToStages = (nodes: Node[], edges: Edge[]) => {
  const startNodeId = nodes.find(node => node.type === "start")?.id;

  const stages = nodes
    .filter(node => node.type === "custom")
    .map(node => {
      const stage: IWorkflowStageDefinition = node.data as IWorkflowStageDefinition;
      const stageEdges = edges.filter(
        edge => edge.target === node.id && edge.source !== startNodeId
      );
      const dependsOn: string[] = [];
      if (stageEdges.length > 0) {
        stageEdges.forEach(stageEdge => {
          const previousNode = nodes.find(item => item.id === stageEdge.source);
          if (previousNode) {
            dependsOn.push(previousNode.data.name);
          }
        });
      }
      stage.depends_on = dependsOn;
      return stage;
    });

  return stages;
};

export const workflowDefinitionToReactFlow = (
  workflow: WorkflowResourceCreateRequestDTOType[FLOWDAPT_API_VERSION]["data"]
): { nodes: Node[]; edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Assuming the start node does not come from the stages and has a predefined ID.
  const startId = uuidv4(); // replace with new uuid
  nodes.push({
    id: startId,
    data: { backgroundColor: "bg-base-200", label: "Start" },
    position: { x: 100, y: 100 },
    type: "start",
    deletable: false,
  });

  workflow.spec.stages.forEach(stage => {
    // Assuming each stage has an unique name, we use it as id in nodes
    nodes.push({
      id: stage.name,
      type: "custom",
      data: stage,
      position: { x: 100, y: 100 },
    });

    // We will assume that the `dependsOn` array contains the names of the nodes/stages
    // on which the current node/stage depends. We will find those nodes in the existing
    // nodes array and create edges accordingly.
    stage.depends_on?.forEach(dependencyName => {
      edges.push({ source: dependencyName, target: stage.name, id: `${uuidv4()}` });
    });
    if (stage.depends_on?.length === 0) {
      edges.push({ source: startId, target: stage.name, id: `${uuidv4()}` });
    }
  });

  return { nodes, edges };
};

export const getDropdownItems = (
  dict: LanguageDictType,
  router: AppRouterInstance,
  onLayout: (direction: LayoutDirection) => void,
  goBack: () => void,
  save: () => Promise<void>
) => {
  const dropdownItems: ReactNode[] = [];

  dropdownItems.push(
    <button onClick={() => onLayout("LR")} className="justify-center">
      {dict.workflow.flowAutoLayoutHorizontal}
    </button>
  );
  dropdownItems.push(
    <button onClick={() => onLayout("TB")} className="justify-center">
      {dict.workflow.flowAutoLayoutVertical}
    </button>
  );
  dropdownItems.push(
    <button onClick={goBack} className="justify-center text-center">
      {dict.global.back}
    </button>
  );
  dropdownItems.push(
    <button onClick={save} className="justify-center">
      {dict.global.save}
    </button>
  );
  return dropdownItems;
};

export const ActionsSVGIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};
