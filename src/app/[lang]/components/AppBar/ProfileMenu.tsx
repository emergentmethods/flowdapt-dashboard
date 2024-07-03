import Image from "next/image";
import FakeAvatar from "@/assets/fake/img/photo-1534528741775-53994a69daeb.jpg";
import { IMenuLink } from "./AppBarData";
import Link from "next/link";

interface IProfileMenuProps {
  profileMenuData: IMenuLink[];
}
const ProfileMenu = (props: IProfileMenuProps) => {
  const { profileMenuData } = props;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-8 rounded-full">
          <Image src={FakeAvatar} alt="Avatar" />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-200 rounded-box w-52 z-10"
      >
        {profileMenuData.map(item => (
          <li key={item.link}>
            <Link className="justify-between" href={item.link}>
              {item.label}
              {item.badge && <span className="badge">{item.badge}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
