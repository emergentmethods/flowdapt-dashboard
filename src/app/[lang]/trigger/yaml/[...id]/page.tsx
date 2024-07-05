import PageHeader from "@/components/PageHeader";
import { getDictionaryServer } from "@/i18n/dictionaries";
import FormConfigFromYaml from "./components/FormWorkflowFromYaml";
import { getInitialConfigPageData, handleConfigflowNewEditRoute } from "../../components/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";

export const revalidate = 0;

const Page = async (props: Flowdapt.IPageParams) => {
  const dict = getDictionaryServer(props)["configs"];
  const { id, type } = handleConfigflowNewEditRoute(props);
  const config = await getInitialConfigPageData(id, type);
  if (!config) {
    notFound();
  }

  return (
    <Container>
      <PageHeader title={dict.title} />
      <FormConfigFromYaml config={config} uid={config.metadata.name} />
    </Container>
  );
};

export default Page;
