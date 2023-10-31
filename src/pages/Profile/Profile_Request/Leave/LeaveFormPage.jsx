import LeaveInfo from "./LeaveInfo";
import LeaveList from "./LeaveList";
import LeaveDropdown from "./LeaveDropdown";
import SubmitButton from "../../../../components/SubmitButton";

export default function LeaveFormPage() {
  return (
    <div>
      <div className="bg-inputGray m-6 p-6 rounded-md">
        <LeaveList leaveName="Sick Leave" leaveAmount="15 days" />
        <LeaveList leaveName="Annual Leave" leaveAmount="30 days" />
        <LeaveList leaveName="Business Leave" leaveAmount="3 days" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 p-2">
        <div className="flex flex-col gap-4">
          <LeaveDropdown />
          <div>
            <LeaveInfo />
          </div>
        </div>
        <div>
        </div>
        <div className="mt-10">
          <SubmitButton p="px-20 py-3">Submit</SubmitButton>
        </div>
      </div>
    </div>
  );
}
