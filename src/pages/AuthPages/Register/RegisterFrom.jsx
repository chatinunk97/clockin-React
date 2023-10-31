// import Joi from 'joi'
import { useRef, useState } from 'react';
// import axios from 'axios'
import RegisterInput from './RegisterInput';

// const registerSchema = Joi.object({
//     profileImage: Joi.string(),
//     employeeId: Joi.string().trim().required(),
//     firstName: Joi.string().trim().required(),
//     lastName: Joi.string().trim().required(),
//     email: Joi.string().email({ tlds: false }).required(),
//     mobile: Joi.string()
//         .pattern(/^[0-9]{10}$/)
//         .required(),
//     companyProfileId: Joi.number().required(),
//     password: Joi.string()
//         .pattern(/^[a-zA-Z0-9]{6,30}$/)
//         .trim()
//         .required(),

// });
const validateregister = input => {
    const { error } = registerSchema.validate(input, { abortEarly: false })
    if (error) {
        const result = error.details.reduce((acc, el) => {
            const { message, path } = el
            acc[path[0]] = message
            return acc
        }, {})
        return result
    }
}

export default function RegisterFrom() {
    const [file, setFile] = useState(null)
    const inputEl = useRef(null)


    const [input, setInput] = useState({
        profileImage: '',
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        companyProfileId: '',
        password: '',

    })

    const [error, setError] = useState({})

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleSubmitRegister = async (e) => {
        try {
            e.preventDefault()
            const validationError = validateregister(input)
            const formData = new FormData()
            formData.append("profileImage", input.profileImage)
            formData.append("employeeId", input.employeeId)
            formData.append("firstName", input.firstName)
            formData.append("email", input.email)
            formData.append("mobile", input.mobile)
            formData.append("companyProfileId", input.companyProfileId)
            formData.append("password", input.password)
            if (validationError) {
                console.log(validationError)
                return setError(validationError)
            }
            setError({})
            const response = await axios.post('', formData);
            if (response.status === 200) {
                alert('Registed');
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <form className="grid grid-cols-2 gap-x-3 gap-y-4 items-center pt-8 pb-6">

            <div>
                <RegisterInput type='file'
                    value={input.profileImage}
                    onChange={handleChangeInput}
                    name='profileImage'
                    hasError={error.profileImage} />
            </div>
            <div>
                <RegisterInput placeholder="Employee Id"
                    value={input.employeeId}
                    onChange={handleChangeInput}
                    name='employeeId'
                    hasError={error.employeeId} />
            </div>
            <div>
                <RegisterInput placeholder=" First name"
                    value={input.firstName}
                    onChange={handleChangeInput}
                    name='firstName'
                    hasError={error.firstName} />
            </div>
            <div>
                <RegisterInput placeholder="Last Name"
                    value={input.lastName}
                    onChange={handleChangeInput}
                    name='lastName'
                    hasError={error.lastName} />
            </div>
            <div>
                <RegisterInput placeholder="Email"
                    value={input.email}
                    onChange={handleChangeInput}
                    name='email'
                    hasError={error.email} />
            </div>
            <div>
                <RegisterInput placeholder="Phone Number"
                    value={input.mobile}
                    onChange={handleChangeInput}
                    name='mobile'
                    hasError={error.mobile} />
            </div>
            <div>
                <RegisterInput placeholder="companyProfileId"
                    value={input.companyProfileId}
                    onChange={handleChangeInput}
                    name='companyProfileId'
                    hasError={error.companyProfileId} />
            </div>
            <div>
                <RegisterInput placeholder="Password"
                    value={input.password}
                    onChange={handleChangeInput}
                    name='password'
                    hasError={error.password} />
            </div>
            <div className="mx-auto col-span-full">
                <button className="bg-blue-700 rounded-lg text-white px-3 py-1.5 text-lg font-bold min-w-[10rem]">
                    Sign Up
                </button>
            </div>
        </form>
    )
}
