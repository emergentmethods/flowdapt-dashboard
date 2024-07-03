import { Locale } from "@/i18n/dictionaries";
import { usePathname } from "next/navigation";

/**
 * Custom hook to extract the language code from the URL.
 * It matches the URL pattern: http://localhost:3000/en-US/... or
 * https://www.anyaddress.com/en-US/...
 * @returns The language code as a Locale type, for example, 'en-US'.
 */
const useLanguage = () => {
  const pathname = usePathname();
  const languageCode = pathname.split("/")[1] || "en";
  return languageCode as Locale;
};

export default useLanguage;
