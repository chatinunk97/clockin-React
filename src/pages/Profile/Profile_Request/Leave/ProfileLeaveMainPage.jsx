import { Outlet } from "react-router-dom";
import RequestMenu from "../../../../components/RequestMenu";

export default function ProfileLeaveMainPage() {
  return (
    <div>
      <div className="flex justify-evenly items-center p-6 text-2xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <RequestMenu to="/leave/leaveform" name="Leave Form" />
        <RequestMenu to="/leave/myleave" name="My Leave" />
      </div>
      <Outlet />
    </div>
  );
}
