import { Outlet } from "react-router-dom";
import RequestMenu from "../../../../components/RequestMenu";

export default function ProfileOTMainPage() {
  return (
    <div className="h-full">
      <div className="h-[15%] flex justify-evenly items-center p-6 text-2xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <RequestMenu to="/ot/otform" name="OT Form" />
        <RequestMenu to="/ot/myot" name="My OT" />
      </div>
      <Outlet />
    </div>
  );
}
