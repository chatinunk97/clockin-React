import { Outlet } from "react-router-dom";
import RequestMenu from "../../../../components/RequestMenu";

export default function ProfileLeaveMainPage() {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="h-[10%] border-b flex justify-evenly items-center text-xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <RequestMenu
          to="/leave/leaveform"
          name="Leave Form"
          link={"leaveform"}
          type={"leave"}
        />
        <RequestMenu
          to="/leave/myleave"
          name="My Leave"
          link={"myleave"}
          type={"leave"}
        />
      </div>
      <Outlet />
    </div>
  );
}
