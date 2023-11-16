import { useState } from "react";
import useLeave from "../../../hooks/use-leave";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import LinearIndeterminate from "../../../components/LoadingBar";
import IconLabelButtons from "../../../components/SendButton";
import Joi from "joi";
import InputErrorMessage from "../../AuthPages/Register/InputErrorMessage";

const updateUserLeaveSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  userId: Joi.number().integer().positive().required(),
  leaveProfileId: Joi.number().integer().positive(),
  dateAmount: Joi.number().integer().positive(),
});

const validateUpdateUserLeave = (input) => {
  const { error } = updateUserLeaveSchema.validate(input, {
    abortEarly: false,
  });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function EditUserLeaveForm({ userLeaveById, onClose, userId }) {
  const { updateUserLeave } = useLeave();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: userLeaveById.id,
    dateAmount: userLeaveById.dateAmount,
  });

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      input.userId = userId;
      console.log(input);
      const validationError = validateUpdateUserLeave(input);
      console.log(validationError);
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      await updateUserLeave(input);
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
          <h1>Leave Name</h1>
          <RegisterInput
            placeholder="Leave Name"
            // value={input.leaveName}
            // onChange={handleChangeInput}
            name="leaveName"
            disabled={true}
          />
          {error.leaveProfileId && (
            <InputErrorMessage message={"Please select a leave"} />
          )}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Leave Amount (days)</h1>
          <RegisterInput
            placeholder="Date Amount (days)"
            value={input.dateAmount}
            onChange={handleChangeInput}
            name="dateAmount"
          />
          {error.dateAmount && (
            <InputErrorMessage message={"Please enter date amount"} />
          )}
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
