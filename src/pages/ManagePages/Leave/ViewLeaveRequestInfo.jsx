import { useState } from "react";
import SmallButton from "../../../components/SmallButton";
import { dashboardAxios } from "../../../config/axios";
import useLeave from "../../../hooks/use-leave";
import { useEffect } from "react";

export default function ViewLeaveRequestInfo({
  request,
  setRequest,
  requestLeaveId,
}) {
  const { updateRequestLeave } = useLeave();
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  useEffect(() => {
    if (
      request.statusRequest === "ACCEPT" ||
      request.statusRequest === "REJECT"
    ) {
      setIsButtonVisible(false);
    }
  }, [request.statusRequest]);

  const handleButtonClick = async (e, status) => {
    try {
      e.preventDefault();
      const input = { ...request };
      delete input.userLeave;
      input.statusRequest = status;
      await updateRequestLeave(input);
      const updatedRequestData = await dashboardAxios.get(
        `/leave/getRequestLeave/${requestLeaveId}`
      );
      setRequest(updatedRequestData.data.requestLeave);

      if (status === "ACCEPT" || status === "REJECT") {
        setIsButtonVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-lg flex gap-60">
      <div>
        <div>Leave Name: {request.userLeave.leaveProfile.leaveName}</div>
        <div>Start Date: {request.startDate}</div>
        <div>End Date: {request.endDate}</div>
        <div>Leave Type: {request.leaveType}</div>
        <div>Leave Message: {request.messageLeave}</div>
      </div>
      <div>
        <div>
          Leave Quota: {request.userLeave && request.userLeave.dateAmount} days
        </div>
        <div>Leave Quota Left: XXXX days</div>
        <div>Request Status: {request.statusRequest}</div>
        <br />
        <div className="flex gap-3">
          {isButtonVisible && (
            <>
              <SmallButton
                onClick={(e) => {
                  handleButtonClick(e, "ACCEPT");
                }}
                buttonName="Approve"
              />
              <SmallButton
                onClick={(e) => {
                  handleButtonClick(e, "REJECT");
                }}
                buttonName="Reject"
                bg="bg-red-600"
                hover="hover:bg-red-400"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
