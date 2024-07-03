"use server";

import { getClient } from "@/lib/util";

export async function saveConfig(definition: any, identifier?: string) {
  const flowdaptSDK = getClient();

  if (identifier) {
    await flowdaptSDK.configs.updateConfig({
      request: definition,
      identifier: identifier,
    });
  } else {
    await flowdaptSDK.configs.createConfig({
      request: definition,
    });
  }
}

export async function deleteConfig(identifier: string) {
  const flowdaptSDK = getClient();
  await flowdaptSDK.configs.deleteConfig({ identifier: identifier });
}

export async function deleteAllConfigs(identifierList: string[]) {
  const flowdaptSDK = getClient();
  await Promise.all(identifierList.map(w => flowdaptSDK.configs.deleteConfig({ identifier: w })));
}
