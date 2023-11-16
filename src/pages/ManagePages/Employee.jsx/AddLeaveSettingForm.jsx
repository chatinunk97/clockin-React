import { useState } from "react";
import useLeave from "../../../hooks/use-leave";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import IconLabelButtons from "../../../components/SendButton";
import { useEffect } from "react";
import DropdownSearch from "../../../components/DropdownSearch";
import Joi from "joi";
import InputErrorMessage from "../../AuthPages/Register/InputErrorMessage";

const createUserLeaveSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  leaveProfileId: Joi.number().integer().positive().required(),
  dateAmount: Joi.number().integer().positive().required().allow(0),
});

const validateCreateUserLeave = (input) => {
  const { error } = createUserLeaveSchema.validate(input, {
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

export default function AddUserLeaveForm({ userId, onClose }) {
  const [input, setInput] = useState({
    leaveProfileId: "",
    dateAmount: "",
  });
  const [leaveProfile, setLeaveProfiles] = useState([]);
  const [error, setError] = useState({});

  const { createUserLeave, getAllLeaveProfile } = useLeave();

  const leaveProfileData = leaveProfile.map((obj) => ({
    label: obj.leaveName,
    value: obj.id,
  }));
  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChangeDropdown = (data, name) => {
    setInput({ ...input, [name]: data.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      input.userId = userId;
      const validationError = validateCreateUserLeave(input);
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      await createUserLeave(input);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllLeaveProfile().then((res) => {
      setLeaveProfiles(res.data.allLeaveProfile);
    });
  }, []);

  return (
    <>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 overflow-x-auto"
        onSubmit={handleSubmitForm}
      >
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Leave Name</h1>
          <DropdownSearch
            data={leaveProfileData}
            onChange={handleChangeDropdown}
            value={input.leaveProfileId}
            name={"leaveProfileId"}
          />
          {error.leaveProfileId && (
            <InputErrorMessage message={"Please select a leave"} />
          )}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Leave Amount (days)</h1>
          <RegisterInput
            placeholder="Enter number of leave days"
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
    </>
  );
}
