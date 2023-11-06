import Joi from 'joi';
import { useState } from 'react';
import RegisterInput from '../../AuthPages/Register/RegisterInput';
import LinearIndeterminate from "../../../components/LoadingBar";
import InputErrorMessage from '../../AuthPages/Register/InputErrorMessage';
import { dashboardAxios } from '../../../config/axios';
import IconLabelButtons from "../../../components/SendButton";
import InputFileUpload from "../../../components/Uploadbutton";
import Swal from 'sweetalert2'


const EditSchema = Joi.object({
    profileImage: Joi.allow(null).required(),
    employeeId: Joi.string().trim(),
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    email: Joi.string().email({ tlds: false }),
    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    position: Joi.string().trim(),
    userBossId: Joi.string().trim(),
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



export default function EditemployeeForm({ UserbyId }) {
    const [file, setFile] = useState(null);
    const [input, setInput] = useState({
        profileImage: UserbyId.PhotoImg,
        employeeId: UserbyId.EmployeeID,
        firstName: UserbyId.FistName,
        lastName: UserbyId.LastName,
        email: UserbyId.Email,
        mobile: UserbyId.PhoneNumber,
        position: UserbyId.Position,
        userBossId: UserbyId.Supervisor,
        id: UserbyId.id,

    });

    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false)



    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };


    const handleSubmitEditUser = async (e) => {
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
            setLoading(true)
            const res = await dashboardAxios.patch("/user/updateUser", formData)
            if (res.status === 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Edit user success!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Something Went Wrong',
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error:', error);
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <form
                className="grid grid-cols-2 gap-x-6 gap-y-4 items-center p-6 md:p-24 "
                onSubmit={handleSubmitEditUser}
            >

                <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
                    <h1>First name</h1>
                    <RegisterInput
                        placeholder={UserbyId.FistName}
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
                        placeholder={UserbyId.LastName}
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
                        placeholder={UserbyId.EmployeeID}
                        value={input.employeeId}
                        onChange={handleChangeInput}
                        name="employeeId"
                        hasError={error.employeeId}
                    />
                    {error.employeeId && <InputErrorMessage message={error.employeeId} />}
                </div>
                <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
                    <h1>Supervisor</h1>
                    <RegisterInput
                        placeholder={UserbyId.Supervisor}
                        value={input.userBossId}
                        onChange={handleChangeInput}
                        name="userBossId"
                        hasError={error.userBossId}
                    />
                    {error.userBossId && <InputErrorMessage message={error.userBossId} />}
                </div>
                <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col md:gap-2 mt-10 md:mt-2">
                    <h1 className="pl-2">Select Employee Position</h1>
                    <select
                        className="w-32 md:w-[360px] mb-12 flex items-start flex-col cursor-pointer border rounded-lg "
                        onChange={handleChangeInput}
                        value={input.position}
                        name="position"
                    >
                        <option value={UserbyId.Position} name="position">{UserbyId.Position} (Current)</option>
                        <option value="ADMIN" name="position">ADMIN</option>
                        <option value="USER" name="position">USER</option>
                        <option value="HR" name="position">HR</option>
                        <option value="MANAGER" name="position">MANAGER</option>
                    </select>
                </div>

                <div className=" p-1 w-32 md:w-[360px] md:h-[80px] flex flex-col gap-2">
                    <h1>Email</h1>
                    <RegisterInput
                        placeholder={UserbyId.Email}
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
                        placeholder={UserbyId.PhoneNumber}
                        value={input.mobile}
                        onChange={handleChangeInput}
                        name="mobile"
                        hasError={error.mobile}
                    />
                    {error.mobile && <InputErrorMessage message={error.mobile} />}
                </div>
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
            </form>
            {loading && <LinearIndeterminate />}
        </>
    );
}
