import { useState, useEffect } from "react";
import TableLeaveRequest from "./TableLeaveRequest";
import { dashboardAxios } from "../../../config/axios";
// import useLeave from "../../../hooks/use-leave";

export default function ManageLeaveRequest() {
  // const { getAllRequestLeaves } = useLeave();
  const [loading, setLoading] = useState(true);
  const [requestLeaves, setRequestLeaves] = useState([]);

  useEffect(() => {
    dashboardAxios
      .get("/leave/getAllRequestLeaves")
      // getAllRequestLeaves()
      .then((res) => {
        console.log(res.data);
        const leaveData = res.data.requestLeaves.map((leave) => ({
          id: leave.id,
          firstName: leave.userLeave.user.firstName,
          lastName: leave.userLeave.user.lastName,
          leaveName: leave.userLeave.leaveProfile.leaveName,
          startDate: leave.startDate.split("T")[0],
          endDate: leave.endDate.split("T")[0],
          statusRequest: leave.statusRequest,
          messageLeave: leave.messageLeave,
        }));
        setRequestLeaves(leaveData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
      <TableLeaveRequest requestLeaves={requestLeaves} loading={loading} />
    </div>
  );
}
