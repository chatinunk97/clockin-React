import React from "react";
import LoginHeader from "./LoginHeader";

export default function LoginMainPage() {
  return (
    <div
      className="flex flex-col items-center bg-gray-50 w-full h-full m-auto 
      min-w-360px"
    >
      <LoginHeader />
      <div>Form</div>
      <div>Footer</div>
    </div>
  );
}
