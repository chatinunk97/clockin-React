import Joi from "joi";
import { useEffect, useState } from "react";
import { clockAxios } from "../../../config/axios";
import RegisterInput from "./RegisterInput";
import InputErrorMessage from "./InputErrorMessage";
import Loading from "../../../components/Loading";
import GoogleMap from "../../../config/GoogleMap/Map";
import Swal from "sweetalert2";
import locationPermission from "../../../utils/locationPermission";
import { toast } from "react-toastify";
import SubmitButton from "../../../components/SubmitButton";
import Modal from "../../../components/Modal";
import InputFileUpload from "../../../components/UploadButton";
import { RegisInput } from "./RegisInput";
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
  const [isOpen, setIsOpen] = useState(false);
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add user success!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorMessage = toast.error(err.response.data.message);
        if (errorMessage.includes("email")) {
          setError({ ...error, email: "This Email is already in use" });
        } else if (errorMessage.includes("mobile")) {
          setError({ ...error, mobile: "Phone number is already in use" });
        }
      }
      if (err.response.status === 500) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something Went Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4 items-center p-6"
        onSubmit={handleSubmitRegister}
      >
        <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>Select Package</h1>
          <select
            className="flex items-start flex-col cursor-pointer border border-stone-300 p-2"
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
        {RegisInput.map((el) => (
          <div key={el.id}>
            <div className="p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
              <h1>{el.label}</h1>
              <RegisterInput
                type={el.type}
                placeholder={el.placeholder}
                name={el.name}
                value={input[el.name]}
                onChange={handleChangeInput}
                hasError={error[el.name]}
              />
              {error[el.name] && <InputErrorMessage message={error[el.name]} />}
            </div>
          </div>
        ))}

        <div className="p-2 w-36 md:w-[360px] md:h-[80px] flex flex-col gap-2">
          <h1>PaySlip</h1>
          <InputFileUpload
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
        <div className="flex justify-center mt-7">
          <SubmitButton
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Company Location
          </SubmitButton>
        </div>
        <Modal
          title="Select your company Location"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {loading ? (
            <Loading />
          ) : (
            <div className="w-full h-[700] flex flex-col gap-5">
              <div className="w-full h-[500px]">
                <GoogleMap
                  location={location}
                  enableSelect={true}
                  setLocation={setLocation}
                />
              </div>
              <SubmitButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Confirm Location
              </SubmitButton>
            </div>
          )}
        </Modal>
        <div className="mx-auto col-span-full mt-3">
          <button className="bg-blue-700 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
