"use client";

import { useState, useCallback, Dispatch, SetStateAction } from "react";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { LayoutDirection, getFlowDefaults, getLayoutedElements, reactFlowToStages } from "./utils";
import { useFormContext } from "react-hook-form";
import { generateFriendlyErrorMessage } from "@/lib/util";

import { useMessage } from "@/context/MessageContext/Index";
import { useRouter } from "next/navigation";
import useDictionaries from "@/hooks/useDictionaries";
import { saveWorkflow } from "@/app/[lang]/workflow/server-actions";

interface IUseMainFlow {
  initialNodes: Node[];
  initialEdges: Edge[];
  setFormStep: Dispatch<SetStateAction<number>>;
  setServerError: Dispatch<SetStateAction<string>>;
}

const useMainFlow = (params: IUseMainFlow) => {
  const { initialNodes, initialEdges, setFormStep, setServerError } = params;
  const defaults = getFlowDefaults(initialNodes, initialEdges);
  const { layoutedNodes, layoutedEdges, dagreGraph, defaultEdgeOptions } = defaults;
  const { getValues, setValue } = useFormContext();
  const { showMessage } = useMessage();
  const router = useRouter();
  const dict = useDictionaries();

  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  const onNodesChange: OnNodesChange = useCallback(
    changes =>
      setNodes(nds => {
        // console.log("nds", nds);
        return applyNodeChanges(changes, nds);
      }),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    changes =>
      setEdges(eds => {
        // console.log("eds", eds);
        return applyEdgeChanges(changes, eds);
      }),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    connection => setEdges(eds => addEdge(connection, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: LayoutDirection) => {
      const { nodes: layoutedNodes2, edges: layoutedEdges2 } = getLayoutedElements(
        nodes,
        edges,
        direction,
        dagreGraph
      );

      setNodes([...layoutedNodes2]);
      setEdges([...layoutedEdges2]);
    },
    [nodes, edges, dagreGraph]
  );

  const goBack = () => {
    const stages = reactFlowToStages(nodes, edges);
    setValue("stages", stages);
    setFormStep(1);
  };

  const save = async () => {
    const stages = reactFlowToStages(nodes, edges);
    let values = getValues();
    setValue("spec.stages", stages);

    values = getValues();

    try {
      if (values?.group) {
        values.metadata.annotations = {
          ...(values.metadata.annotations || {}),
          group: values?.group,
        };
        delete values.group;
      }
      await saveWorkflow(values, values?.metadata?.uid);
      showMessage(values.uid ? dict.global.editedMessage : dict.global.createdMessage);
      router.push("/workflow");
      router.refresh();
    } catch (e) {
      //@ts-expect-error
      const details = await e?.response?.json();
      const errorMessage = generateFriendlyErrorMessage(details, dict);
      setServerError(errorMessage);
    }
  };

  return {
    onLayout,
    onConnect,
    onNodesChange,
    onEdgesChange,
    nodes,
    edges,
    setNodes,
    defaultEdgeOptions,
    goBack,
    save,
  };
};

export default useMainFlow;
