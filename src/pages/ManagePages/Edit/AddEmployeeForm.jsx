import axios from 'axios';
import Joi from 'joi';
import { useState } from 'react';
import RegisterInput from '../../AuthPages/Register/RegisterInput';
import Loading from '../../../components/Loading';
import InputErrorMessage from '../../AuthPages/Register/InputErrorMessage';

const EditSchema = Joi.object({
    profileImage: Joi.required(),
    employeeId: Joi.string().trim().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email({ tlds: false }).required(),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    position: Joi.string().trim().required(),
    userBossId: Joi.string().trim().required(),

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



export default function AddmployeeForm() {

    const [file, setFile] = useState(null);
    const [input, setInput] = useState({
        profileImage: "",
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        position: "",
        userBossId: "",

    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false)

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const handleSubmitAddUser = async (e) => {
        try {
            e.preventDefault();
            const validationError = validateregister(input);
            const formData = new FormData();
            formData.append("profileImage", input.profileImage);
            delete input.profileImage
            formData.append("data", JSON.stringify(input));
            if (validationError) {
                return setError(validationError);
            }
            setError({});
            if (file === null) {
                alert('Require ProfileImage')
                return
            }
            setLoading(true)
            const response = await axios.post("/user/createUser", formData);
            if (response.status === 201) {
                alert("Add User Done");
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
            onSubmit={handleSubmitAddUser}
        >
            {loading && <Loading />}
            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
                <h1>ProdileImage</h1>
                <RegisterInput
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
                {error.profileImage && <InputErrorMessage message={error.profileImage} />}
            </div>

            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
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
            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
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

            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
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
            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
                <h1>Supervisor</h1>
                <RegisterInput
                    placeholder="Supervisor"
                    value={input.userBossId}
                    onChange={handleChangeInput}
                    name="userBossId"
                    hasError={error.userBossId}
                />
                {error.userBossId && <InputErrorMessage message={error.userBossId} />}
            </div>
            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
                <h1 className="pl-2">Select Employee Position</h1>
                <select
                    className="w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
                    onChange={handleChangeInput}
                    value={input.position}
                    name="position"
                >
                    <option value="ADMIN" name="position">ADMIN</option>
                    <option value="USER" name="position">USER</option>
                    <option value="HR" name="position">HR</option>
                    <option value="MANAGER" name="position">MANAGER</option>
                </select>
            </div>

            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
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
            <div className=" p-1 w-[360px] h-[80px] flex flex-col gap-2">
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


            <div className="mx-auto col-span-full">
                <button className="bg-orange-500 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
                    ADD User
                </button>
            </div>
        </form>
    );
}
