export default function InputBar({
  type = "text",
  placeholder,
  className = "bg-inputGray rounded-sm p-3",
}) {
  return <input type={type} placeholder={placeholder} className={className} />;
}
