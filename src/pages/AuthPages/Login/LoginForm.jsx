import { useState } from "react";
import InputBar from "../../../components/InputBar";
import SubmitButton from "../../../components/SubmitButton";
import useAuth from "../../../hooks/use-auth";

export default function LoginForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleLoginForm = (e) => {
    e.preventDefault();
    login(input);
  };

  return (
    <form onSubmit={handleLoginForm} className="flex flex-col gap-3 w-full p-3">
      <InputBar
        placeholder="Email"
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />
      <InputBar
        placeholder="Password"
        type="password"
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
      />
      <SubmitButton>Login</SubmitButton>
    </form>
  );
}
