import useLeave from "../../../../hooks/use-leave";

export default function LeaveDropdown({ onChange, name }) {
  const { userLeave } = useLeave();

  return (
    <select onChange={onChange} name={name} id="leave">
      {name === "leaveType" ? (
        <>
          <option value="FULLDAY">Full Day</option>
          <option value="FIRSTHALF">Half Day (Morning)</option>
          <option value="SECONDHALF">Half Day (Afternoon)</option>
        </>
      ) : (
        <>
          {userLeave.map((userLeave) => (
            <option key={userLeave.id} value={userLeave.id}>
              {userLeave.leaveProfile.leaveName}
            </option>
          ))}
        </>
      )}
    </select>
  );
}
