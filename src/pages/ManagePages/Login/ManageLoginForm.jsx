import { useState } from "react";
import { toast } from "react-toastify";
import InputBar from "../../../components/InputBar";
import SubmitButton from "../../../components/SubmitButton";
import useManage from "../../../hooks/use-manage";

export default function ManageLoginForm() {
  console.log('first')
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { login } = useManage();

  const handleLoginForm = (e) => {
    e.preventDefault();
    login(input, "dashboard").catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  return (
    <form
      onSubmit={handleLoginForm}
      className="w-full h-screen flex flex-col justify-center items-center p-3 gap-3"
    >
      <div className="flex flex-col bg-white px-40 py-28 gap-6 rounded-3xl">
        <h1 className="text-[#2671B1] font-bold text-[40px] text-center">
          Login
        </h1>
        <InputBar
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <InputBar
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <SubmitButton bg="bg-[#2D88D4]">Login</SubmitButton>
      </div>
    </form>
  );
}
