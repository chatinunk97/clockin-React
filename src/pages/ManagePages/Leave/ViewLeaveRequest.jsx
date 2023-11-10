import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dashboardAxios } from "../../../config/axios";
import LoadingBar from "../../../components/LoadingBar";
import SmallButton from "../../../components/SmallButton";
import useLeave from "../../../hooks/use-leave";

export default function ViewLeaveRequest() {
  const { updateRequestLeave } = useLeave();
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

  const handleApproveClick = async (e) => {
    try {
      e.preventDefault();
      const input = { ...request };
      delete input.userLeave;
      input.statusRequest = "ACCEPT";
      console.log(input);
      await updateRequestLeave(input);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <div className="text-4xl font-semibold w-full m-auto ml-40">
            <h1>
              {request.userLeave.user.firstName}{" "}
              {request.userLeave.user.lastName}
            </h1>
            <br />
            <div className="text-lg flex gap-60">
              <div>
                <div>
                  Leave Name: {request.userLeave.leaveProfile.leaveName}
                </div>
                <div>Start Date: {request.startDate}</div>
                <div>End Date: {request.endDate}</div>
                <div>Leave Type: {request.leaveType}</div>
                <div>Leave Message: {request.messageLeave}</div>
              </div>
              <div>
                <div>
                  Leave Quota:{" "}
                  {request.userLeave && request.userLeave.dateAmount} days
                </div>
                <div>Leave Quota Left: XXXX days</div>
                <div>Request Status: {request.statusRequest}</div>
                <br />
                <div className="flex gap-3">
                  <SmallButton
                    onClick={handleApproveClick}
                    buttonName="Approve"
                  />
                  <SmallButton
                    buttonName="Reject"
                    bg="bg-red-600"
                    hover="hover:bg-red-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
