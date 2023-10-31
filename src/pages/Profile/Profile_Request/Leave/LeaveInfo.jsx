import { AiFillCalendar } from "react-icons/ai";
import { BsFillClipboard2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LeaveDropdown from "./LeaveDropdown";
export default function LeaveInfo() {

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 w-[300px] ">
        <button className="text-3xl text-slate-700 hover:text-green-600">
          <AiFillCalendar />
        </button>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          placeholderText="Select Date"
          className='w-56 border border-stone-200 shadow-sm rounded-md cursor-pointer p-1'
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}

        />
      </div>
      <div>
        <LeaveDropdown type="day" />
      </div>
      <div className="flex items-center">
        <div className="text-3xl text-slate-700 hover:text-green-600">
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