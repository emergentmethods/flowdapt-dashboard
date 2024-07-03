import PageHeader from "@/components/PageHeader";
import { getDictionaryServer } from "@/i18n/dictionaries";
import FormWorkflowFromYaml from "./components/FormWorkflowFromYaml";
import { getInitialWorkflowPageData, handleWorkflowNewEditRoute } from "../../components/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";

export const revalidate = 0;

const Page = async (props: Flowdapt.IPageParams) => {
  const dict = getDictionaryServer(props)["workflow"];
  const { id, type } = handleWorkflowNewEditRoute(props);
  const workflow = await getInitialWorkflowPageData(id, type);
  if (!workflow) {
    notFound();
  }

  return (
    <Container>
      <PageHeader title={dict.title} />
      <FormWorkflowFromYaml workflow={workflow} uid={workflow.metadata.name} />
    </Container>
  );
};

export default Page;
