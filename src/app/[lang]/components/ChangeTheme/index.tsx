"use client";

import { useTheme } from "next-themes";
import useDictionaries from "@/hooks/useDictionaries";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

const ChangeTheme = () => {
  const { setTheme, theme } = useTheme();
  const dict = useDictionaries();
  const changeTheme = () => {
    if (theme === "flowdapt_dark") {
      setTheme("flowdapt_light");
    } else {
      setTheme("flowdapt_dark");
    }
  };
  const title =
    theme === "flowdapt_dark" ? dict?.global?.changeThemeToLight : dict?.global?.changeThemeToDark;

  return (
    <button className="btn btn-ghost tooltip tooltip-left" data-tip={title} onClick={changeTheme}>
      {theme === "flowdapt_dark" ? (
        <SunIcon className="w-4 h-4" />
      ) : (
        <MoonIcon className="w-4 h-4" />
      )}
    </button>
  );
};

export default ChangeTheme;
