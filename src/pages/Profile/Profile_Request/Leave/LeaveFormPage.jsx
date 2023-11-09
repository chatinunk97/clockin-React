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
    <div className="h-[50vh]">
      <div className="bg-inputGray rounded-md">
        {userLeave.map((userLeave) => (
          <LeaveList
            key={userLeave.id}
            leaveName={userLeave.leaveProfile.leaveName}
            leaveAmount={`${userLeave.dateAmount} days`}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-2">
        <div className="flex flex-col gap-4">
          <LeaveDropdown />
          <div>
            <LeaveInfo />
          </div>
        </div>
        <div></div>
        <div className="mt-10">
          <SubmitButton p="px-20 py-3">Submit</SubmitButton>
        </div>
      </div>
    </div>
  );
}
