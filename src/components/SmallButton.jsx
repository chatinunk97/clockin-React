export default function SmallButton({
  onClick,
  bg = "bg-green-600",
  hover = "hover:bg-green-400",
  buttonName = "Edit",
  p = "p2"
}) {
  return (
    <button
      onClick={onClick}
      className={`font-bold text-white w-16 h-6 rounded-xl flex justify-center items-center  text-center transition-transform hover:scale-105 ${hover} ${bg} ${p}`}
    >
      {buttonName}
    </button>
  );
}
