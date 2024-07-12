import PageHeader from "@/components/PageHeader";
import { getDictionaryServer } from "@/i18n/dictionaries";
import FormConfigFromYaml from "./components/FormWorkflowFromYaml";
import { getInitialTriggerPageData, handleTriggerflowNewEditRoute } from "../../components/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";

export const revalidate = 0;

const Page = async (props: Flowdapt.IPageParams) => {
  const dict = getDictionaryServer(props)["trigger"];
  const { id, type } = handleTriggerflowNewEditRoute(props);
  const trigger = await getInitialTriggerPageData(id, type);
  if (!trigger) {
    notFound();
  }

  return (
    <Container>
      <PageHeader title={dict.title} />
      <FormConfigFromYaml trigger={trigger} uid={trigger.metadata.name} />
    </Container>
  );
};

export default Page;
