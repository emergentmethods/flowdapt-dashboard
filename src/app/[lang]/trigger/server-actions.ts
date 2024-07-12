"use server";

import { getClient } from "@/lib/util";

export async function saveTrigger(definition: any, id?: string) {
  const flowdaptSDK = getClient();

  if (id) {
    await flowdaptSDK.triggers.updateTrigger({
      request: definition,
      id: id,
    });
  } else {
    await flowdaptSDK.triggers.createTrigger({
      request: definition,
    });
  }
}

export async function deleteTrigger(id: string) {
  const flowdaptSDK = getClient();
  await flowdaptSDK.triggers.deleteTrigger({ id: id });
}

export async function deleteAllTriggers(idList: string[]) {
  const flowdaptSDK = getClient();
  await Promise.all(idList.map(w => flowdaptSDK.triggers.deleteTrigger({ id: w })));
}
