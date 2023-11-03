import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import InputBar from "../../components/InputBar";
import SubmitButton from "../../components/SubmitButton";
import { useEffect } from "react";
import axios from "axios";

export default function SetPasswordMainPage() {
  const [user, setUser] = useState(null);
  const token = useLocation().search.split("token=")[1];
  const [input, setInput] = useState({
    employeeId: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    axios
      .get("/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data));
  },[]);

  const handleSubmitButton = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div
      className="flex flex-col gap-5 items-center w-full h-screen m-auto 
      min-w-360px text-center"
    >
      <Header sideButtonText="" theme="white">
        Set Password
      </Header>
      <form className="grid grid-cols-2 gap-3 w-full p-3">
        <InputBar
          placeholder="Employee ID"
          type="text"
          isDisabled={true}
          value={input.employeeId}
        />
        <InputBar
          placeholder="Email"
          type="email"
          isDisabled={true}
          value={input.email}
        />
        <InputBar
          placeholder="First Name"
          type="text"
          isDisabled={true}
          value={input.firstName}
        />
        <InputBar
          placeholder="Last Name"
          type="text"
          isDisabled={true}
          value={input.lastName}
        />

        <InputBar
          placeholder="Enter Password"
          type="password"
          className="col-span-2 bg-inputGray rounded-sm p-3"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <InputBar
          placeholder="Confirm Password"
          type="password"
          className="col-span-2 bg-inputGray rounded-sm p-3"
          value={input.confirmPassword}
          onChange={(e) =>
            setInput({ ...input, confirmPassword: e.target.value })
          }
        />
        <SubmitButton className="col-span-2" onClick={handleSubmitButton}>
          Save
        </SubmitButton>
      </form>
    </div>
  );
}
