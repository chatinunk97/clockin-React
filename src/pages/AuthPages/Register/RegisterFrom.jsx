import Joi from "joi";
import { useEffect, useState } from "react";
import { clockAxios } from "../../../config/axios";
import RegisterInput from "./RegisterInput";
import InputErrorMessage from "./InputErrorMessage";
import Loading from "../../../components/LoadingBar";
import GoogleMap from "../../../config/GoogleMap/Map";
import Swal from "sweetalert2";
import locationPermission from "../../../utils/locationPermission";
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
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [allpackage, setallPackage] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
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

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fetchlocation = async () => {
    const location = await locationPermission();
    setLocation(location);
  };
  useEffect(() => {
    fetchlocation().then(() => {
      clockAxios
        .get("/user/showpackage")
        .then((res) => {
          setInput({ ...input, packageId: res.data.packages[0].id });
          setallPackage(res.data.packages);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);

  const handleSubmitRegister = async (e) => {
    try {
      e.preventDefault();
      const data = {
        ...input,
        latitudeCompany: location.lat,
        longitudeCompany: location.lng,
      };
      const validationError = validateregister(data);
      const formData = new FormData();
      formData.append("paySlip", input.paySlip);
      formData.append("data", JSON.stringify(data));

      if (validationError) {
        return setError(validationError);
      }
      setError({});

      if (file === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Require PaySlip!",
        });
        return;
      }
      setLoading(true);

      const response = await clockAxios.post("/user/registerCompany", formData);
      if (response.status === 201) {
        alert("Registed");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("Email")) {
          setError({ ...error, email: "This Email is already in use" });
        } else if (errorMessage.includes("phone number")) {
          setError({ ...error, mobile: "Phone number is already in use" });
        } else {
          console.log("Other specific error:", errorMessage);
        }
      } else {
        console.log("Unexpected error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-x-3 gap-y-4 items-center pt-8 pb-6"
      onSubmit={handleSubmitRegister}
    >
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
      {loading ? (
        <Loading />
      ) : (
        <GoogleMap
          location={location}
          enableSelect={true}
          setLocation={setLocation}
        />
      )}
      <div className="mx-auto col-span-full">
        <button className="bg-blue-700 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
          Sign Up
        </button>
      </div>
    </form>
  );
}
