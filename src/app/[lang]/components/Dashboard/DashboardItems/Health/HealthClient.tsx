"use client";

import useDictionaries from "@/hooks/useDictionaries";
import { Card, Title, List, ListItem, Grid, Badge } from "@tremor/react";
import { use } from "react";

export type IHealthClientData = {
  label: string;
  value: string;
  type?: "regular" | "link";
  badge?: string;
};
interface IListItemDataProps {
  item: IHealthClientData;
}

const ListItemData = (props: IListItemDataProps) => {
  const { item } = props;
  return (
    <ListItem key={item.label}>
      <span>
        {item.label}
        {item.badge && <Badge className="ml-2">{item.badge}</Badge>}
      </span>
      {item.type === "link" ? (
        <a href={item.value} target="_blank" title={item.label} rel="noreferrer">
          {item.value}
        </a>
      ) : (
        <span>{item.value}</span>
      )}
    </ListItem>
  );
};

interface IHealthClientProps {
  healthPromise: Promise<{
    statusData: IHealthClientData[];
    servicesData: IHealthClientData[];
  }>;
}

const HealthClient = (props: IHealthClientProps) => {
  const { healthPromise } = props;
  const { statusData, servicesData } = use(healthPromise);
  const dict = useDictionaries();

  return (
    <Grid numItemsLg={2} className="mt-6 gap-6">
      <Card>
        <Title>{dict.home.serverInformation}</Title>
        <List>
          {statusData.map(item => (
            <ListItemData key={item.label} item={item} />
          ))}
        </List>
      </Card>
      <Card>
        <Title>{dict.home.servicesStatus}</Title>
        <List>
          {servicesData.map(item => (
            <ListItemData key={item.label} item={item} />
          ))}
        </List>
      </Card>
    </Grid>
  );
};

export default HealthClient;
