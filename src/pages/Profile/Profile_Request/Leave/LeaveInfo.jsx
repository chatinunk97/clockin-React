import { AiFillCalendar } from "react-icons/ai";
import { BsFillClipboard2Fill } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import LeaveDropdown from "./LeaveDropdown";
import SubmitButton from "../../../../components/SubmitButton";
import DropdownSearch from "../../../../components/DropdownSearch";
import useLeave from "../../../../hooks/use-leave";
import Joi from "joi";
import InputErrorMessage from "../../../AuthPages/Register/InputErrorMessage";
import Swal from "sweetalert2";

const createRequestLeaveSchema = Joi.object({
  userLeaveId: Joi.number().integer().positive().required(),
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date().required().label("End Date"),
  leaveType: Joi.string().trim().valid("FULLDAY", "FIRSTHALF", "SECONDHALF"),
  statusRequest: Joi.string().trim().valid("ACCEPT", "REJECT"),
  messageLeave: Joi.string().required(),
});

const validateCreateRequestLeave = (input) => {
  const { error } = createRequestLeaveSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const msgErr = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});

    console.log(msgErr);
    return msgErr;
  }
};

export default function LeaveInfo({ createRequestLeave }) {
  const { userLeave } = useLeave();
  const [error, setError] = useState({});

  const userLeaveData = userLeave.map((obj) => ({
    label: obj.leaveProfile.leaveName,
    value: obj.id,
  }));

  const [input, setInput] = useState({
    userLeaveId: "",
    startDate: "",
    endDate: "",
    messageLeave: "",
    leaveType: "FULLDAY",
  });

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const validationError = validateCreateRequestLeave(input);
      if (validationError) {
        console.dir(validationError);
        return setError(validationError);
      }
      setError({});
      createRequestLeave(input);
      Swal.fire({
        title: "Leave request Sent!",
        text: "Please wait for your supervisor to approve",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleDatePicker = (e) => {
    setInput({
      ...input,
      startDate: e[0],
      endDate: e[1],
    });
    console.log(input);
  };
  const handleChangeDropdown = (data, name) => {
    setInput({ ...input, [name]: data.value });
  };
  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
      <DropdownSearch
        data={userLeaveData}
        onChange={handleChangeDropdown}
        value={input.userLeaveId}
        name={"userLeaveId"}
      />
      {error.userLeaveId && (
        <InputErrorMessage message={"Please select a leave type"} />
      )}

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
      {(error.startDate || error.endDate) && (
        <InputErrorMessage message={"Please select an appropriate date"} />
      )}

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
      {error.messageLeave && (
        <InputErrorMessage message={"Please enter message"} />
      )}
      <div className="p-2 h-[15%]  flex justify-center items-center">
        <SubmitButton p="px-20 py-3">Submit</SubmitButton>
      </div>
    </form>
  );
}
