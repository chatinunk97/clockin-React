import React from "react";

export default function SubmitButton({
  children,
  bg = "bg-primaryGreen",
  p = "p-3",
  w,
}) {
  return (
    <button className={`${bg} text-white ${p} ${w} rounded-3xl`}>
      {children}
    </button>
  );
}
