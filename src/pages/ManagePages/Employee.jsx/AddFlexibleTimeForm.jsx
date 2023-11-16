import { useState } from "react";
import useTime from "../../../hooks/use-time";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import IconLabelButtons from "../../../components/SendButton";

export default function AddFlexibleTimeForm() {
  const [input, setInput] = useState({
    userId: "",
    date: "",
    timeProfileId: "",
  });

  const { createFlexible } = useTime();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await createFlexible(input);
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
          <RegisterInput
            placeholder="Enter date"
            value={input.date}
            onChange={handleChangeInput}
            name="date"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Time Profile Id</h1>
          <RegisterInput
            placeholder="Enter time profile"
            value={input.timeProfileId}
            onChange={handleChangeInput}
            name="timeProfileId"
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
