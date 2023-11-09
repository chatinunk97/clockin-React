import LeaveInfo from "./LeaveInfo";
import LeaveList from "./LeaveList";
import LeaveDropdown from "./LeaveDropdown";
import SubmitButton from "../../../../components/SubmitButton";
import useLeave from "../../../../hooks/use-leave";
import { useEffect } from "react";

export default function LeaveFormPage() {
  const { userLeave, getUserLeaveByUserId } = useLeave();

  useEffect(() => {
    getUserLeaveByUserId();
  }, []);

  return (
    <div className="h-[90%] p-4 flex flex-col items-center gap-5 ">
      <div className="h-auto min-h-[30%] overflow-auto w-full flex flex-col justify-start gap-4 p-4 bg-inputGray rounded-md ">
        {userLeave.map((userLeave) => (
          <LeaveList
            key={userLeave.id}
            leaveName={userLeave.leaveProfile.leaveName}
            leaveAmount={`${userLeave.dateAmount} days`}
          />
        ))}
      </div>
      <div className="  flex flex-col justify-center items-center w-full h-full">
        {/* <div className="flex flex-col gap-4">
          <LeaveDropdown />
          <div>
          </div>
        </div> */}
        <LeaveInfo />
      </div>
      {/* <div className="p-2 h-[15%]  flex justify-center items-center">
        <SubmitButton p="px-20 py-3">Submit</SubmitButton>
      </div> */}
    </div>
  );
}
