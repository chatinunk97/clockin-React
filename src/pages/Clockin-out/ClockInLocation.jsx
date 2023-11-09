import { IoLocationSharp } from "react-icons/io5";

export default function ClockInlocation() {
  return (
    <div className="flex justify-between h-full items-center px-5">
      <button className="text-3xl text-green-600 hover:text-blue-500">
        <IoLocationSharp />
      </button>
      <p>Location Name</p>
    </div>
  );
}
