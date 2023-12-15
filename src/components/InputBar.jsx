export default function InputBar({
  type = "text",
  placeholder,
  className = "bg-inputGray rounded-sm p-3",
  value,
  onChange,
  isDisabled,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
    />
  );
}
