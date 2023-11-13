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
      const result = await updateRequestLeave(input);
      if (!result) {
        return;
      }
      const updatedRequestData = await dashboardAxios.get(
        `/leave/getRequestLeave/${requestLeaveId}`
      );
      setRequest(updatedRequestData.data.requestLeave);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-lg flex gap-60">
      <div>
        <div className="flex flex-row gap-2">
          <p className="font-semibold">Leave Name:</p>
          {request.userLeave.leaveProfile.leaveName}
        </div>
        <div className="flex flex-row gap-2">
          <p className="font-semibold">Start Date:</p>{" "}
          {request.startDate.split("T")[0]}
        </div>
        <div className="flex flex-row gap-2">
          <p className="font-semibold">End Date:</p>{" "}
          {request.endDate.split("T")[0]}
        </div>
        <div className="flex flex-row gap-2">
          <p className="font-semibold">Leave Type:</p> {request.leaveType}
        </div>
        <div className="flex flex-row gap-2">
          <p className="font-semibold">Leave Message:</p> {request.messageLeave}
        </div>
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
                p="px-20 py-4"
                onClick={(e) => {
                  handleButtonClick(e, "ACCEPT");
                }}
                buttonName="Approve"
              />
              <SmallButton
                p="px-20 py-4"
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
