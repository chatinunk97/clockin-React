export default function Header({ children, sideButtonText, theme }) {
  const profileTheme =
    theme === "white"
      ? { bg: "bg-white", text: "text-primaryGreen" }
      : { bg: "bg-primaryGreen", text: "text-white" };
  console.log(profileTheme);
  return (
    <div className={`grid grid-cols-3  w-full py-11 ${profileTheme.bg}`}>
      <div></div>
      <div
        className={`flex justify-center items-center font-semibold text-3xl  ${profileTheme.text}`}
      >
        {children}
      </div>
      <div className={`flex justify-center items-center text-[16px] ${profileTheme.text}`}>
        {sideButtonText}
      </div>
    </div>
  );
}
