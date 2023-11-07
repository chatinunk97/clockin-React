import Joi from "joi";
import { useState } from "react";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import InputErrorMessage from "../../AuthPages/Register/InputErrorMessage";
import useManage from "../../../hooks/use-manage";
import LinearIndeterminate from "../../../components/LoadingBar";
import IconLabelButtons from "../../../components/SendButton";
import InputFileUpload from "../../../components/Uploadbutton";
import DropdownSearch from "../../../components/DropdownSearch";
import supervisorList from "../../../utils/StructureChange/supervisorList";

const AddUserSchema = Joi.object({
  profileImage: Joi.allow(null, "").required(),
  employeeId: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  position: Joi.string().trim().required(),
  userBossId: Joi.number().required(),
  userType: Joi.string(),
  isActive: Joi.boolean(),
  checkLocation: Joi.boolean()

});

const validateregister = (input) => {
  const { error } = AddUserSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function AddmployeeForm({ allUser, onClose }) {
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    profileImage: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    position: "USER",
    userBossId: "",
    userType: "FULLTIME",
    isActive: "true",
    checkLocation: "true",
  });

  const { addemployee } = useManage();

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {

    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChangeDropdown = (data, name) => {
    console.log(data)
    setInput({ ...input, [name]: data.value });
  };
  const handleSubmitAddUser = async (e) => {
    try {
      e.preventDefault();
      const validationError = validateregister(input);
      const formData = new FormData();
      formData.append("profileImage", input.profileImage);
      formData.append("data", JSON.stringify(input));
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      setLoading(true);
      await addemployee(formData)
      onClose()
    } catch (err) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

  return (
    <>
      <form
        className="grid grid-cols-2 gap-x-1 gap-y-1 md:gap-x-3 md:gap-y-4 items-center pl-8 md:pt-4 md:pl-20 md:pr-20 md:pb-12 overflow-x-auto"
        onSubmit={handleSubmitAddUser}
      >
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>First name</h1>
          <RegisterInput
            placeholder=" First name"
            value={input.firstName}
            onChange={handleChangeInput}
            name="firstName"
            hasError={error.firstName}
          />
          {error.firstName && <InputErrorMessage message={error.firstName} />}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Last Name</h1>
          <RegisterInput
            placeholder="Last Name"
            value={input.lastName}
            onChange={handleChangeInput}
            name="lastName"
            hasError={error.lastName}
          />
          {error.lastName && <InputErrorMessage message={error.lastName} />}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Employee Id</h1>
          <RegisterInput
            placeholder="Employee Id"
            value={input.employeeId}
            onChange={handleChangeInput}
            name="employeeId"
            hasError={error.employeeId}
          />
          {error.employeeId && <InputErrorMessage message={error.employeeId} />}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Supervisor</h1>
          <DropdownSearch
            data={supervisorList(allUser)}
            onChange={handleChangeDropdown}
            name={"userBossId"}
          />
          {error.userBossId && <InputErrorMessage message={error.userBossId} />}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1 className="pl-2">Select Employee Position</h1>
          <select
            className="w-32 md:w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
            onChange={handleChangeInput}
            value={input.position}
            name="position"
          >
            <option value="USER" name="position">
              USER
            </option>
            <option value="HR" name="position">
              HR
            </option>
            <option value="MANAGER" name="position">
              MANAGER
            </option>
          </select>
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 mt-12 md:mt-0">
          <h1 className="pl-2">Select UserType</h1>
          <select
            className="w-32 md:w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
            onChange={handleChangeInput}
            value={input.userType}
            name="userType"
          >
            <option value="FULLTIME" name="userType">
              FULL TIME
            </option>
            <option value="PARTTIME" name="userType">
              PART TIME
            </option>
          </select>
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1 className="pl-2">UserActive</h1>
          <select
            className="w-32 md:w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
            onChange={handleChangeInput}
            value={input.isActive}
            name="isActive"
          >
            <option value="true" name="isActive">
              True
            </option>
            <option value="false" name="isActive">
              False
            </option>
          </select>
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1 className="pl-2">CheckLocation</h1>
          <select
            className="w-32 md:w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
            onChange={handleChangeInput}
            value={input.checkLocation}
            name="checkLocation"
          >
            <option value="true" name="checkLocation">
              True
            </option>
            <option value="false" name="checkLocation">
              False
            </option>
          </select>
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Email</h1>
          <RegisterInput
            placeholder="Email"
            value={input.email}
            onChange={handleChangeInput}
            name="email"
            hasError={error.email}
          />
          {error.email && <InputErrorMessage message={error.email} />}
        </div>
        <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Phone Number</h1>
          <RegisterInput
            placeholder="Phone Number"
            value={input.mobile}
            onChange={handleChangeInput}
            name="mobile"
            hasError={error.mobile}
          />
          {error.mobile && <InputErrorMessage message={error.mobile} />}
        </div>
        <div className="flex justify-evenly items-center w-80 md:flex-col md:w-[800px]">
          <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
            <h1>ProfileImage</h1>
            <InputFileUpload
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setFile(e.target.files[0]);
                  setInput({ ...input, profileImage: e.target.files[0] });
                }
              }}
              name="profileImage"
              hasError={error.profileImage}
            />
            {error.profileImage && (
              <InputErrorMessage message={error.profileImage} />
            )}
          </div>
          <div className="mx-auto col-span-full mt-6">
            <label onClick={handleSubmitAddUser}>
              <IconLabelButtons />
            </label>
          </div>
        </div>
      </form>
      {loading && <LinearIndeterminate />}
    </>
  );
}
