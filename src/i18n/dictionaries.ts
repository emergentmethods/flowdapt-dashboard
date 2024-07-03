import { merge } from "lodash-es";

export type Locale = "en" | "pt" | "en-US" | "pt-BR";
import * as en from "@/i18n/en.json";
import * as pt from "@/i18n/pt.json";
import { getLanguage } from "@/lib/util";

// We assume that the base translation is English and
// that the other translations are merged with it.
// All keys need to be present in the english translation.
export type LanguageDictType = typeof en;
// export type LanguageNamespaceTypes = keyof typeof en;

/**
 * Retrieves the dictionary for the specified locale.
 * Merges base translations (English) with the requested locale's translations.
 * @param locale - The locale for which the dictionary is to be retrieved.
 * @returns The dictionary object for the specified locale.
 */
export const getDictionary = (locale: Locale) => {
  const baseTranslation = en;
  switch (locale) {
    case "pt":
    case "pt-BR":
      return merge({}, baseTranslation, pt);
    default:
      return en;
  }
};

/**
 * Retrieves the dictionary from the server using the language from the given page properties.
 * @param pageProps - The page properties containing the language information.
 * @returns The dictionary object for the language specified in the page properties.
 */
export const getDictionaryServer = (pageProps: Flowdapt.IPageParams) => {
  const lang = getLanguage(pageProps);
  const dict = getDictionary(lang);
  return dict;
};
