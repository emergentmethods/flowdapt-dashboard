"use server";

import { getHealth } from "../../dashboardData";
import HealthClient from "./HealthClient";
import { handleHealthData } from "./utils";
import { LanguageDictType } from "@/i18n/dictionaries";

const getHealthPageData = async (dict: LanguageDictType) => {
  const healthData = await getHealth();
  const { statusData, servicesData } = handleHealthData(healthData, dict);
  return { statusData, servicesData };
};
interface IHealthProps {
  dict: LanguageDictType;
}
const Health = async (props: IHealthProps) => {
  const { dict } = props;
  const healthPromise = getHealthPageData(dict);

  return <HealthClient healthPromise={healthPromise} />;
};
export default Health;
