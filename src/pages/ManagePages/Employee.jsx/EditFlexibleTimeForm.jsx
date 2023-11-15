import { useState } from "react";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import LinearIndeterminate from "../../../components/LoadingBar";
import IconLabelButtons from "../../../components/SendButton";
import useTime from "../../../hooks/use-time";

export default function EditFlexibleTimeForm({ flexibleTimeById, onClose }) {
  const { updateFlexible } = useTime();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: flexibleTimeById.id,
    userId: flexibleTimeById.userId,
    date: flexibleTimeById.date,
    timeProfileId: flexibleTimeById.timeProfileId,
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await updateFlexible(input);
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
          <h1>User Id</h1>
          <RegisterInput
            placeholder="User Id"
            value={input.userId}
            onChange={handleChangeInput}
            name="userId"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Date</h1>
          <RegisterInput
            placeholder="Date"
            value={input.date}
            onChange={handleChangeInput}
            name="date"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Start</h1>
          <RegisterInput
            placeholder="Time Profile Id"
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
      {loading && <LinearIndeterminate />}
    </>
  );
}
