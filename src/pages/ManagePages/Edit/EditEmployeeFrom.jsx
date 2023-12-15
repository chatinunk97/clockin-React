import Joi from "joi";
import { useState } from "react";
import RegisterInput from "../../AuthPages/Register/RegisterInput";
import LinearIndeterminate from "../../../components/LoadingBar";
import InputErrorMessage from "../../AuthPages/Register/InputErrorMessage";
import IconLabelButtons from "../../../components/SendButton";
import InputFileUpload from "../../../components/UploadButton";
import DropdownSearch from "../../../components/DropdownSearch";
import supervisorList from "../../../utils/StructureChange/supervisorList";
import useUser from "../../../hooks/use-user";
import {
  inputList,
  dropdownlist,
  userposition,
  usertype,
  IsTrue,
  optionList,
} from "./InputList";

const EditSchema = Joi.object({
  profileImage: Joi.allow(null, ""),
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
  checkLocation: Joi.boolean(),
  id: Joi.number(),
});

const validateregister = (input) => {
  const { error } = EditSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function EditemployeeForm({ UserbyId, allUser, onClose }) {
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    profileImage: UserbyId.profileImage,
    firstName: UserbyId.firstName,
    lastName: UserbyId.lastName,
    position: UserbyId.position,
    // bossFirstName: UserbyId.bossFirstName,
    // bossLastName: UserbyId.bossLastName,
    bossInfo: UserbyId.bossInfo,
    // userBossId: UserbyId.userBossId || "",
    employeeId: UserbyId.employeeId,
    mobile: UserbyId.mobile,
    email: UserbyId.email,
    id: UserbyId.id,
    userType: UserbyId.userType,
    isActive: UserbyId.isActive,
    checkLocation: UserbyId.checkLocation,
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const { updateuser } = useUser();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleChangeDropdown = (data, name) => {
    console.log(data);
    setInput({ ...input, [name]: data.value });
  };

  const handleSubmitEditUser = async (e) => {
    try {
      e.preventDefault();
      const validationError = validateregister(input);
      const formData = new FormData();
      formData.append("profileImage", input.profileImage);
      delete input.profileImage;
      formData.append("data", JSON.stringify(input));
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      setLoading(true);
      await updateuser(formData);
      onClose();
    } catch (err) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const positionOptions = optionList(userposition);
  const UsertypeOptions = optionList(usertype);
  const isTrueOptions = optionList(IsTrue);

  return (
    <>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 overflow-x-auto"
        onSubmit={handleSubmitEditUser}
      >
        {inputList.map((el) => {
          return (
            <>
              <div
                className=" w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2 p-1  mb-2"
                key={el.id}
              >
                <h1>{el.label}</h1>
                <RegisterInput
                  placeholder={el.placeholder}
                  name={el.name}
                  value={input[el.name]}
                  onChange={handleChangeInput}
                  hasError={error[el.name]}
                />
                {error[el.name] && (
                  <InputErrorMessage message={error[el.name]} />
                )}
              </div>
            </>
          );
        })}

        {dropdownlist.map((el) => {
          let options = [];
          if (el.name === "position") {
            options = positionOptions;
          } else if (el.name === "userType") {
            options = UsertypeOptions;
          } else if (el.name === "isActive" || el.name === "checkLocation") {
            options = isTrueOptions;
          } else if (el.name === "userBossId") {
            options = supervisorList(allUser);
          }

          return (
            <>
              <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
                <h1>{el.label}</h1>
                <DropdownSearch
                  data={options}
                  onChange={handleChangeDropdown}
                  name={el.name}
                  value={input[el.name]}
                  hasError={error[el.name]}
                />
                {error[el.name] && (
                  <InputErrorMessage message={error[el.name]} />
                )}
              </div>
            </>
          );
        })}

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
            <label onClick={handleSubmitEditUser}>
              <IconLabelButtons />
            </label>
          </div>
        </div>
      </form>
      {loading && <LinearIndeterminate />}
    </>
  );
}
