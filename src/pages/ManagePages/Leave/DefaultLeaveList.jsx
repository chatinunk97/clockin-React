import InputBar from "../../../components/InputBar";

export default function DefaultLeaveList({ leaveObj, input }) {
  return (
    <div className="flex items-center gap-3">
      <h2>{leaveObj.leaveName}</h2>
      <InputBar
        placeholder={leaveObj.defaultDateAmount}
        isDisabled={true}
        input={input}
      />
      <span>days</span>
    </div>
  );
}
