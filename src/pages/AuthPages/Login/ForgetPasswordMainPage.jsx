import Header from "../../../components/Header";
import InputBar from "../../../components/InputBar";
import SubmitButton from "../../../components/SubmitButton";

export default function ForgetPasswordPage() {
  return (
    <div
      className="flex flex-col gap-5 items-center w-full h-screen m-auto 
      min-w-360px text-center"
    >
      <Header sideButtonText="" theme="white">
        Reset Password
      </Header>
      <form className="flex flex-col gap-3 w-full p-3">
        <h2>
          Enter the email associated with your account to change your password
        </h2>
        <InputBar placeholder="Enter your email" type="email" />
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
