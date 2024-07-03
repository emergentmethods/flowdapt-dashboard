import { IMenuLink } from "./AppBarData";

interface IRenderMenuProps {
  menuData: IMenuLink[];
  subLevel?: boolean;
}

const RenderMenu = (props: IRenderMenuProps) => {
  const { menuData, subLevel = false } = props;
  return (
    <ul className={!subLevel ? "menu menu-horizontal px-1" : "p-2 bg-base-100 menu"}>
      {menuData.map((item, index) => (
        <li key={index}>
          <a>
            {item.label}
            {item.children && (
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            )}
          </a>
          {item.children && <RenderMenu menuData={item.children} subLevel />}
        </li>
      ))}
    </ul>
  );
};

export default RenderMenu;
