import React from "react";

export default function Footer({ children }) {
  return (
    <div className="fixed bottom-0 flex flex-col justify-center items-center w-full py-5 bg-blue-100 ">
      {children}
    </div>
  );
}
