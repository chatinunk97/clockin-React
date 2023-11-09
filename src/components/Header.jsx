export default function Header({
  children,
  sideButtonText = "Logout",
  theme,
  onClick,
}) {
  const profileTheme =
    theme === "white"
      ? { bg: "bg-white", text: "text-primaryGreen" }
      : { bg: "bg-primaryGreen", text: "text-white" };
  return (
    <div
      className={`flex justify-center items-center h-28 ${profileTheme.bg}`}
    >
      <div
        className={`flex justify-center items-center font-semibold text-3xl  ${profileTheme.text}`}
      >
        {children}
      </div>
      <div
        onClick={onClick}
        className={`flex justify-center items-center text-[16px] cursor-pointer ${profileTheme.text}`}
      >
        {sideButtonText}
      </div>
    </div>
  );
}
