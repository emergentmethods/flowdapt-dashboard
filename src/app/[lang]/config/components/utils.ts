import { notFound } from "next/navigation";
import { FLOWDAPT_API_VERSION, getClient } from "@/lib/util";
import { ConfigData } from "./ConfigList";
import { ConfigResourceReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

export async function getConfigs() {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.configs.listConfigs();
  return data;
}

export async function getConfigFlatData() {
  const data = await getConfigs();
  const configData: ConfigData[] = data.map(i => {
    return {
      name: i.data.metadata.name,
      uid: i.data.metadata.uid,
      group: i.data.metadata.annotations?.group || "",
      created_at: i.data.metadata?.created_at?.toISOString(),
      updated_at: i.data.metadata?.updated_at?.toISOString(),
    };
  });
  return configData;
}

export async function getConfig(id: string) {
  const flowdaptSDK = getClient();
  try {
    const mainData = await flowdaptSDK.configs.getConfig({
      identifier: id,
    });
    return mainData.data;
  } catch (e) {
    return null;
  }
}

export const handleConfigflowNewEditRoute = (props: Flowdapt.IPageParams) => {
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

export const getInitialConfigPageData = async (id: string, type: "new" | "edit") => {
  if (type === "new") {
    const config: ConfigResourceReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] = {
      kind: "config",
      metadata: {
        name: "",
        annotations: {},
      },
      spec: {
        selector: {
          type: "annotation",
          value: "",
        },
        data: {},
      },
    };
    return config;
  } else {
    const config = await getConfig(id);
    return config;
  }
};
