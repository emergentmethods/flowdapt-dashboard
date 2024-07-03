import React from "react";
import { getDictionaryServer } from "@/i18n/dictionaries";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import { getClient } from "@/lib/util";
import { DashboardClientExample } from "./dashboard-client-example";

export const revalidate = 0;

async function getWorkflows() {
  const flowdaptSDK = getClient();
  const data = await flowdaptSDK.workflows.listWorkflows();
  return data.map(d => d.data);
}

export default async function WorkFlows(props: Flowdapt.IPageParams) {
  const dict = getDictionaryServer(props);
  const workflows = getWorkflows();

  return (
    <Container>
      <PageHeader title={dict.home.title} />
      <DashboardClientExample workflowsPromise={workflows} />
    </Container>
  );
}
