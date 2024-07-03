import Spinner from "@/components/common/Spinner";
import { LanguageDictType } from "@/i18n/dictionaries";
import { Dispatch, SetStateAction } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import ResultDisplayData from "./ResultDisplayData";
import { FLOWDAPT_API_VERSION } from "@/lib/util";
import { WorkflowRunReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

interface IResultProps {
  dict: LanguageDictType;
  result: WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | undefined;
  errorMessage: string;
  isRunning: boolean;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setWorkflowResult: Dispatch<
    SetStateAction<WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | undefined>
  >;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
}

const ResultWorkflowRun = (props: IResultProps) => {
  const {
    dict,
    result,
    errorMessage,
    isRunning,
    setErrorMessage,
    setIsRunning,
    setWorkflowResult,
  } = props;

  const goBack = () => {
    setErrorMessage("");
    setIsRunning(false);
    setWorkflowResult(undefined);
  };
  if (isRunning) {
    return (
      <div className="mt-2">
        <div className="alert alert-info mt-2">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <span>{dict.workflow.workflowRunningMessage}</span>
        </div>
        <div className="mt-12">
          <Spinner />
        </div>
        <button className="btn btn-secondary mt-12" onClick={goBack}>
          {dict.global.back}
        </button>
      </div>
    );
  }
  return (
    <div className="mt-6">
      {result && <ResultDisplayData dict={dict} result={result} />}
      {errorMessage && (
        <>
          <p className="mb-6">{dict.workflow.runningWorkflowResult}</p>
          <div className="alert alert-error">
            <div className="flex-1">
              <label>Error: {errorMessage}</label>
            </div>
          </div>
        </>
      )}
      <button className="btn btn-secondary mt-12" onClick={goBack}>
        {dict.global.back}
      </button>
    </div>
  );
};

export default ResultWorkflowRun;
