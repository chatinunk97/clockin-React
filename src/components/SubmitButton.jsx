import React from "react";

export default function SubmitButton({ children, bg = "bg-primaryGreen" }) {
  return (
    <button className={`${bg} text-white p-3 rounded-3xl`}>{children}</button>
  );
}
