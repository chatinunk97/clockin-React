import { useState } from "react";
import useManage from "../../../hooks/use-manage";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import LinearIndeterminate from "../../../components/LoadingBar";
import IconLabelButtons from "../../../components/SendButton";

export default function EditLeaveSettingForm({ leaveProfileById, onClose }) {
  const { updateLeaveProfile } = useManage();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: leaveProfileById.id,
    leaveName: leaveProfileById.leaveName,
    defaultDateAmount: leaveProfileById.defaultDateAmount,
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      await updateLeaveProfile(input);
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
          <h1>First name</h1>
          <RegisterInput
            placeholder="Leave Name"
            value={input.leaveName}
            onChange={handleChangeInput}
            name="leaveName"
          />
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Default Amount (days)</h1>
          <RegisterInput
            placeholder="Defaul Amount (days)"
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
      {loading && <LinearIndeterminate />}
    </>
  );
}
