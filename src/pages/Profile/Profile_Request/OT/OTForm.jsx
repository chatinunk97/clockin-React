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
    <form className="bg-red-500 flex flex-col items-center w-full gap-4">
      <div className="bg-blue-500 w-full flex flex-col items-center justify-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          isClearable
          placeholderText="Select Date"
          className="w-56 border border-stone-200 shadow-sm rounded-md cursor-pointer p-1"
        />
        <DropdownSearch
          placeholder={"Select your record.."}
          data={clockList}
          onChange={handleChangeDropdown}
        />
        <div>Start End Date</div>
        <div>
          <InputBar placeholder={"OT request message"} />
        </div>
      </div>

      <SubmitButton w={"w-full"}>Send Request</SubmitButton>
    </form>
  );
}
