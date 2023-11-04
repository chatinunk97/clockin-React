import Header from "../../../components/Header";
import LoginForgetPassword from "./LoginForgetPassword";
import LoginForm from "./LoginForm";

export default function LoginMainPage() {
  return (
    <div
      className="flex flex-col gap-5 items-center w-full h-screen m-auto 
      min-w-360px"
    >
      <Header sideButtonText="" theme="white">
        Login
      </Header>
      <LoginForm />
      <LoginForgetPassword />
    </div>
  );
}
