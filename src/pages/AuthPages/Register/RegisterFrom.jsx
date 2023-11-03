import Joi from "joi";
import { useEffect, useState } from "react";
import {clockAxios} from "../../../config/axios";
import RegisterInput from "./RegisterInput";
import InputErrorMessage from "./InputErrorMessage";
import Loading from '../../../components/Loading'

const registerSchema = Joi.object({
  paySlip: Joi.required(),
  companyName: Joi.string().trim().required(),
  packageId: Joi.number().required(),
  latitudeCompany: Joi.number().required(),
  longitudeCompany: Joi.number().required(),
  employeeId: Joi.string().trim().required(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
});
const validateregister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      const { message, path } = el;
      acc[path[0]] = message;
      return acc;
    }, {});
    return result;
  }
};

export default function RegisterFrom() {
  const [file, setFile] = useState(null);
  const [allpackage, setallPackage] = useState([]);
  const [input, setInput] = useState({
    paySlip: "",
    companyName: "",
    packageId: "",
    latitudeCompany: "",
    longitudeCompany: "",
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false)





  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    clockAxios
      .get("/user/showpackage")
      .then((res) => {
        setInput({ ...input, packageId: res.data.packages[0].id });
        setallPackage(res.data.packages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const validationError = validateregister(input);
      const formData = new FormData();
      formData.append("paySlip", input.paySlip);
      formData.append("data", JSON.stringify(input));
      if (validationError) {
        return setError(validationError);
      }
      setError({});
      if (file === null) {
        alert('Require PaySlip!!!')
        return
      }
      setLoading(true)
      const response = await clockAxios.post("/user/registerCompany", formData);
      if (response.status === 201) {
        alert("Registed");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-x-3 gap-y-4 items-center pt-8 pb-6"
      onSubmit={handleSubmitRegister}
    >
      {loading && <Loading />}
      <div className=" w-[360px] h-[80px]">
        <RegisterInput
          type="file"
          onChange={(e) => {
            if (e.target.files[0]) {
              setFile(e.target.files[0]);
              setInput({ ...input, paySlip: e.target.files[0] });
            }
          }}
          name="paySlip"
          hasError={error.paySlip}
        />
        {error.paySlip && <InputErrorMessage message={error.paySlip} />}
      </div>
      <div>
        <h1 className="pl-2">Select Package</h1>
        <select
          className="w-[360px] mb-12 flex items-start flex-col cursor-pointer"
          onChange={handleChangeInput}
          value={input.packageId}
          name="packageId"
        >
          {allpackage.map((el) => {
            return (
              <option
                key={el.id}
                name="packageId"
                value={el.id}
                label={`${el.price}฿ / ${el.userCount} People`}
              ></option>
            );
          })}
        </select>
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Company Name"
          value={input.companyName}
          onChange={handleChangeInput}
          name="companyName"
          hasError={error.companyName}
        />
        {error.companyName && <InputErrorMessage message={error.companyName} />}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="latitudeCompany"
          value={input.latitudeCompany}
          onChange={handleChangeInput}
          name="latitudeCompany"
          hasError={error.latitudeCompany}
        />
        {error.latitudeCompany && (
          <InputErrorMessage message={error.latitudeCompany} />
        )}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="longitudeCompany"
          value={input.longitudeCompany}
          onChange={handleChangeInput}
          name="longitudeCompany"
          hasError={error.longitudeCompany}
        />
        {error.longitudeCompany && (
          <InputErrorMessage message={error.longitudeCompany} />
        )}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Employee Id"
          value={input.employeeId}
          onChange={handleChangeInput}
          name="employeeId"
          hasError={error.employeeId}
        />
        {error.employeeId && <InputErrorMessage message={error.employeeId} />}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder=" First name"
          value={input.firstName}
          onChange={handleChangeInput}
          name="firstName"
          hasError={error.firstName}
        />
        {error.firstName && <InputErrorMessage message={error.firstName} />}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Last Name"
          value={input.lastName}
          onChange={handleChangeInput}
          name="lastName"
          hasError={error.lastName}
        />
        {error.lastName && <InputErrorMessage message={error.lastName} />}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Email"
          value={input.email}
          onChange={handleChangeInput}
          name="email"
          hasError={error.email}
        />
        {error.email && <InputErrorMessage message={error.email} />}
      </div>
      <div className="p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Phone Number"
          value={input.mobile}
          onChange={handleChangeInput}
          name="mobile"
          hasError={error.mobile}
        />
        {error.mobile && <InputErrorMessage message={error.mobile} />}
      </div>
      <div className=" p-1 w-[360px] h-[80px]">
        <RegisterInput
          placeholder="Password"
          value={input.password}
          onChange={handleChangeInput}
          name="password"
          hasError={error.password}
        />
        {error.password && <InputErrorMessage message={error.password} />}
      </div>
      <div className="mx-auto col-span-full">
        <button className="bg-blue-700 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
          Sign Up
        </button>
      </div>
    </form>
  );
}
