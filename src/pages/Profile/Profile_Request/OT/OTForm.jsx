import { AiFillCalendar } from "react-icons/ai";
import { LuClock7 } from "react-icons/lu";
import useOT from "../../../../hooks/use-OT";
import DropdownSearch from "../../../../components/DropdownSearch";
import { BsFillClipboard2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import SubmitButton from "../../../../components/SubmitButton";
import InputBar from "../../../../components/InputBar";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function OTform() {
  const [startDate, setStartDate] = useState(new Date());
  const { clockList } = useOT();
  const [input, setInput] = useState({
    clockId: "",
    startTime: "",
    endTime: "",
    messageOT: "",
  });

  const handleChangeDropdown = (e) => {
    console.log(e.value);
  };
  const handleOTSubmit = () => {
    console.log(input);
  };
  return (
    <form className=" flex flex-col items-center w-full gap-4 h-[90%] px-6">
      <div className="h-[50%] w-full flex flex-col items-start justify-center gap-4 border-b border-gray-400">
        <p className="text-3xl">Information</p>
        <div className="w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Select Date"
            wrapperClassName="w-full"
            className="w-full border- shadow-sm h-[36px] rounded-[4px] cursor-pointer p-1"
          />
        </div>
        <DropdownSearch
          placeholder={"Select your record.."}
          data={clockList}
          onChange={handleChangeDropdown}
          className="w-full"
        />
        <div>Start End Date</div>
        <div>
          <InputBar placeholder={"OT request message"} />
        </div>
      </div>
      <div className="bg-white w-full h-[25%] flex flex-col items- justify-start gap-2">
        <h1>Date: Wed 5th Aug 2023</h1>
        <h1>Time: 17:00-19:00</h1>
        <h1>Total: 2 hours (120)</h1>
      </div>

      <SubmitButton w={"w-full"}>Send Request</SubmitButton>
    </form>
  );
}
