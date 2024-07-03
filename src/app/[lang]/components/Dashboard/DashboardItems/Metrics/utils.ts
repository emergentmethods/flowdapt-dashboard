import { Color } from "@tremor/react";

export type MetricsOptions = "CPU Utilization" | "Memory Utilization" | "Disk Operations";

export type MetricsDefinition = {
  [key in MetricsOptions]?: {
    data: {
      name: string;
      filter: {
        field: string;
        value: string;
      };
      color: Color;
    }[];
    metricKeyName: string;
  };
};

export type MetricsDataDetail = {
  topic: string;
  [key: string]: string;
};
export type MetricsData = {
  [key in MetricsOptions]?: MetricsDataDetail[];
};

export const metricsDefinition: MetricsDefinition = {
  "CPU Utilization": {
    data: [
      {
        name: "CPU Utilization - User",
        filter: {
          field: "attributes.state",
          value: "user",
        },
        color: "teal",
      },
      {
        name: "CPU Utilization - System",
        filter: {
          field: "attributes.state",
          value: "system",
        },
        color: "amber",
      },
    ],
    metricKeyName: "system.cpu.utilization",
  },
  "Memory Utilization": {
    data: [
      {
        name: "Memory Utilization - Used",
        filter: {
          field: "attributes.state",
          value: "used",
        },
        color: "blue",
      },
      {
        name: "Memory Utilization - Cache",
        filter: {
          field: "attributes.state",
          value: "cached",
        },
        color: "emerald",
      },
    ],
    metricKeyName: "system.memory.utilization",
  },
  "Disk Operations": {
    data: [
      {
        name: "Disk Operations - Read",
        filter: {
          field: "attributes.direction",
          value: "read",
        },
        color: "blue",
      },
      {
        name: "Disk Operations - Write",
        filter: {
          field: "attributes.direction",
          value: "write",
        },
        color: "emerald",
      },
    ],
    metricKeyName: "system.disk.operations",
  },
};
