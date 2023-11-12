import Modal from "./Modal";
import logoText from "../assets/logoText.png";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { useState } from "react";
export default function Header({ sideButtonText = "Logout", theme, onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const profileTheme =
    theme === "white"
      ? { bg: "bg-white", text: "text-primaryGreen" }
      : { bg: "bg-primaryGreen", text: "text-white" };
  return (
    <div className={`flex justify-around items-center h-28   ${profileTheme.bg} relative`}>
      <AiOutlineAlignLeft
        size={40}
        fill="white"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="absolute left-1 cursor-pointer"
      />
      <img src={logoText} alt="logo" className="h-10 " />
      <div
        onClick={onClick}
        className={`${
          isOpen ? "flex scale-105" : "scale-0"
        } z-10 transition duration-150   cursor-pointer absolute bg-white px-4 py-2 rounded-md h-16 left-2 top-16 shadow-md flex items-center`}
      >
        {sideButtonText}
      </div>
    </div>
  );
}
