export default function LeaveList({ leaveName, leaveAmount = "10" }) {
  return (
    <div className="flex justify-between">
      <div>
        <strong>{leaveName}</strong>
      </div>
      <div>{leaveAmount}</div>
    </div>
  );
}
