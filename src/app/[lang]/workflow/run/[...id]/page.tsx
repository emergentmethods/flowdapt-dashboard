import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Spinner from "@/components/common/Spinner";
import { Suspense } from "react";
import { getDictionaryServer } from "@/i18n/dictionaries";
import MainForm from "./components/MainForm";
import { getWorkflow } from "../../components/utils";
import { notFound } from "next/navigation";

const RunWorkflowPage = async (props: Flowdapt.IPageParams) => {
  const dict = getDictionaryServer(props)["workflow"];
  const workflowName = (props?.params?.["id"] || [])[0] || "";
  const workflow = await getWorkflow(workflowName);

  if (!workflow) {
    return notFound();
  }
  return (
    <Container>
      <div className="w-100">
        <Suspense fallback={<Spinner />}>
          <PageHeader title={`${dict.runWorkflow} (${workflow.metadata.name})`} />
          {/* {workflow.description ? <p className="mb-4 italic">{workflow.description}</p> : null} */}
          <hr className="my-4" />
          <MainForm workflowName={workflowName} />
        </Suspense>
      </div>
    </Container>
  );
};

export default RunWorkflowPage;
