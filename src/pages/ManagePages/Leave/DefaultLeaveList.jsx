import InputBar from "../../../components/InputBar";

export default function DefaultLeaveList() {
  return (
    <div className="flex items-center gap-3">
      <h2>Annual Leave</h2>
      <InputBar />
      <span>days</span>
    </div>
  );
}
