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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Swal from "sweetalert2";
import Joi from "joi";
import InputErrorMessage from "../../../AuthPages/Register/InputErrorMessage";

const createOTSchema = Joi.object({
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  messageOT: Joi.string().required(),
  clockId: Joi.number().integer().positive().required(),
});

const validateCreateOT = (input) => {
  const { error } = createOTSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const msgErr = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});

    return msgErr;
  }
};

export default function OTform() {
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState({});
  const { clockList, createRequestOT } = useOT();
  const [input, setInput] = useState({
    clockId: "",
    startTime: "",
    endTime: "",
    messageOT: "",
  });

  const handleChangeDropdown = (e) => {
    setInput({ ...input, clockId: e.value });
  };

  const handleOTSubmit = (e) => {
    e.preventDefault();
    const validationError = validateCreateOT(input);
    if (validationError) {
      console.dir(validationError);
      return setError(validationError);
    }
    setError({});
    createRequestOT(input);
    Swal.fire({
      title: "Request OT Sent!",
      text: "Please wait for your supervisor to approve",
      icon: "success",
    });
  };
  return (
    <form
      className=" flex flex-col items-center w-full gap-4 h-[90%] px-6"
      onSubmit={handleOTSubmit}
    >
      <div className="h-[70%] w-full flex flex-col items-start justify-center gap-4 border-b border-gray-400">
        <p className="text-3xl">Information</p>
        <div className="w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="Select Date"
            wrapperClassName="w-full"
            className="w-full border z-20 shadow-sm h-[36px] rounded-[4px] cursor-pointer p-1"
          />
        </div>

        <DropdownSearch
          placeholder={"Select your record.."}
          data={clockList}
          onChange={handleChangeDropdown}
          className="w-full"
        />
        {error.clockId && (
          <InputErrorMessage message={"Please select period time"} />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Start Time"
              name="startTime"
              value={input.startTime}
              onChange={(e) =>
                setInput({
                  ...input,
                  startTime: e?.$d?.toString().split(" ")[4],
                })
              }
            />
            {error.startTime && (
              <InputErrorMessage message={"Please select start time"} />
            )}
            <TimePicker
              label="End Time"
              name="endTime"
              value={input.endTime}
              onChange={(e) =>
                setInput({ ...input, endTime: e?.$d?.toString().split(" ")[4] })
              }
            />
            {error.endTime && (
              <InputErrorMessage message={"Please select end time"} />
            )}
          </DemoContainer>
        </LocalizationProvider>

        <div>
          <InputBar
            value={input.messageOT}
            placeholder={"OT request message"}
            onChange={(e) => setInput({ ...input, messageOT: e.target.value })}
          />
          {error.messageOT && (
            <InputErrorMessage message={"Please enter message"} />
          )}
        </div>
      </div>
      <div className="bg-white w-full h-[15%] flex flex-col items- justify-start gap-2">
        <h1>{`Date: ${startDate.toString().split(" ").slice(0, 4)} `}</h1>
        <h1>{`Time: ${input.startTime} - ${input.endTime}`}</h1>
        <h1>{`Total: ${
          input.endTime.split(":")[0] - input.startTime.split(":")[0]
        } hours ${Math.abs(
          input.endTime.split(":")[1] - input.startTime.split(":")[1] || 0
        )} minutes `}</h1>
      </div>

      <SubmitButton w={"w-full"}>Send Request</SubmitButton>
    </form>
  );
}
