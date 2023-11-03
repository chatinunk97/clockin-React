export default function SubmitButton({
  children,
  bg = "bg-primaryGreen",
  p = "p-3",
  w,
  className,
  onClick,
}) {
  return (
    <button
      className={`${bg} text-white ${p} ${w} rounded-3xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
