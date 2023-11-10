import { useEffect, useState } from "react";
import useLeave from "../../../hooks/use-leave";
import { useParams } from "react-router-dom";
import { dashboardAxios } from "../../../config/axios";

export default function ViewLeaveRequest() {
  const { requestLeaveId } = useParams();
  // const { getRequestLeaveById } = useLeave();
  const { getUserLeaveByUserId } = useLeave();
  const [request, setRequest] = useState({});
  const [leaveAmount, setLeaveAmount] = useState(0);

  //////
  useEffect(() => {
    // getRequestLeaveById(requestLeaveId)
    getUserLeaveByUserId().then((userLeaveData) => {
      console.log(userLeaveData);

      const matchingUserLeave = userLeaveData.find(
        (userLeave) => userLeave.leaveProfileId === request.userLeaveId
      );

      if (matchingUserLeave) {
        setLeaveAmount(matchingUserLeave.dateAmount);
        console.log(leaveAmount);
      }
    });
    /////////
    dashboardAxios
      .get(`/leave/getRequestLeave/${requestLeaveId}`)
      .then((res) => {
        console.log(res.data.requestLeave);
        setRequest(res.data.requestLeave);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [requestLeaveId]);

  return (
    <div className="text-4xl font-semibold md:pr-20">
      <h1 className="bg-blue-300">FirstName LastName</h1>
      <div className="text-lg">
        <div className="bg-red-300">Leave Name: Leave Name</div>
        <div>Start Date: {request.startDate}</div>
        <div>End Date: {request.endDate}</div>
        <div>Leave Type: {request.leaveType}</div>
        <div>Leave Message: {request.messageLeave}</div>
        <div>Leave Amount: {leaveAmount}</div>
        <div>Request Status: {request.statusRequest}</div>
      </div>
    </div>
  );
}
