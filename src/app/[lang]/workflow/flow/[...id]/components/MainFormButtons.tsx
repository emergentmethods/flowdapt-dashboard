"use client";

import React from "react";
import useDictionaries from "@/hooks/useDictionaries";

interface IMainFormButtonsProps {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
}

const MainFormButtons = (props: IMainFormButtonsProps) => {
  const { formStep, setFormStep } = props;
  const dict = useDictionaries();

  return (
    <div className="flex justify-start space-x-4 mt-4">
      {formStep === 2 && (
        <button type="button" className="btn btn-secondary" onClick={() => setFormStep(1)}>
          {dict.global.back}
        </button>
      )}
      <button type="submit" className="btn btn-primary">
        {formStep === 1 ? dict.global.next : dict.global.add}
      </button>
    </div>
  );
};

export default MainFormButtons;
