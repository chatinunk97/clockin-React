import useLeave from "../../../../hooks/use-leave";

export default function LeaveDropdown({ type }) {
  const { userLeave } = useLeave();

  return (
    <div>
      {/* <label htmlFor="leave"></label> */}
      <select name="leave" id="leave">
        {type === "day" ? (
          <>
            <option value="fullDay">Full Day</option>
            <option value="halfMorning">Half Day (Morning)</option>
            <option value="halfAfternoon">Half Day (Afternoon)</option>
          </>
        ) : (
          <>
            {userLeave.map((userLeave) => (
              <option key={userLeave.id} value={useLeave.id}>
                {userLeave.leaveProfile.leaveName}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
