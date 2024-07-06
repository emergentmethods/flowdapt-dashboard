import { ForwardIcon, HomeIcon, CogIcon, FireIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export const menuData: {
  label: string;
  Icon: ReactNode;
  link: string;
}[] = [
  {
    label: "Home",
    link: "/",
    Icon: <HomeIcon className="w-7 h-7" />,
  },
  {
    label: "Workflow",
    link: "/workflow",
    Icon: <ForwardIcon className="w-7 h-7" />,
  },
  {
    label: "Configurations",
    link: "/config",
    Icon: <CogIcon className="w-7 h-7" />,
  },
  {
    label: "Triggers",
    link: "/trigger",
    Icon: <FireIcon className="w-7 h-7" />,
  },
];
