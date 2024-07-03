"use client";

import { LanguageDictType } from "@/i18n/dictionaries";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { useTheme } from "next-themes";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { githubLight } from "@uiw/codemirror-theme-github";
import { FLOWDAPT_API_VERSION, formatDate } from "@/lib/util";
import { WorkflowRunReadResponseDTOType } from "@emergentmethods/flowdapt-ts-sdk";

interface IResultDisplayDataProps {
  dict: LanguageDictType;
  result: WorkflowRunReadResponseDTOType[FLOWDAPT_API_VERSION]["data"] | undefined;
}

const ResultDisplayData = (props: IResultDisplayDataProps) => {
  const { dict, result } = props;
  const { theme } = useTheme();

  const isDark = theme === "flowdapt_dark";

  return (
    <div className="mt-6 grid lg:grid-cols-2">
      <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 px-4">
        <div className="w-full flex flex-col">
          <div className="flex-1 rounded-lg px-8">
            <h4 className="text-lg font-bold">{dict.workflow.runningWorkflowResult}</h4>
            <ul className="mt-6">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.global.startedAt}:</span>
                {/* @ts-ignore */}
                <span>{result?.started_at ? formatDate(result?.started_at, "datetime") : ""}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.global.finishedAt}:</span>
                {/* @ts-ignore */}
                <span>{formatDate(result?.finished_at, "datetime")}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.workflow.workflowState}:</span>
                <span>{result?.state}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.global.uid}:</span>
                <span>{result?.uid}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.global.name}:</span>
                <span>{result?.name}</span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.global.result}:</span>
                <span>
                  {typeof result?.result === "object" ? (
                    <pre className="text-xs">{JSON.stringify(result?.result, null, 2)}</pre>
                  ) : (
                    (result?.result || "").toString()
                  )}
                </span>
              </li>
              <li className="flex border-y py-2">
                <span className="font-bold w-24">{dict.workflow.workflowUid}:</span>
                <span>{result?.uid}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 mt-6 lg:mt-0">
        <h4 className="text-lg font-bold mb-4">{dict.workflow.runningWorkflowJsonResult}</h4>
        <CodeMirror
          value={JSON.stringify(result, null, 4)}
          height={"400px"}
          extensions={[json()]}
          theme={isDark ? vscodeDark : githubLight}
        />
      </div>
    </div>
  );
};

export default ResultDisplayData;
