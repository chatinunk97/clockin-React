import Header from "../../components/Header";
import InputBar from "../../components/InputBar";
import SubmitButton from "../../components/SubmitButton";

export default function SetPasswordMainPage() {
  return (
    <div
      className="flex flex-col gap-5 items-center w-full h-screen m-auto 
      min-w-360px text-center"
    >
      <Header sideButtonText="" theme="white">
        Set Password
      </Header>
      <form className="flex flex-col gap-3 w-full p-3">
        <InputBar placeholder="Enter Password" type="password" />
        <InputBar placeholder="Confirm Password" type="password" />
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  );
}
