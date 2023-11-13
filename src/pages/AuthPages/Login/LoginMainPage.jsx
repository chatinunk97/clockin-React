import LoginForgetPassword from "./LoginForgetPassword";
import LoginForm from "./LoginForm";
import logo from "../../../assets/logoColor.png";
import logoText from "../../../assets/logoTextColor.png";

export default function LoginMainPage() {
  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen m-auto 
      min-w-360px max-w-[900px] px-6"
    >
      <div className="shadow-lg rounded-lg w-full flex flex-col gap-5 p-5 py-10 ">
        <div className="flex justify-center flex-col gap-3 items-center relative">
          <img
            src={logo}
            alt="logoIcon"
            className="w-20 animate-spin animation slower-spin"
          />
          <img src={logoText} alt="logoText" className="h-10 max-h-14" />
        </div>
        <LoginForm />
        <LoginForgetPassword />
      </div>
    </div>
  );
}
