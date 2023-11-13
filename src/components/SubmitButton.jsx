export default function SubmitButton({
  children,
  bg = "bg-primaryGreen",
  p = "p-3",
  w,
  textSize = "",
  className,
  onClick,
}) {
  return (
    <button
      className={`${bg} text-white ${p} ${w} rounded-3xl ${className} ${textSize}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
