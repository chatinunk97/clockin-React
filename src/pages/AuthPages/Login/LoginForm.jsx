import React from "react";
import InputBar from "../../../components/InputBar";
import SubmitButton from "../../../components/SubmitButton";

export default function LoginForm() {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Pushed");
  };
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full p-3">
      <InputBar placeholder="Email"></InputBar>
      <InputBar placeholder="Password" type="password"></InputBar>
      <SubmitButton>Login</SubmitButton>
    </form>
  );
}
