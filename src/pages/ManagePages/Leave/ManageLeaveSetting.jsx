import DefaultLeaveList from "./DefaultLeaveList";
import SubmitButton from "../../../components/SubmitButton";

export default function ManageLeaveSetting() {
  return (
    <div className="w-full flex flex-col m-auto items-center gap-3 p-10 mx-72 bg-gray-200 rounded-lg">
      <h1 className="text-lg font-bold">Default Leaves</h1>
      <div className="flex flex-col gap-3">
        <DefaultLeaveList />
        <DefaultLeaveList />
        <DefaultLeaveList />
      </div>
      <div>
        <SubmitButton className="rounded-xl w-20">Add</SubmitButton>
      </div>
    </div>
  );
}
