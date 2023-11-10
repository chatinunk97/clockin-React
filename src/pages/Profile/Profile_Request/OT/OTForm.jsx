import { AiFillCalendar } from "react-icons/ai";
import { LuClock7 } from "react-icons/lu";
import useOT from "../../../../hooks/use-OT";
import { BsFillClipboard2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function OTform() {
  const [startDate, setStartDate] = useState(new Date());
  const [filterClock , setFilterClock] = useState("")
  console.log(useOT().clockList)
  return (
    <div className="flex flex-col justify-center items-start p-4 mt-12 gap-4 md:items-center md:p-20 md:mt-0">
      <h1 className=" text-3xl font-bold">Informationss</h1>
      <div>
        <div className="flex items-center gap-6 w-[300px]">
          <button className="text-3xl text-slate-700">
            <AiFillCalendar />
          </button>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Select Date"
            className="w-56 border border-stone-200 shadow-sm rounded-md cursor-pointer p-1"
          />
        </div>
        <div className="flex">
          <div>Clock Icon</div>
          <div>Clock option</div>
        </div>
        <div className="flex items-center gap-4 pt-6">
          <div className="text-3xl text-slate-700">
            <BsFillClipboard2Fill />
          </div>
          <input
            type="text"
            placeholder="Request OT"
            className="border-b border-b-neutral-400  text-start p-4 focus:ring focus:ring-green-300  focus:border-green-500 outline-none"
          />
        </div>
      </div>
      <hr className="w-full border-stone-300" />
      <div className="p-4 w-full md:w-[400px]">
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Date</div>
          <div>30/10/2023</div>
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Time</div>
          <div>17:00-20:00</div>
        </div>
        <div className="flex justify-between">
          <div className="text-xl font-semibold">Total</div>
          <div>2 HR</div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-green-600 w-full p-4 rounded-full hover:bg-green-400 md:w-[600px]">
        <button className="text-xl text-white">Submit</button>
      </div>
    </div>
  );
}
