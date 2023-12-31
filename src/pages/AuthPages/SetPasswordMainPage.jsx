import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import InputBar from "../../components/InputBar";
import SubmitButton from "../../components/SubmitButton";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SetPasswordMainPage() {
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
      .then((res) => {
        setInput({
          employeeId: res.data.user.employeeId,
          email: res.data.user.email,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        if (err.response.statusText === "Unauthorized") {
          alert(
            "Your password set token has expired. Please contact your Admin"
          );
        }
      });
  }, []);

  const handleSubmitButton = async (e) => {
    try {
      e.preventDefault();
      console.log(token);
      const result = await axios.patch(
        "/user/resetPassword",
        { password: input.password, confirmPassword: input.confirmPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        title: "Done",
        text: result.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
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
