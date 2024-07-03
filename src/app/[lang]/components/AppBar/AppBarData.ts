export interface IMenuLink {
  label: string;
  link: string;
  children?: IMenuLink[];
  badge?: string;
}
export const appBarData: IMenuLink[] = [
  {
    label: "Item 1",
    link: "/item1",
  },
  {
    label: "Item 2",
    link: "/item2",
    // children: [
    //   {
    //     label: "Item 2.1",
    //     link: "/item2/item2.1",
    //   },
    //   {
    //     label: "Item 2.2",
    //     link: "/item2/item2.2",
    //   },
    // ],
  },
  {
    label: "Item 3",
    link: "/item3",
  },
];

export const profileMenuData: IMenuLink[] = [
  {
    label: "Profile",
    link: "/profile",
    badge: "new",
  },
  {
    label: "Settings",
    link: "/settings",
  },
  {
    label: "Logout",
    link: "/logout",
  },
];
