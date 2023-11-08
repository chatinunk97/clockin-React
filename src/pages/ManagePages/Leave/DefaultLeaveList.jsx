import InputBar from "../../../components/InputBar";
import SubmitButton from "../../../components/SubmitButton";

export default function DefaultLeaveList({
  leaveObj,
  value,
  onChange,
  isDisabled,
}) {
  return (
    <div className="flex items-center gap-3">
      <h2>{leaveObj.leaveName}</h2>
      <InputBar
        type="text"
        placeholder={leaveObj.defaultDateAmount}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
      />
      <span>days</span>
      <div>
        <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
          Edit
        </SubmitButton>
        <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
          Add
        </SubmitButton>
      </div>
    </div>
  );
}
