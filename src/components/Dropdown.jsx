export default function Dropdown({ type }) {
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
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="business">Business Leave</option>
          </>
        )}
      </select>
    </div>
  );
}
