import { notFound } from "next/navigation";
import { FLOWDAPT_API_VERSION, getClient } from "@/lib/util";
import { WorkflowResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

export async function getWorkflows() {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.workflows.listWorkflows();
  return data;
}

export async function getMetadataWorkflows() {
  const data = await getWorkflows();
  return data
    .map(d => d.data)
    .map(i => {
      const group = i.metadata.annotations?.group || "";
      return { ...i.metadata, group: group || "" };
    });
}

export async function getWorkflow(id: string) {
  const flowdaptSDK = getClient();
  try {
    const mainData = await flowdaptSDK.workflows.getWorkflow({
      identifier: id,
    });
    return mainData.data;
  } catch (e) {
    return null;
  }
}

export const getInitialWorkflowPageData = async (id: string, type: "new" | "edit") => {
  if (type === "new") {
    const workflow: WorkflowResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] = {
      kind: "workflow",
      metadata: {
        name: "",
        annotations: {},
      },
      spec: {
        stages: [],
      },
    };
    return workflow;
  } else {
    const workflow = await getWorkflow(id);
    return workflow;
  }
};

export const handleWorkflowNewEditRoute = (props: Flowdapt.IPageParams) => {
  const action = (props?.params?.id || [])[0];
  const editId = (props?.params?.id || [])[1];

  if (["edit", "new"].indexOf(action) === -1) {
    notFound();
  }
  if (action === "new" && editId) {
    notFound();
  }
  if (action === "edit" && !editId) {
    notFound();
  }
  return { id: editId, type: action as "new" | "edit" };
};
