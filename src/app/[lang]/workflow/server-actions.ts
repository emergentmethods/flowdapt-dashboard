"use server";

import { getClient } from "@/lib/util";

export async function saveWorkflow(definition: any, identifier?: string) {
  const flowdaptSDK = getClient();

  if (identifier) {
    await flowdaptSDK.workflows.updateWorkflow({
      request: definition,
      identifier: identifier,
    });
  } else {
    await flowdaptSDK.workflows.createWorkflow({
      request: definition,
    });
  }
}

export async function deleteWorkflow(identifier: string) {
  const flowdaptSDK = getClient();
  await flowdaptSDK.workflows.deleteWorkflow({ identifier: identifier });
}

export async function deleteAllWorkflow(identifierList: string[]) {
  const flowdaptSDK = getClient();
  await Promise.all(
    identifierList.map(w => flowdaptSDK.workflows.deleteWorkflow({ identifier: w }))
  );
}

interface IRunWorkflow {
  identifier: string;
  input?: any;
  wait?: boolean;
}
export async function runWorkflow(params: IRunWorkflow) {
  const { identifier, input, wait = true } = params;
  const flowdaptSDK = getClient();
  const result = await flowdaptSDK.workflows.runWorkflow({
    identifier: identifier,
    input: input ? JSON.parse(input) : undefined,
    wait: wait,
  });
  return result.data;
}
