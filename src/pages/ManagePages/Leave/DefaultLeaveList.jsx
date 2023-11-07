import InputBar from "../../../components/InputBar";

export default function DefaultLeaveList({ leaveObj, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <h2>{leaveObj.leaveName}</h2>
      <InputBar
        type="text"
        placeholder={leaveObj.defaultDateAmount}
        value={value}
        onChange={onChange}
      />
      <span>days</span>
    </div>
  );
}
