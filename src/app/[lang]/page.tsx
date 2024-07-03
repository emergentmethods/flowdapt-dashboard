import React from "react";
import { getDictionaryServer } from "@/i18n/dictionaries";
import PageHeader from "@/components/PageHeader";
import Container from "@/components/Container";
import Dashboard from "./components/Dashboard";

export const revalidate = 0;

export default async function WorkFlows(props: Flowdapt.IPageParams) {
  const dict = getDictionaryServer(props);

  return (
    <Container>
      <PageHeader title={dict.home.title} />
      <Dashboard dict={dict} />
    </Container>
  );
}
