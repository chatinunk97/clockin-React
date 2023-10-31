import { Outlet } from "react-router-dom";
import RequestMenu from "../../../../components/RequestMenu";

export default function ProfileOTMainPage() {
  return (
    <div>
      <div className="flex justify-evenly items-center p-6 text-2xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <RequestMenu to="/profile/ot" name="OT Form" />
        <RequestMenu to="/profile/myot" name="My OT" />
      </div>
      <Outlet />
    </div>
  );
}
