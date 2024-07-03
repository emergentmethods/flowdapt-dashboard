import { getDictionary } from "@/i18n/dictionaries";
import useLanguageClient from "./useLanguage";

const useDictionaries = () => {
  const language = useLanguageClient();
  return getDictionary(language);
};

export default useDictionaries;
