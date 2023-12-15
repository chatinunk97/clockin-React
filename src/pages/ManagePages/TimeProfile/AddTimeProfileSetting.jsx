import { useState } from "react";
import useTime from "../../../hooks/use-time";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import IconLabelButtons from "../../../components/SendButton";

export default function AddTimeProfileSettingForm() {
  const [input, setInput] = useState({
    start: "",
    end: "",
    typeTime: "",
  });

  const { createTimeProfile } = useTime();

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      console.log(input);
      await createTimeProfile(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 overflow-x-auto"
        onSubmit={handleSubmitForm}
      >
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Start Time</h1>
          <RegisterInput
            placeholder="Enter start time"
            value={input.start}
            onChange={handleChangeInput}
            name="start"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>End Time</h1>
          <RegisterInput
            placeholder="Enter end time"
            value={input.end}
            onChange={handleChangeInput}
            name="end"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Time Type</h1>
          <select
            placeholder="Enter time type"
            value={input.typeTime}
            onChange={handleChangeInput}
            name="typeTime"
          >
            <option value="DEFAULT">Default</option>
            <option value="FIRSTHALF">First Half</option>
            <option value="SECONDHALF">Second Half</option>
            <option value="NOTSPECIFIED">Not-Specified</option>
          </select>
        </div>
        <div className="mx-auto col-span-full mt-6">
          <label onClick={handleSubmitForm}>
            <IconLabelButtons />
          </label>
        </div>
      </form>
    </>
  );
}
