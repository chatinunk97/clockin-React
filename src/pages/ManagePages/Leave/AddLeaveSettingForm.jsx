import { useState } from "react";
import useLeave from "../../../hooks/use-leave";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import IconLabelButtons from "../../../components/SendButton";

export default function AddLeaveSettingForm() {
  const [input, setInput] = useState({
    leaveName: "",
    defaultDateAmount: "",
  });

  const { createLeaveProfile } = useLeave();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await createLeaveProfile(input);
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
          <h1>Leave Name</h1>
          <RegisterInput
            placeholder="Enter leave name"
            value={input.leaveName}
            onChange={handleChangeInput}
            name="leaveName"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Leave Amount (days)</h1>
          <RegisterInput
            placeholder="Enter number of leave days"
            value={input.defaultDateAmount}
            onChange={handleChangeInput}
            name="defaultDateAmount"
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
