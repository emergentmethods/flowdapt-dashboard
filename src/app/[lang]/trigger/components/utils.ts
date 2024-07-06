import { notFound } from "next/navigation";
import { FLOWDAPT_API_VERSION, getClient } from "@/lib/util";
import { TriggerData } from "./TriggerList";
import { TriggerRuleResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

export async function getTriggers() {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.triggers.listTriggers();
  return data;
}

export async function getTriggersFlatData() {
  const data = await getTriggers();
  const triggerData: TriggerData[] = data.map(i => {
    return {
      name: i.data.metadata.name,
      type: i.data.spec.type,
      uid: i.data.metadata.uid,
      group: i.data.metadata.annotations?.group || "",
      created_at: i.data.metadata?.created_at?.toISOString(),
      updated_at: i.data.metadata?.updated_at?.toISOString(),
    };
  });
  return triggerData;
}

export async function getTrigger(id: string) {
  const flowdaptSDK = getClient();
  try {
    const mainData = await flowdaptSDK.triggers.getTrigger({
      id: id,
    });
    return mainData.data;
  } catch (e) {
    return null;
  }
}

export const handleTriggerflowNewEditRoute = (props: Flowdapt.IPageParams) => {
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

export const getInitialTriggerPageData = async (id: string, type: "new" | "edit") => {
  if (type === "new") {
    const trigger: TriggerRuleResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] = {
      kind: "trigger",
      metadata: {
        name: "",
        annotations: {},
      },
      spec: {
        type: "schedule",
        rule: {},
        action: {
          target: "",
          parameters: {},
        },
      },
    };
    return trigger;
  } else {
    const trigger = await getTrigger(id);
    return trigger;
  }
};
