"use server";

import { epochNanoToJSDate, FLOWDAPT_API_VERSION, formatDate } from "@/lib/util";
import _ from "lodash";
import { MetricsOptions, metricsDefinition, MetricsData, MetricsDataDetail } from "./utils";
import { MetricsDTOType } from "@emergentmethods/flowdapt-ts-sdk";

export const handleMetricsData = async (metricsDataApi: MetricsDTOType[FLOWDAPT_API_VERSION]) => {
  const metricsMain: MetricsOptions[] = Object.keys(metricsDefinition) as MetricsOptions[];
  const metricsData: MetricsData = {};

  for (const keyName of metricsMain) {
    const metricsDataDetail: MetricsDataDetail[] = [];
    const metricsDetail = metricsDefinition?.[keyName];
    if (metricsDetail) {
      for (const detail of metricsDetail.data) {
        const apiData = (metricsDataApi?.data?.[metricsDetail.metricKeyName] || []).filter(item => {
          return _.get(item, detail.filter.field) === detail.filter.value;
        });
        apiData.forEach(item => {
          const topic = formatDate(epochNanoToJSDate(item.time_unix_nano).toISOString(), "time");
          const currentData = metricsDataDetail.find(metricsItem => metricsItem.topic === topic);

          if (currentData) {
            //@ts-ignore
            currentData[detail.name] = item.value.toString();
          } else {
            metricsDataDetail.push({
              topic,
              //@ts-ignore
              [detail.name]: item.value.toString(),
            });
          }
        });
      }
    }
    metricsData[keyName] = metricsDataDetail;
  }
  return metricsData;
};
