import { IoLocationSharp } from "react-icons/io5";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function ClockInlocation({
  checked,
  setChecked,
  setReasonLocation,
}) {
  return (
    <div className="flex justify-between h-full items-center px-5">
      <button className="text-3xl text-green-600 hover:text-blue-500">
        <IoLocationSharp />
      </button>
      <ToggleSwitch
        checked={checked}
        setChecked={setChecked}
        setReasonLocation={setReasonLocation}
      />
    </div>
  );
}
