import { AiFillCalendar } from "react-icons/ai";
import { BsFillClipboard2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LeaveDropdown from "./LeaveDropdown";
import SubmitButton from "../../../../components/SubmitButton";
export default function LeaveInfo({createRequestLeave}) {
  const [input, setInput] = useState({
    userLeaveId: "",
    startDate: "",
    endDate: "",
    messageLeave: "",
    leaveType:""
  });

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      createRequestLeave(input)
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleDatePicker = (e)=>{
   setInput({...input , startDate : e[0] , endDate : e[1] })
  }
  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
      <LeaveDropdown
        onChange={handleChange}
        name={"userLeaveId"}
        value={input.userLeaveId}
      />
      <div className="flex items-center gap-2 w-[300px] ">
        <button className="text-3xl text-slate-700 hover:text-green-600">
          <AiFillCalendar />
        </button>
        <DatePicker
          selectsRange={true}
          startDate={input.startDate}
          endDate={input.endDate}
          placeholderText="Select Date"
          className="w-56 border border-stone-200 shadow-sm rounded-md cursor-pointer p-1"
          onChange={handleDatePicker}
          isClearable={true}
        />
      </div>
      <LeaveDropdown
        onChange={handleChange}
        name={"leaveType"}
        value={input.leaveType}
      />
      <div className="flex items-center">
        <div className="text-3xl text-slate-700 hover:text-green-600">
          <BsFillClipboard2Fill />
        </div>
        <input
          name="messageLeave"
          onChange={handleChange}
          value={input.messageLeave}
          type="text"
          placeholder="Leave Information"
          className="border-b border-b-neutral-400  text-start p-4 focus:ring focus:ring-green-300  focus:border-green-500 outline-none"
        />
      </div>
      <div className="p-2 h-[15%]  flex justify-center items-center">
        <SubmitButton p="px-20 py-3">Submit</SubmitButton>
      </div>
    </form>
  );
}
