export default function RegisterInput({
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    hasError,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`block w-full border rounded-md px-3 py-1.5 text-sm outline-none
               focus:ring
               ${hasError
                    ? "border-red-500 focus:ring-red-300"
                    : "focus:ring-blue-300  focus:border-blue-500 border-gray-300 outline-none"
                }
               `}
            value={value}
            onChange={onChange}
            name={name}
        />

    );
}
