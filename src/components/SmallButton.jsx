export default function SmallButton({
  onClick,
  bg = "bg-green-600",
  hover = "hover:bg-green-400",
  buttonName = "Edit",
}) {
  return (
    <button
      onClick={onClick}
      className={`font-bold text-white w-14 h-6 ${bg} rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 ${hover}`}
    >
      {buttonName}
    </button>
  );
}
