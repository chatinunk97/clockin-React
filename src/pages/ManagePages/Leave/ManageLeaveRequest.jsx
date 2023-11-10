import { useState, useEffect } from "react";
import TableLeaveRequest from "./TableLeaveRequest";
import { dashboardAxios } from "../../../config/axios";

export default function ManageLeaveRequest() {
  const [loading, setLoading] = useState(false);
  const [requestLeaves, setRequestLeaves] = useState([]);

  useEffect(() => {
    setLoading(true);
    dashboardAxios
      .get("/leave/getAllRequestLeaves")
      .then((res) => {
<<<<<<< HEAD
        console.log(res.data.requestLeaves);
=======
        console.log(res.data.requestLeaves[1].startDate)
>>>>>>> develop
        const leaveData = res.data.requestLeaves.map((leave) => ({
          id: leave.id,
          firstName: leave.userLeave.user.firstName,
          lastName: leave.userLeave.user.lastName,
<<<<<<< HEAD
          leaveName: leave.userLeave.leaveProfile.leaveName,
          startDate: leave.startDate,
          endDate: leave.endDate,
=======
          startDate: leave.startDate.split("T")[0],
          endDate: leave.endDate.split("T")[0],
>>>>>>> develop
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
