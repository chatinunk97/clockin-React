export default function SubmitButton({
  children,
  bg = "bg-primaryGreen",
  p = "p-3",
  w,
  textSize = "",
  className,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={`${bg} text-white ${p} ${w} rounded-3xl ${className} ${textSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
