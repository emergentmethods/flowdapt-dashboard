// import { profileMenuData } from "./AppBarData";
// import ProfileMenu from "./ProfileMenu";
import ChangeTheme from "../ChangeTheme";
import FlowdaptLogoTheme from "@/components/common/FlowdaptLogoTheme";

const AppBar = () => {
  return (
    <div className="navbar bg-base-200 px-8 py-2">
      <div className="navbar-start">
        <FlowdaptLogoTheme />
      </div>
      <div className="navbar-end">
        <ChangeTheme />
        {/* <ProfileMenu profileMenuData={profileMenuData} /> */}
      </div>
    </div>
  );
};

export default AppBar;
