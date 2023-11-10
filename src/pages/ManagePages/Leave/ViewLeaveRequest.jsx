import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dashboardAxios } from "../../../config/axios";
import LoadingBar from "../../../components/LoadingBar";

export default function ViewLeaveRequest() {
  const { requestLeaveId } = useParams();
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardAxios
      .get(`/leave/getRequestLeave/${requestLeaveId}`)
      .then((res) => {
        console.log(res.data.requestLeave);
        setRequest(res.data.requestLeave);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestLeaveId]);

  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="text-4xl font-semibold md:pr-20">
            <h1 className="bg-blue-300">FirstName LastName</h1>
            <div className="text-lg">
              <div className="bg-red-300">
                Leave Name: {request.userLeave.leaveProfile.leaveName}
              </div>
              <div>Start Date: {request.startDate}</div>
              <div>End Date: {request.endDate}</div>
              <div>Leave Type: {request.leaveType}</div>
              <div>Leave Message: {request.messageLeave}</div>
              <div>
                Leave Quota: {request.userLeave && request.userLeave.dateAmount}{" "}
                days
              </div>
              <div>Request Status: {request.statusRequest}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
