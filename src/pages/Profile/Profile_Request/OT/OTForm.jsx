import { useState, useEffect } from "react";
import dayjs from "dayjs";
import useOT from "../../../../hooks/use-OT";
import DropdownSearch from "../../../../components/DropdownSearch";
import DatePicker from "react-datepicker";
import SubmitButton from "../../../../components/SubmitButton";
import InputBar from "../../../../components/InputBar";
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
  totalTime: Joi.number().integer().positive().required(),
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
  const [error, setError] = useState({});
  const { clockList, createRequestOT, setDate, date } = useOT();
  const [input, setInput] = useState({
    clockId: "",
    startTime: "",
    endTime: "",
    messageOT: "",
  });
  const [timeDif, setTimeDif] = useState(0);
  console.log(timeDif);

  useEffect(() => {
    if (input.startTime && input.endTime) {
      const dateStartTime = dayjs(`2023-01-01 ${input.startTime}`);
      const dateEndTime = dayjs(`2023-01-01 ${input.endTime}`);
      const difference = dateEndTime.diff(dateStartTime, "minute"); // Difference in minutes
      setTimeDif(difference);
    } else {
      setTimeDif(0);
    }
  }, [input.startTime, input.endTime]);

  const handleOnchangeDatePicker = (e) => {
    setDate(e);
  };

  const handleOnchangeStartTime = (e) => {
    console.log(e);
    if (!e) return;

    const timeFormat = dayjs(e.$d).format("HH:mm:ss");
    setInput({ ...input, startTime: timeFormat });
  };

  const handleOnchangeEndTime = (e) => {
    console.log(e);
    if (!e) return;

    const timeFormat = dayjs(e.$d).format("HH:mm:ss");
    setInput({ ...input, endTime: timeFormat });
  };

  const handleChangeDropdown = (e) => {
    setInput({ ...input, clockId: e.value });
  };

  const handleOTSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    input.totalTime = timeDif;
    const validationError = validateCreateOT(input);
    if (validationError) {
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
      className="h-[90%] p-4 flex flex-col items-center w-full gap-5 "
      onSubmit={handleOTSubmit}
    >
      <div className="h-[70%] w-full flex flex-col items-start justify-center gap-4 border-b border-gray-400">
        <p className="text-3xl">Information</p>
        <div className="w-full">
          <DatePicker
            selected={date}
            onChange={handleOnchangeDatePicker}
            isClearable
            placeholderText="Select Date"
            wrapperClassName="w-full"
            className="w-full border shadow-sm h-[36px] rounded-[4px] cursor-pointer p-1"
          />
        </div>

        <DropdownSearch
          placeholder={"Select your record.."}
          data={clockList}
          onChange={handleChangeDropdown}
          className="w-full z-20"
        />
        {error.clockId && (
          <InputErrorMessage message={"Please select period time"} />
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <TimePicker
              label="Start Time"
              value={input.startTime}
              onChange={handleOnchangeStartTime}
              className="z-0"
            />
            {error.startTime && (
              <InputErrorMessage message={"Please select start time"} />
            )}
            <TimePicker
              label="End Time"
              value={input.endTime}
              onChange={handleOnchangeEndTime}
              className="z-0"
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
        <h1>{`Date: ${dayjs(date).format("DD-MM-YYYY")} `}</h1>
        <h1>{`Time: ${input.startTime} - ${input.endTime}`}</h1>
        <h1>{`Total: ${Math.floor(timeDif / 60)} hours ${
          timeDif % 60
        } minutes`}</h1>
      </div>

      <SubmitButton w={"w-full"}>Send Request</SubmitButton>
    </form>
  );
}
