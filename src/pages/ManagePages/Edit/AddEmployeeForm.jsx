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
  }

  const inputList = [
    { id: 1, label: "First name", placeholder: "First name", name: "firstName" },
    { id: 2, label: "last name", placeholder: "Last name", name: "lastName" },
    { id: 3, label: "Employee Id", placeholder: "Employee Id", name: "employeeId" },
    { id: 4, label: "Email", placeholder: "Email", name: "email" },
    { id: 5, label: "Phone Number", placeholder: "Phone Number", name: "mobile" },
  ]
  const dropdownlist = [
    { id: 1, label: "Supervisor", placeholder: "Supervisor", name: "userBossId" },
    { id: 2, label: "Select Employee Type", placeholder: "userType", name: "userType" },
    { id: 3, label: "Select Employee Position", placeholder: "position", name: "position" },
    { id: 4, label: "isActive", placeholder: "isActive", name: "isActive" },
    { id: 4, label: "checkLocation", placeholder: "checkLocation", name: "checkLocation" },
  ]


  const userposition = [
    { id: 1, label: "USER", value: "USER" },
    { id: 2, label: "HR", value: "HR" },
    { id: 3, label: "MANAGER", value: "MANAGER" },
  ]
  const usertype = [
    { id: 1, label: "FULL TIME", value: "FULLTIME" },
    { id: 2, label: "PART TIME", value: "PARTTIME" },
  ]

  const IsTrue = [
    { id: 1, label: "True", value: true },
    { id: 2, label: "False", value: false },
  ]


  const optionList = (arr) => {
    return arr.map((item) => ({
      id: item.id,
      label: item.label,
      value: item.value,
    }));
  };

  const positionOptions = optionList(userposition);
  const UsertypeOptions = optionList(usertype);
  const isTrueOptions = optionList(IsTrue);

  return (
    <>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6 md:pt-4 md:pl-20 md:pr-20 md:pb-12 overflow-x-auto"
        onSubmit={handleSubmitAddUser}
      >
        {inputList.map((el) => {
          return (
            <>
              <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2" key={el.id}>
                <h1>{el.label}</h1>
                <RegisterInput
                  placeholder={el.placeholder}
                  name={el.name}
                  value={input[el.name]}
                  onChange={handleChangeInput}
                  hasError={error[el.name]}
                />
                {error[el.name] && <InputErrorMessage message={error[el.name]} />}
              </div>

            </>)
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
            options = supervisorList(allUser)
          }

          return (
            <>
              <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
                <h1>{el.label}</h1>
                <DropdownSearch
                  data={options}
                  onChange={handleChangeDropdown}
                  name={el.name}
                  hasError={error[el.name]}
                />
                {error[el.name] && <InputErrorMessage message={error[el.name]} />}
              </div>

            </>
          )
        })
        }


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
