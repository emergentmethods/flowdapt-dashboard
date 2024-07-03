import MainForm from "./components/MainForm";
import { getInitialWorkflowPageData, handleWorkflowNewEditRoute } from "../../components/utils";
import { notFound } from "next/navigation";

export const revalidate = 0;

const Page = async (props: Flowdapt.IPageParams) => {
  const { id, type } = handleWorkflowNewEditRoute(props);
  const workflow = await getInitialWorkflowPageData(id, type);

  if (!workflow) {
    return notFound();
  }

  return <MainForm workflow={workflow} />;
};

export default Page;
