import LeaveList from "../../../components/Profile/LeaveList";
import SubmitButton from "../../../components/SubmitButton";

export default function LeaveFormPage() {
  return (
    <div>
      <div>
        <div className="bg-inputGray m-6 p-6 rounded-md">
          <LeaveList leaveName="Sick Leave" leaveAmount="15 days" />
          <LeaveList leaveName="Annual Leave" leaveAmount="30 days" />
          <LeaveList leaveName="Business Leave" leaveAmount="3 days" />
        </div>
        <div>
          <div>dropdown</div>
          <div>calendar</div>
        </div>
        <div className="text-center">
          <SubmitButton p="px-20 py-3">Submit</SubmitButton>
        </div>
      </div>
    </div>
  );
}
