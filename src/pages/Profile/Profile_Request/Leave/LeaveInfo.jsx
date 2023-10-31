import { AiFillCalendar } from "react-icons/ai";
import { BsFillClipboard2Fill } from "react-icons/bs";
import LeaveDropdown from "./LeaveDropdown";

export default function LeaveInfo() {
  return (
    <div>
      <div className="flex items-center gap-6 w-[300px]">
        <button className="text-3xl text-slate-700">
          <AiFillCalendar />
        </button>
        <div className="text-lg border-b border-b-neutral-400 w-[300px] text-center cursor-none">
          Start Date
        </div>
      </div>
      <div className="flex items-center gap-6 w-[300px]">
        <button className="text-3xl text-slate-700">
          <AiFillCalendar />
        </button>
        <div className="text-lg border-b border-b-neutral-400 w-[300px] text-center cursor-none">
          End Date
        </div>
      </div>
      <LeaveDropdown type="day" />
      <div className="flex items-center">
        <div className="text-3xl text-slate-700">
          <BsFillClipboard2Fill />
        </div>
        <input
          type="text"
          placeholder="Leave Information"
          className="border-b border-b-neutral-400  text-start p-4 focus:ring focus:ring-green-300  focus:border-green-500 outline-none"
        />
      </div>
    </div>
  );
}
