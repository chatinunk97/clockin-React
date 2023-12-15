import { useState } from "react";
import useTime from "../../../hooks/use-time";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import IconLabelButtons from "../../../components/SendButton";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import timeProfileList from "../../../utils/StructureChange/timeProfileList";
import DropdownSearch from "../../../components/DropdownSearch";

export default function AddFlexibleTimeForm({ userId, flexibleOptions }) {
  const [input, setInput] = useState({
    userId: userId,
    date: "",
    timeProfileId: "",
  });

  const { createFlexible } = useTime();

  const handleChangeTime = (e) => {
    setInput({ ...input, timeProfileId: e.value });
  };
  const handleChangeDate = (e) => {
    setInput({ ...input, date: e });
  };
  const handleSubmitForm = async (e) => {
    try {
      console.log(dayjs(input.date).format("YYYY-MM-DD"));
      e.preventDefault();
      await createFlexible({
        ...input,
        date: dayjs(input.date).format("YYYY-MM-DD"),
      });
      console.log(input);
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
          <h1>Date</h1>
          <div>
            <DatePicker
              selected={input.date}
              onChange={handleChangeDate}
              isClearable
              placeholderText="Select Date"
              wrapperClassName="w-full"
              className="w-full border shadow-sm h-[36px] rounded-[4px] cursor-pointer p-1"
            />
          </div>
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Time</h1>
          <DropdownSearch
            placeholder={"Select your record.."}
            data={timeProfileList(flexibleOptions)}
            onChange={handleChangeTime}
            className="w-full z-20"
          />
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
