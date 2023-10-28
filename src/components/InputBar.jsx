export default function InputBar({ type = "text", placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-inputGray rounded-sm p-3"
    />
  );
}
