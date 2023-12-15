import { Outlet } from "react-router-dom";
import RequestMenu from "../../../../components/RequestMenu";

export default function ProfileOTMainPage() {
  return (
    <div className="h-full">
      <div className="h-[10%] border-b flex justify-evenly items-center px-4 text-xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <RequestMenu
          to="/ot/otform"
          link={"otform"}
          name="OT Form"
          type={"ot"}
        />
        <RequestMenu to="/ot/myot" link={"myot"} name="My OT" type={"ot"} />
      </div>
      <Outlet />
    </div>
  );
}
