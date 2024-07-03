import { menuData } from "./MenuData";
import Link from "next/link";

const LeftMenu = () => {
  return (
    <ul className="menu bg-base-200 px-2 content-center h-full">
      {menuData.map(item => (
        <li key={item.label} className="pb-1 m-0">
          <Link href={item.link} className="flex items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              <div className="flex justify-center">{item.Icon}</div>
              <span className="mt-1 text-center text-xs w-full overflow-ellipsis overflow-hidden whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LeftMenu;
