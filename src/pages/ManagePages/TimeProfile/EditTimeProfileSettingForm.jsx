import { useState } from "react";
import useTime from "../../../hooks/use-time";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import LinearIndeterminate from "../../../components/LoadingBar";
import IconLabelButtons from "../../../components/SendButton";

export default function EditLeaveSettingForm({ timeProfileById, onClose }) {
  const { updateTimeProfile } = useTime();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: timeProfileById.id,
    start: timeProfileById.start,
    end: timeProfileById.end,
    typeTime: timeProfileById.typeTime,
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await updateTimeProfile(input);
      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
            placeholder="Start Time"
            value={input.start}
            onChange={handleChangeInput}
            name="start"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>End Time</h1>
          <RegisterInput
            placeholder="End Time"
            value={input.end}
            onChange={handleChangeInput}
            name="end"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Time Type</h1>
          <RegisterInput
            placeholder="Time Type"
            value={input.typeTime}
            onChange={handleChangeInput}
            name="typeTime"
          />
        </div>
        <div className="mx-auto col-span-full mt-6">
          <label onClick={handleSubmitForm}>
            <IconLabelButtons />
          </label>
        </div>
      </form>
      {loading && <LinearIndeterminate />}
    </>
  );
}
